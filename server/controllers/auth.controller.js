const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new userModel({ name, email, password: hashedPassword });

    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.TOKEN, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: user.name,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.TOKEN, {
      expiresIn: "7d",
    });

    res.json({ token, user: user.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};

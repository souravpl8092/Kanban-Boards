const express = require("express");
const connection = require("./config/db");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome Home Page");
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/list", require("./routes/list.routes"));
app.use("/api/task", require("./routes/task.routes"));

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (err) {
    console.log("Trouble connecting to the DB");
    console.log(err);
  }
});

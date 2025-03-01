import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const signupUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/register`, {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Signup API Error:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

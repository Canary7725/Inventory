// src/components/LoginForm.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import login_image from "../Assets/login.jpeg";
import logo from "../Assets/logo.png";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      const { success, user } = response.data;
      console.log(user);

      if (success && user.role === "local") {
        navigate("/local-home");
        localStorage.setItem("token", response.data.token);
      } else if (success && user.role === "central") {
        navigate("/home");
        localStorage.setItem("token", response.data.token);
      } else if (success && user.role === "ward") {
        navigate("/ward-home");
        localStorage.setItem("token", response.data.token);
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred");
    }
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${login_image})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 blur-4xl"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="w-full text-xl max-w-[200px] mx-auto mb-6">
          <img src={logo} alt="Logo" />
        </div>

        <h3 className="text-3xl font-semibold mb-2 text-center">Login</h3>
        <p className="text-base mb-6 text-center text-gray-600">
          Welcome! Please enter your details.
        </p>

        <form onSubmit={handleLogin}>
          <div className="w-full flex flex-col mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 mb-3 text-black border rounded-md focus:ring-2 focus:ring-green-500"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-3 text-black border rounded-md focus:ring-2 focus:ring-green-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Login
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;

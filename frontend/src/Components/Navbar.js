import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import { jwtDecode } from "jwt-decode"; // Correct import

const Navbar = ({ title }) => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username);
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-sm">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="w-8 h-8 font-bold mr-10 ">{username}</div>
    </div>
  );
};

export default Navbar;

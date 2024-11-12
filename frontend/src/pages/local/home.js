import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import { jwtDecode } from "jwt-decode"; // Correct import
import LocalLayout from "./layout";

const LocalHome = () => {
//   const [username, setUsername] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {  
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token); 
//         setUsername(decodedToken.username); 
//       } catch (err) {
//         console.error("Failed to decode token", err);
//       }
//     } else {
//       navigate("/"); 
//     }
//   }, [navigate]);



  return (
    <div>
    <LocalLayout title="Dashboard">
      <div>
        {/* Your page content here */}
        <h2>Welcome to Eco Nepal Dashboard</h2>
        <p>This is where you can add your main content.</p>
      </div>
    </LocalLayout>

    </div>
  );
};

export default LocalHome;

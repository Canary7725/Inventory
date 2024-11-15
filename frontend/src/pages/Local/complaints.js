import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import Layout from "../Local/layout";
import ComplaintLink from "../../Components/Central/Complaints";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import without curly braces

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUsername(decodedToken.username); // Extract username
          setRole(decodedToken.role); // Extract role
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
    };

    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:4000/api/complaint/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Filter complaints based on username if the role is "local"
        const filteredComplaints =
          role === "local"
            ? response.data.data.filter(
                (complaint) => complaint.User.username === username
              )
            : response.data.data;

        setComplaints(filteredComplaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    // Fetch user data first to set username and role, then fetch complaints
    fetchUserData();
    if (username && role) {
      fetchComplaints();
    }
  }, [username, role]); // Dependencies updated to trigger when these values change

  const handleCreateComplaint = () => {
    navigate("/create-complaint");
  };

  return (
    <div className="flex flex-col w-full">
      <Layout title={`Complaints - ${username}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <Button text="Create Complaint" onClick={handleCreateComplaint} />
          </div>
          <div className="border-t border-[#E9E9E9] bg-white">
            <div className="text-green-500 p-4 pl-8 pr-8 flex items-center justify-between border-b-2 border-[#E9E9E9]">
              <span className="w-1/3">Complaint Message</span>
              <span className="w-1/3">Issued By</span>
              <span className="w-1/3">Date Issued</span>
            </div>

            {/* Render the complaints dynamically */}
            {complaints.length > 0 ? (
              complaints.map((complaint) => (
                <ComplaintLink key={complaint.id} complaint={complaint} />
              ))
            ) : (
              <div className="p-4 text-gray-500">No complaints found.</div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Complaints;

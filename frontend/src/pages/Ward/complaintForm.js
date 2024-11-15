import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import WardLayout from "./layout";
const WardComplaintForm = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to submit a complaint.");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id; // Extract userId from the token

      const formData = new FormData();
      formData.append("userId", userId); // Add userId to form data
      formData.append("title", title);
      formData.append("message", message);
      if (file) {
        formData.append("image", file);
      }

      await axios.post("http://localhost:4000/api/complaint/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Complaint created successfully");
      navigate("/ward-complaints"); // Redirect to complaints page
    } catch (error) {
      console.error("Error creating complaint:", error);
      alert("Failed to create complaint");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <WardLayout title={`Complaints Form`}>
        <div className="p-4">
          <h2 className="text-lg text-green-500 font-semibold mb-4">
            Create a New Complaint
          </h2>
          <div className="bg-white p-8 rounded-md shadow">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 pb-2">
                  Complaint Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded bg-[#E9E9E9]"
                  placeholder="Enter complaint title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 pb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-36 p-2 border border-gray-300 rounded bg-[#E9E9E9]"
                  placeholder="Enter complaint message"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 pb-2">Upload Image</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Submit Complaint
              </button>
            </form>
          </div>
        </div>
      </WardLayout>
    </div>
  );
};

export default WardComplaintForm;

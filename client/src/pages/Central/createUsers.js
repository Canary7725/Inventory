import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const CreateUser = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("ward"); // Default role value
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Data to send to the API
    const userData = {
      username,
      password,
      contact,
      role,
    };

    try {
      // API request to create a new user
      await axios.post("http://localhost:4000/api/auth/register", userData);
      toast.success("User created successfully!");
      setTimeout(() => {
        navigate("/manage-users"); // Redirect to users page
      }, 3000);
    } catch (err) {
      console.error("Error creating user:", err);
      setError("Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <ToastContainer />
      <Layout title="Create Users">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Create a New User</h2>

          {/* Error message */}
          {error && <div className="mb-4 text-red-500">{error}</div>}

          {/* Form for creating a user */}
          <div className="bg-white p-8 rounded-md shadow">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 pb-2">Username</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded bg-[#E9E9E9]"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 pb-2">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded bg-[#E9E9E9]"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 pb-2">Contact</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded bg-[#E9E9E9]"
                  placeholder="Enter contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 pb-2">Role</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded bg-[#E9E9E9]"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="central">Central</option>
                  <option value="local">Local</option>
                  <option value="ward">Ward</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save User"}
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CreateUser;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const CreatePolicy = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Data to send to the API
    const policyData = {
      title,
      description,
    };

    try {
      // API request to create a new policy
      await axios.post("http://localhost:4000/api/policy/create", policyData);
      toast.success("Policy created successfully!");
      setTimeout(() => {
        navigate("/policies"); // Redirect to policies page
      }, 5000);
    } catch (err) {
      console.error("Error creating policy:", err);
      setError("Failed to create policy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <ToastContainer />
      <Layout title="Policies">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Create a New Policy</h2>

          {/* Error message */}
          {error && <div className="mb-4 text-red-500">{error}</div>}

          {/* Form for creating a policy */}
          <div className="bg-white p-8 rounded-md shadow">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 pb-2">Policy Title</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded bg-[#E9E9E9]"
                  placeholder="Enter policy title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 pb-2">Description</label>
                <textarea
                  className="w-full h-36 p-2 border border-gray-300 rounded bg-[#E9E9E9]"
                  placeholder="Enter policy description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Policy"}
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CreatePolicy;

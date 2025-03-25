import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const UpdateUserForm = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();

  const [user, setUser] = useState(null); // User details
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("local");
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/auth/users/${id}`
      );
      const fetchedUser = response.data.data;
      setUser(fetchedUser);
      setUsername(fetchedUser.username);
      setContact(fetchedUser.contact);
      setRole(fetchedUser.role);
    } catch (err) {
      console.error("Failed to fetch user", err);
      setError("Failed to fetch user details.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("contact", contact);
    formData.append("role", role);
    if (document) {
      formData.append("document", document);
    }

    try {
      await axios.put(`http://localhost:4000/api/auth/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("User updated successfully!");
      setTimeout(() => {
        navigate("/manage-users"); // Redirect to the manage users page
      }, 2000);
    } catch (err) {
      console.error("Failed to update user", err);
      setError("Failed to update user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div>
      <ToastContainer />
      <Layout title="Update User">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Update User</h2>

          {error && <div className="mb-4 text-red-500">{error}</div>}

          <form
            onSubmit={handleFormSubmit}
            className="bg-white p-8 rounded-md shadow"
          >
            <div className="mb-4">
              <label className="block text-gray-700 pb-2">Username</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 pb-2">Contact</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 pb-2">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="local">Local</option>
                <option value="ward">Ward</option>
                <option value="central">Central</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 pb-2">
                Document (optional)
              </label>
              <input
                type="file"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setDocument(e.target.files[0])}
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => navigate("/manage-users")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update User"}
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default UpdateUserForm;

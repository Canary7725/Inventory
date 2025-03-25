import React, { useState, useEffect } from "react";
import LocalLayout from "./layout";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

const ContributeForm = () => {
  const navigate = useNavigate();
  const { requestId } = useParams(); // Get requestId from URL parameters
  const [requestDetails, setRequestDetails] = useState(null); // Request data
  const [quantity, setQuantity] = useState(""); // Quantity to contribute
  const [currentUser, setCurrentUser] = useState(""); // Username of logged-in user

  useEffect(() => {
    fetchRequestDetails();
    decodeUserFromToken();
  }, []);

  const decodeUserFromToken = () => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUser(decoded.username); // Set the username from token
    }
  };

  const fetchRequestDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/requests/${requestId}`
      );
      setRequestDetails(response.data.data);
    } catch (error) {
      toast.error("Failed to load request details");
    }
  };

  const handleContribute = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/supplier/create", {
        municipality: currentUser, // Use logged-in user's username
        product: requestDetails.vegetableName,
        quantity,
        requestId,
      });
      toast.success("Contribution submitted successfully!");
      setTimeout(() => {
        navigate("/local-requested-products");
      }, 5000);
    } catch (error) {
      console.error("Failed to submit contribution", error);
      toast.error("Failed to submit contribution");
    }
  };

  if (!requestDetails) {
    return <p>Loading...</p>; // Loading state
  }

  return (
    <div>
      <LocalLayout title="Contribute to Request">
        <ToastContainer /> {/* Toast container for notifications */}
        <div className="bg-white rounded-xl p-6 w-full shadow-lg mt-4">
          <h2 className="text-lg font-bold mb-4 text-green-500">
            Contribute Product
          </h2>
          <form onSubmit={handleContribute}>
            {/* Municipality Field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Municipality/ VDC:
              </label>
              <input
                type="text"
                value={currentUser} // Display current user's username
                readOnly
                className="bg-gray-200 border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>

            {/* Product Field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Product:</label>
              <input
                type="text"
                value={requestDetails.vegetableName}
                readOnly
                className="bg-gray-200 border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>

            {/* Quantity Field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Quantity (kg):</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity to contribute"
                className="border border-gray-300 rounded px-4 py-2 w-full"
                required
              />
            </div>

            {/* Form Buttons */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/local-requested-products")}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Contribute Product
              </button>
            </div>
          </form>
        </div>
      </LocalLayout>
    </div>
  );
};

export default ContributeForm;

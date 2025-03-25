import React, { useState } from "react";
import LocalLayout from "./layout";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const CreateRequestForm = () => {
  const navigate = useNavigate();

  // Decode token to get the logged-in user's username
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const username = decoded?.username || "Unknown User";
  const userId = decoded?.user_id;
  console.log(username);

  // State for the form fields
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(); // Default example value

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post the request to the API
      await axios.post("http://localhost:4000/api/requests/create", {
        vegetableName: product,
        requested_quantity: quantity,
        received_quantity: "0", // Default to 0 for new requests
        userId: userId, // Assuming the token contains the user ID
      });

      toast.success("Request created successfully!");
      setTimeout(() => {
        navigate("/local-outgoing-requests"); // Redirect after successful submission
      }, 5000);
    } catch (error) {
      console.error("Error creating request:", error);
      toast.error("Failed to create request.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <LocalLayout title="Outgoing Requests">
        <div className="bg-white rounded-xl p-6 w-full shadow-lg mt-4 ">
          <h2 className="text-lg font-bold mb-4 text-green-500">
            Create New Request
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Municipality Field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Municipality/ VDC:
              </label>
              <input
                type="text"
                value={username} // Display logged-in user's username
                readOnly
                className="bg-gray-200 border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>

            {/* Product Field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Product:</label>
              <input
                type="text"
                onChange={(e) => setProduct(e.target.value)}
                placeholder="Enter product name"
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>

            {/* Quantity Field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Quantity:</label>
              <input
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="border border-gray-300 rounded px-4 py-2 w-full"
                required
              />
            </div>

            {/* Form Buttons */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/local-outgoing-requests")}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Request Product
              </button>
            </div>
          </form>
        </div>
      </LocalLayout>
    </div>
  );
};

export default CreateRequestForm;

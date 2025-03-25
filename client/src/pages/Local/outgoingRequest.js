import React, { useEffect, useState } from "react";
import OutgoingRequestsDefault from "../../Components/Local/OutgoingRequestDefault";
import LocalLayout from "./layout";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import axios from "axios";

const OutgoingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Redirecting to login...");
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded?.user_id; // Get the logged-in user's ID
      // Fetch all requests
      const response = await axios.get(`http://localhost:4000/api/requests`);
      const allRequests = response.data.data;

      // Filter requests based on the logged-in user's ID
      const userRequests = allRequests.filter(
        (request) => request.userId === userId
      );
      setRequests(allRequests); // Store all requests (optional, for debugging or reference)
      setFilteredRequests(userRequests); // Store filtered requests
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    }
  };

  return (
    <div>
      <LocalLayout title="Outgoing Requests">
        <div className="bg-gray-100 min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 p-4">
            <h2 className="text-lg font-bold text-gray-700">Your Requests</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => navigate("/local-create-request-form")}
            >
              Create New Request
            </button>
          </div>

          {/* Request List */}
          <div className="bg-white rounded-xl p-4 m-4 shadow-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white border-b border-gray-300 text-green-500">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Municipality/ VDC</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Requested Quantity</th>
                  <th className="p-4">Received Quantity</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <OutgoingRequestsDefault key={request.id} {...request} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </LocalLayout>
    </div>
  );
};

export default OutgoingRequests;

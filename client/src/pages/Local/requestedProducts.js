import React, { useState, useEffect } from "react";
import LocalLayout from "./layout";
import RequestedProductRow from "../../Components/Local/RequestedProductRow";
import RequestedProductRowExpand from "../../Components/Local/RequestedProductRowExpand";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const RequestedProducts = () => {
  const [requests, setRequests] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null); // Keep track of the expanded request ID

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not logged in.");
        return;
      }

      // Decode token to get userId
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;

      const response = await axios.get("http://localhost:4000/api/requests/");
      const allRequests = response.data.data;

      const userRequests = allRequests.filter(
        (request) => request.userId !== userId
      );

      setRequests(userRequests);
    } catch (error) {
      console.error("Failed to fetch requests", error);
    }
  };

  const toggleExpand = (requestId) => {
    setExpandedRow((prev) => (prev === requestId ? null : requestId));
  };

  return (
    <div>
      <LocalLayout title="Requests">
        <div className="bg-white shadow-md rounded-xl p-6 mt-2">
          <div className="text-green-500 font-bold w-full p-4 flex border-b-2 border-[#E9E9E9]">
            <span className="w-[15%]">Date</span>
            <span className="w-[15%]">Local Gov</span>
            <span className="w-[15%]">Product</span>
            <span className="w-[15%]">Requested Quantity</span>
            <span className="w-[15%]">Received Quantity</span>
            <span className="w-[15%]">Your Status</span>
          </div>
          {requests.map((request) =>
            expandedRow === request.id ? (
              <RequestedProductRowExpand
                key={request.id}
                request={request}
                toggleExpand={() => toggleExpand(request.id)}
              />
            ) : (
              <RequestedProductRow
                key={request.id}
                request={request}
                toggleExpand={() => toggleExpand(request.id)}
              />
            )
          )}
        </div>
      </LocalLayout>
    </div>
  );
};

export default RequestedProducts;

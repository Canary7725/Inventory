import React, { useState, useEffect } from "react";
import LocalLayout from "./layout";
import RequestedProductRow from "../../Components/Local/RequestedProductRow";
import RequestedProductRowExpand from "../../Components/Local/RequestedProductRowExpand";
import axios from "axios";

const RequestedProducts = () => {
  const [requests, setRequests] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null); // Keep track of the expanded request ID

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/requests/");
      setRequests(response.data.data); // Assuming { data: [...] }
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
            <span className="w-1/6">Date</span>
            <span className="w-1/4">Municipality/ VDC</span>
            <span className="w-1/6">Product</span>
            <span className="w-1/6">Requested Quantity</span>
            <span className="w-1/6">Received Quantity</span>
            <span className="w-1/6">Your Status</span>
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

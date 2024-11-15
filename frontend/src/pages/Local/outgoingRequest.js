import React, { useState } from "react";
import OutgoingRequestsDefault from "../../Components/Local/OutgoingRequestDefault";
import LocalLayout from "./layout";
import { MdArrowDropDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const requestsData = [
  {
    id: 1,
    date: "10/11/2024",
    municipality: "Suryabinayak",
    product: "Potato",
    requestedQuantity: "10,000kg",
    receivedQuantity: "10 kg",
    requests: 10,
    status: "Ongoing",
  },
  {
    id: 2,
    date: "10/11/2024",
    municipality: "Suryabinayak",
    product: "Potato",
    requestedQuantity: "10,000kg",
    receivedQuantity: "10 kg",
    requests: 10,
    status: "Rejected",
  },
  {
    id: 3,
    date: "10/11/2024",
    municipality: "Suryabinayak",
    product: "Potato",
    requestedQuantity: "10,000kg",
    receivedQuantity: "10 kg",
    requests: 10,
    status: "Completed",
  },
  // Add more data as needed
];

const OutgoingRequests = () => {
  const [productFilter, setProductFilter] = useState("All");
  const navigate = useNavigate();

  return (
    <div>
      <LocalLayout title="Outgoing Requests">
        <div className="bg-gray-100 min-h-screen">
          {/* Filters and Header */}
          <div className="flex justify-between items-center mb-4 p-4">
            <div className="flex items-center gap-4">
              <label className="text-gray-700">Product:</label>
              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="bg-white border border-gray-300 rounded px-4 py-2"
              >
                <option>All</option>
                <option>Potato</option>
                <option>Tomato</option>
                {/* Add more products as needed */}
              </select>
            </div>
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
                  <button className="text-white w-2px h-2px mr-4">
                    <MdArrowDropDown size={20} />
                  </button>
                  <th className="p-4">Date</th>
                  <th className="p-4">Municipality/ VDC</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Requested Quantity</th>
                  <th className="p-4">Received Quantity</th>
                  <th className="p-4">Requests</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {requestsData.map((request) => (
                  <OutgoingRequestsDefault key={request.id} {...request} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </LocalLayout>
    </div>
  );
};

export default OutgoingRequests;

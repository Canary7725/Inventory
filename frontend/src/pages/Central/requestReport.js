import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../layout";
import { RequestDefault } from "../../Components/Central/RequestDefault";
import { RequestDrop } from "../../Components/Central/RequestDrop";

const RequestReport = () => {
  const [requests, setRequests] = useState([]);

  // Fetch requests
  useEffect(() => {
    const fetchRequests = async () => {
      const response = await axios.get("http://localhost:4000/api/requests/");
      setRequests(response.data.data);
    };
    fetchRequests();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <Layout title="Requests Report">
        <div className="p-6">
          <div className="bg-white p-4 rounded shadow">
            <div className="text-green-500 p-4 flex items-center justify-between border-b-2 border-[#E9E9E9]">
              <span className="w-1/3">Municipality/ VDC</span>
              <span className="w-1/3">Product</span>
              <span className="w-1/6">Quantity</span>
              <span className="w-1/6">Date</span>
            </div>
            {requests.map((request) => (
              <RequestItem key={request.id} request={request} />
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};


const RequestItem = ({ request }) => {
  const [expanded, setExpanded] = useState(false);
  const [suppliers, setSuppliers] = useState([]);

  const toggleExpand = async () => {
    setExpanded((prev) => !prev); // Toggle the state correctly
    if (!expanded) {
      try {
        const response = await axios.get(`http://localhost:4000/api/supplier/${request.id}`);        
        setSuppliers(response.data.data); // Set the suppliers state        
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    }
  };
  return (
    <div className="mb-4">
      {!expanded ? (
        <RequestDefault request={request} suppliers={suppliers} toggleExpand={toggleExpand} />
      ) : (
        <RequestDrop request={request} suppliers={suppliers} toggleExpand={toggleExpand} />
      )}
    </div>
  );
};


export default RequestReport;

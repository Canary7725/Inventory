import React, { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Layout from "./layout";
import { RequestDefault } from '../Components/RequestDefault';
import { RequestDrop } from '../Components/RequestDrop';

const RequestReport = () => {
  const navigate = useNavigate();
  
  // Sample equest data
  const requests = [
    { id: 1, name: "Suryabinayak", product: "Potato", quantity: "10,000kg", date: "10/11/2024" },
    { id: 2, name: "Kathmandu", product: "Rice", quantity: "5,000kg", date: "11/11/2024" },
    { id: 3, name: "Pokhara", product: "Wheat", quantity: "8,000kg", date: "12/11/2024" },
  ];

  return (
    
    <div className="flex flex-col w-full">
      <Layout title="Requests Report">
      <div className="p-6">
        <div className="bg-white p-4 rounded shadow">
        <div className="text-green-500 p-4 flex items-center justify-between border-b-2 border-[#E9E9E9]">
            <button className="text-white w-2px h-2px mr-4"><MdArrowDropDown size={20}/></button>
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

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="mb-4">
      {!expanded ? (
        <RequestDefault toggleExpand={toggleExpand} />
      ) : (
        <RequestDrop toggleExpand={toggleExpand} />
      )}
    </div>
  );
};

export default RequestReport;

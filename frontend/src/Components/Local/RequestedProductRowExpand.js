import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowDropUp } from "react-icons/md";
import axios from "axios";

const RequestedProductRowExpand = ({ request, toggleExpand }) => {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/supplier/${request.id}`
      );
      setSuppliers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch suppliers", error);
    }
  };

  const handleContributeClick = (e) => {
    e.stopPropagation(); // Prevent collapsing the row
    navigate(`/local-contribute-form/${request.id}`);
  };

  const requestedQuantity = parseInt(request.requested_quantity, 10);
  const receivedQuantity = parseInt(request.received_quantity, 10);
  const difference = receivedQuantity - requestedQuantity;

  return (
    <div>
      <div
        className="bg-[#BDEECB] text-green-500 font-normal w-full flex p-4 border-b-2 border-[#E9E9E9]"
        onClick={toggleExpand}
      >
        <button className="text-black w-2px px-4 h-2px mb-4">
          <MdArrowDropUp size={20} />
        </button>
        <span className="text-green-500 w-1/6">
          {new Date(request.createdAt).toLocaleDateString()}
        </span>
        <span className="text-gray-700 w-1/4">{request.user.username}</span>
        <span className="text-gray-700 w-1/6">{request.vegetableName}</span>
        <span className="text-gray-700 w-1/6">
          {request.requested_quantity}kg
        </span>
        <span className="text-gray-700 w-1/6">
          {request.received_quantity}kg
        </span>
        <span
          className={`font-medium w-1/6 ${
            difference >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {difference >= 0
            ? `${difference}kg Excess`
            : `${Math.abs(difference)}kg Deficit`}
        </span>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none w-1/8 ml-4"
          onClick={handleContributeClick}
        >
          Contribute
        </button>
      </div>

      {/* Suppliers Section */}
      <div className="bg-gray-100 text-black p-4 pl-12">
        <h3 className="text-green-800 mb-4 font-bold">Suppliers</h3>
        <div className="flex bg-gray-200 p-2 text-green-500">
          <span className="w-1/3">Municipality/ VDC</span>
          <span className="w-1/3">Product</span>
          <span className="w-1/6">Quantity</span>
          <span className="w-1/6">Date</span>
        </div>
        {suppliers.length > 0 ? (
          suppliers.map((supplier, index) => (
            <div key={index} className="flex p-2 border-b-2">
              <span className="w-1/3">{supplier.municipality}</span>
              <span className="w-1/3">{supplier.product}</span>
              <span className="w-1/6">{supplier.quantity}kg</span>
              <span className="w-1/6 text-green-500">
                {new Date(supplier.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        ) : (
          <p>No suppliers found for this request.</p>
        )}
      </div>
    </div>
  );
};

export default RequestedProductRowExpand;

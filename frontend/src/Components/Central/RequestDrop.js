import React, { useEffect, useState } from "react";
import { MdArrowDropUp } from "react-icons/md";
import axios from "axios";  // Make sure axios is installed

export function RequestDrop({ request, toggleExpand }) {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Fetch suppliers for this request
    axios
      .get(`http://localhost:4000/api/supplier/${request.id}`)
      .then((response) => {
        setSuppliers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching suppliers", error);
      });
  }, [request.id]);


  const userName = request.user ? request.user.username : "Unknown User";

  return (
    <div>
      {/* Top bar with the upward arrow */}
      <div className="bg-[#BDEECB] text-black-bold p-4 flex items-center justify-between cursor-pointer" onClick={toggleExpand}>
        <button className="text-black w-2px h-2px mr-4"><MdArrowDropUp size={20}/></button>
        <span className="w-1/3">{userName}</span>
        <span className="w-1/3">{request.product}</span>
        <span className="w-1/6">{request.quantity}</span>
        <span className="w-1/6 text-green-500">{request.date}</span>
      </div>
      
      {/* Expanded suppliers table */}
      <div className="bg-gray-100 text-black p-4 pl-12">
        <h3 className="text-gray-800 mb-2">Suppliers</h3>
        <div className="flex bg-gray-200 p-2 text-green-500">
          <span className="w-1/3">Municipality/ VDC</span>
          <span className="w-1/3">Product</span>
          <span className="w-1/6">Quantity</span>
          <span className="w-1/6">Date</span>
        </div>
        {suppliers.map((supplier) => (
          <div className="flex p-2 border-b-2" key={supplier.id}>
            <span className="w-1/3">{supplier.municipality}</span>
            <span className="w-1/3">{supplier.product}</span>
            <span className="w-1/6">{supplier.quantity}</span>
            <span className="w-1/6 text-green-500">{new Date(supplier.date).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

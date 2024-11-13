import React, { useState, useEffect } from "react";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";

export function RequestDefault({ request, suppliers, toggleExpand }) {
  const [expanded, setExpanded] = useState(false);

  // Ensure suppliers is always an array
  const safeSuppliers = Array.isArray(suppliers) ? suppliers : [];

  // Find the supplier by matching supplierId
  const supplier = safeSuppliers.find((s) => s.id === request.supplierId);

  // Fallback if no supplier is found
  const supplierName = supplier ? supplier.name : "Unknown Supplier";

  // Format the createdAt date if available
  const formattedDate = request.createdAt ? request.createdAt.slice(0, 10) : "N/A";

  // Get the username from the request (assumes user data is included)
  const userName = request.user ? request.user.username : "Unknown User";

  return (
    <div>
      {/* Collapsed view with dropdown */}
      {!expanded ? (
        <div className="bg-[#BDEECB] text-black-bold p-4 flex items-center justify-between cursor-pointer" onClick={toggleExpand}>
          <button className="text-black w-2px h-2px mr-4">
            <MdArrowDropDown size={20} />
          </button>
          <span className="w-1/3">{userName}</span> {/* Display username here */}
          <span className="w-1/3">{request.vegetableName}</span>
          <span className="w-1/6">{request.quantity}</span>
          <span className="w-1/6 text-green-500">{formattedDate}</span>
        </div>
      ) : (
        <div>
          <div className="bg-[#BDEECB] text-black-bold p-4 flex items-center justify-between cursor-pointer" onClick={toggleExpand}>
            <button className="text-black w-2px h-2px mr-4">
              <MdArrowDropUp size={20} />
            </button>
            <span className="w-1/3">{userName}</span> {/* Display username here */}
            <span className="w-1/3">{request.vegetableName}</span>
            <span className="w-1/6">{request.quantity}</span>
            <span className="w-1/6 text-green-500">{formattedDate}</span>
          </div>

          {/* Expanded supplier details */}
          <div className="bg-gray-100 text-black p-4 pl-12">
            <h3 className="text-gray-800 mb-2">Supplier Information</h3>
            <div className="flex bg-gray-200 p-2 text-green-500">
              <span className="w-1/3">Supplier Name</span>
              <span className="w-1/3">Supplier Contact</span>
              <span className="w-1/3">Supplier Location</span>
            </div>
            <div className="flex p-2 border-b-2">
              <span className="w-1/3">{supplierName}</span>
              <span className="w-1/3">{supplier ? supplier.contact : "N/A"}</span>
              <span className="w-1/3">{supplier ? supplier.location : "N/A"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

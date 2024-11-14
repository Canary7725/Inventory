import React, { useState } from "react";
import LocalLayout from "./layout";
import Dropdown from "../../Components/Dropdown";
import RequestedProductRow from "../../Components/Local/RequestedProductRow";
import RequestedProductRowExpand from "../../Components/Local/RequestedProductRowExpand";
import { MdArrowDropDown } from 'react-icons/md';

const RequestedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState("All");
  const [expandedRow, setExpandedRow] = useState(false);

  const products = ["All", "Spinach", "Potato", "Tomato"];

  const toggleExpand = () => {
    setExpandedRow((prev) => !prev);
  };

  return (
    <div>
      <LocalLayout title="Requests">
        <div className="flex space-x-4 mt-4">
          <Dropdown
            label="Product"
            options={products}
            value={selectedProduct}
            onChange={setSelectedProduct}
          />
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 mt-2">
          <div className="text-green-500 font-bold w-full p-4 flex border-b-2 border-[#E9E9E9]">
            <button className="text-white w-2px px-4 h-2px mb-4">
              <MdArrowDropDown size={20} />
            </button>
            <span className="w-1/6">Date</span>
            <span className="w-1/4">Municipality/ VDC</span>
            <span className="w-1/6">Product</span>
            <span className="w-1/6">Requested Quantity</span>
            <span className="w-1/6">Received Quantity</span>
            <span className="w-1/6">Your Status</span>
            <button className="bg-white text-white px-4 py-2 rounded w-1/8">
              Contribute
            </button>
          </div>
          {expandedRow ? (
            <RequestedProductRowExpand toggleExpand={toggleExpand} />
          ) : (
            <RequestedProductRow toggleExpand={toggleExpand} />
          )}
        </div>
      </LocalLayout>
    </div>
  );
};

export default RequestedProducts;

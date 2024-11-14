import React from "react";
import { MdArrowDropUp } from "react-icons/md";

const RequestedProductRowExpand = ({ toggleExpand }) => {
  return (
    <div>
      <div
        className="bg-[#BDEECB] text-green-500 font-normal w-full flex p-4 border-b-2 border-[#E9E9E9]"
        onClick={toggleExpand}
      >
        <button className="text-black w-2px px-4 h-2px mb-4">
          <MdArrowDropUp size={20} />
        </button>
        <span className="text-green-500 w-1/6">10/11/2024</span>
        <span className="text-gray-700 w-1/4">Suryabinayak, Bhaktapur</span>
        <span className="text-gray-700 w-1/6">Potato</span>
        <span className="text-gray-700 w-1/6">190,000kg</span>
        <span className="text-gray-700 w-1/6">1,000kg</span>
        <span className="text-red-500 font-medium w-1/6">2.3% Shortage</span>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none w-1/8"
          onClick={(e) => e.stopPropagation()}
        >
          Contribute
        </button>
      </div>

      {/* Expanded suppliers table */}
      <div className="bg-gray-100 text-black p-4 pl-12">
        <h3 className="text-green-800 mb-4 font-bold">Suppliers</h3>
        <div className="flex bg-gray-200 p-2 text-green-500">
          <span className="w-1/3">Municipality/ VDC</span>
          <span className="w-1/3">Product</span>
          <span className="w-1/6">Quantity</span>
          <span className="w-1/6">Date</span>
        </div>
        <div className="flex p-2 border-b-2">
          <span className="w-1/3">Suryabinayak</span>
          <span className="w-1/3">Potato</span>
          <span className="w-1/6">1,000kg</span>
          <span className="w-1/6 text-green-500">10/11/2024</span>
        </div>
      </div>
    </div>
  );
};

export default RequestedProductRowExpand;

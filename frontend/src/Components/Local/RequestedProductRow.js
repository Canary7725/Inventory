import React from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowDropDown } from 'react-icons/md';

const RequestedProductRow = ({ toggleExpand }) => {
  const navigate = useNavigate();

  const handleContributeClick = (e) => {
    e.stopPropagation(); // Prevent row click when the button is clicked
    navigate("/local-contribute-form");
  };

  return (
    <div className="text-green-500 font-normal w-full flex p-4 border-b-2 border-[#E9E9E9]" onClick={toggleExpand}>
      <button className="text-black w-2px px-4 h-2px mb-4">
        <MdArrowDropDown size={20} />
      </button>
      <span className="text-green-500 w-1/6">10/11/2024</span>
      <span className="text-gray-700 w-1/4">Suryabinayak, Bhaktapur</span>
      <span className="text-gray-700 w-1/6">Potato</span>
      <span className="text-gray-700 w-1/6">190,000kg</span>
      <span className="text-gray-700 w-1/6">1,000kg</span>
      <span className="text-red-500 font-medium w-1/6">2.3% Shortage</span>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none w-1/8"
        onClick={handleContributeClick}
      >
        Contribute
      </button>
    </div>
  );
};

export default RequestedProductRow;

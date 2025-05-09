import React from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";

const RequestedProductRow = ({ request, toggleExpand }) => {
  const navigate = useNavigate();

  const handleContributeClick = (e) => {
    e.stopPropagation(); // Prevent row expansion when clicking the button
    navigate(`/local-contribute-form/${request.id}`);
  };

  const requestedQuantity = parseInt(request.requested_quantity, 10);
  const receivedQuantity = parseInt(request.received_quantity, 10);
  const difference = receivedQuantity - requestedQuantity;
  console.log(request);

  return (
    <div
      className="text-green-500 font-normal w-full flex p-4 border-b-2 border-[#E9E9E9]"
      onClick={toggleExpand}
    >
      <span className="text-green-500 w-[15%]">
        {new Date(request.createdAt).toLocaleDateString()}
      </span>
      <span className="text-gray-700 w-[15%]">{request.user.username}</span>
      <span className="text-gray-700 w-[15%]">{request.vegetableName}</span>
      <span className="text-gray-700 w-[15%]">
        {request.requested_quantity}kg
      </span>
      <span className="text-gray-700 w-[15%]">
        {request.received_quantity}kg
      </span>
      <span
        className={`font-medium w-[15%] ${
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
  );
};

export default RequestedProductRow;

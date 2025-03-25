import React from "react";
import { useNavigate } from "react-router-dom";

const ComplaintLink = ({ complaint }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/read-complaint/${complaint.id}`); // Pass complaint ID for detailed view
  };

  return (
    <div
      className="flex bg-white pl-8 pr-8 justify-between items-center p-4 cursor-pointer hover:bg-[#E9E9E9] border-b-2 border-[#E9E9E9]"
      onClick={handleClick}
    >
      <span className="w-1/3 hover:text-black hover:font-bold hover:underline">
        {complaint.message}
      </span>
      <span className="w-1/3">
        {complaint.User ? complaint.User.username : "Unknown User"}
      </span>
      <span className="w-1/3 text-green-500">
        {new Date(complaint.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
};

export default ComplaintLink;

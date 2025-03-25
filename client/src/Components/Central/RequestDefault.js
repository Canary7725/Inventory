import React, { useState, useEffect } from "react";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";

export function RequestDefault({ request, toggleExpand }) {
  console.log(request);

  const [expanded, setExpanded] = useState(false);

  // Get the username from the request (assumes user data is included)
  const userName = request.user ? request.user.username : "Unknown User";

  return (
    <div>
      {/* Collapsed view with dropdown */}
      {!expanded ? (
        <div
          className="bg-white border-b-2 border-[#E9E9E9] text-black-bold p-4 flex items-center justify-between cursor-pointer"
          onClick={toggleExpand}
        >
          <span className="w-10">
            {" "}
            <MdArrowDropDown />
          </span>
          <span className="w-1/4">{userName}</span>{" "}
          {/* Display username here */}
          <span className="w-1/3">{request.vegetableName}</span>
          <span className="w-1/4">{request.requested_quantity}</span>
          <span className="w-1/4">{request.received_quantity}</span>
          <span className="w-1/6 text-green-500">
            {new Date(request.createdAt).toLocaleDateString()}
          </span>
        </div>
      ) : (
        <div>
          <div
            className="bg-[#BDEECB] text-black-bold p-4 flex items-center justify-between cursor-pointer"
            onClick={toggleExpand}
          >
            <span className="w-1/4">{userName}</span>{" "}
            {/* Display username here */}
            <span className="w-1/3">{request.vegetableName}</span>
            <span className="w-1/4">{request.requested_quantity}</span>
            <span className="w-1/4">{request.received_quantity}</span>
            <span className="w-1/6 text-green-500">
              {new Date(request.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

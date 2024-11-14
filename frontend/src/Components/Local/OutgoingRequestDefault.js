import React, { useState } from "react";
import OutgoingRequestDrop from "./OutgoingRequestDrop";
import { MdArrowDropDown } from 'react-icons/md';
import { MdArrowDropUp } from 'react-icons/md';

const OutgoingRequestsDefault = ({
  date,
  municipality,
  product,
  requestedQuantity,
  receivedQuantity,
  requests,
  status,
}) => {
  const [showDrop, setShowDrop] = useState(false);

  const statusColor =
    {
      Ongoing: "bg-green-500",
      Rejected: "bg-red-500",
      Completed: "bg-gray-500",
    }[status] || "bg-gray-500";

  return (
    <>
      <tr className={`border-b border-gray-300 ${showDrop ? 'bg-[#BDEECB]' : ''}`}>
      <button
            className="text-gray-500 w-2px p-4 h-2px mr-4"
            onClick={() => setShowDrop(!showDrop)}
          >
            {showDrop ? <MdArrowDropUp size={20} /> : <MdArrowDropDown size={20} />}
          </button>
        <td className="p-4">{date}</td>
        <td className="p-4">{municipality}</td>
        <td className="p-4">{product}</td>
        <td className="p-4">{requestedQuantity}</td>
        <td className="p-4">{receivedQuantity}</td>
        <td className="p-4">{requests}</td>
        <td className="p-4">
          <button className={`${statusColor} text-white px-3 py-1 rounded`}>
            {status}
          </button>
        </td>
      </tr>
      {showDrop && (
        <tr>
          <td colSpan="10">
            <OutgoingRequestDrop onClose={() => setShowDrop(false)} />
          </td>
        </tr>
      )}
    </>
  );
};

export default OutgoingRequestsDefault;

import React, { useState } from "react";
import OutgoingRequestDrop from "./OutgoingRequestDrop";

const OutgoingRequestsDefault = (props) => {
  console.log("Props received:", props); // Log all props
  const {
    user,
    id,
    createdAt, // Use createdAt instead of date
    vegetableName: product, // Map vegetableName to product
    requested_quantity: requestedQuantity, // Map requested_quantity to requestedQuantity
    received_quantity: receivedQuantity, // Map received_quantity to receivedQuantity
  } = props;

  const status =
    parseInt(receivedQuantity) >= parseInt(requestedQuantity)
      ? "Completed"
      : "Ongoing";
  const municipality = user?.username || "Unknown";
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US");

  const [showDrop, setShowDrop] = useState(false);

  const statusColor =
    {
      Ongoing: "bg-green-500",
      Rejected: "bg-red-500",
      Completed: "bg-gray-500",
    }[status] || "bg-gray-500";

  return (
    <>
      <tr
        className={`border-b border-gray-300 cursor-pointer ${
          showDrop ? "bg-[#BDEECB]" : ""
        }`}
        onClick={() => setShowDrop(!showDrop)} // Expand/Collapse row on click
      >
        <td className="p-4">{formattedDate}</td>
        <td className="p-4">{municipality}</td>
        <td className="p-4">{product}</td>
        <td className="p-4">{requestedQuantity}</td>
        <td className="p-4">{receivedQuantity}</td>
        <td className="p-4">
          <button className={`${statusColor} text-white px-3 py-1 rounded`}>
            {status}
          </button>
        </td>
      </tr>
      {showDrop && (
        <tr>
          <td colSpan="6">
            <OutgoingRequestDrop
              requestId={id}
              onClose={() => setShowDrop(false)}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default OutgoingRequestsDefault;

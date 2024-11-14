import React, { useState } from 'react';

const DropSupplier = ({ municipality, quantity, date, initialStatus }) => {
  const [status, setStatus] = useState(initialStatus);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const statusColor =
    status === "Ongoing" ? "bg-green-500" :
    status === "Rejected" ? "bg-red-500" :
    "bg-gray-500";

  return (
    <tr className="border-b border-gray-600">
      <td className="p-2 w-1/3">{municipality}</td>
      <td className="p-2 w-1/5">{quantity}</td>
      <td className="p-2 w-1/5">{date}</td>
      <td className="p-2">
        <select
          value={status}
          onChange={handleStatusChange}
          className={`${statusColor} text-white px-2 py-1 rounded cursor-pointer`}
        >
          <option value="Ongoing" className="bg-green-500 text-white">Ongoing</option>
          <option value="Rejected" className="bg-red-500 text-white">Rejected</option>
          <option value="Completed" className="bg-gray-500 text-white">Completed</option>
        </select>
      </td>
    </tr>
  );
};

export default DropSupplier;

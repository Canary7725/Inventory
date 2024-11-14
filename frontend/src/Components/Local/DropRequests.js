import React from 'react';

const DropRequest = ({ municipality, quantity, date }) => {
  return (
    <tr className="border-b border-gray-600">
      <td className="p-2 w-1/3">{municipality}</td>
      <td className="p-2 w-1/5">{quantity}</td>
      <td className="p-2 w-1/5">{date}</td>
      <td className="p-2">
        <button className="bg-green-500 text-white px-2 py-1 mr-2 rounded">Accept</button>
        <button className="bg-red-500 text-white px-2 py-1 rounded">Decline</button>
      </td>
    </tr>
  );
};

export default DropRequest;

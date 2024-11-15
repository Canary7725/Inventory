import React from "react";
import DropRequest from "./DropRequests";
import DropSupplier from "./DropSuppliers";

const OutgoingRequestDrop = ({ onClose }) => {
  const requests = [
    {
      id: 1,
      municipality: "Suryabinayak",
      quantity: "1,000kg",
      date: "10/11/2024",
    },
    {
      id: 2,
      municipality: "Suryabinayak",
      quantity: "5,000kg",
      date: "10/11/2024",
    },
    {
      id: 3,
      municipality: "Suryabinayak",
      quantity: "4,000kg",
      date: "10/11/2024",
    },
  ];

  const suppliers = [
    {
      id: 1,
      municipality: "Suryabinayak",
      quantity: "1,000kg",
      date: "10/11/2024",
      status: "Ongoing",
    },
    {
      id: 2,
      municipality: "Suryabinayak",
      quantity: "5,000kg",
      date: "10/11/2024",
      status: "Rejected",
    },
    {
      id: 3,
      municipality: "Suryabinayak",
      quantity: "4,000kg",
      date: "10/11/2024",
      status: "Completed",
    },
  ];

  return (
    <div className="bg-gray-100 text-gray-500 p-4 w-full pl-12">
      <div className=" text-gray-500 p-4 pl-1 w-full">
        <h3 className="text-gray-500 text-lg mb-2 font-bold">Requests</h3>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="w-full border-b border-gray-200 bg-gray-200 text-green-500">
              <th className="p-2">Municipality/ VDC</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <DropRequest key={request.id} {...request} />
            ))}
          </tbody>
        </table>
      </div>

      <div className=" text-gray-500 p-4 pl-1 mb-2 w-full">
        <h3 className="text-gray-500 text-lg mb-2 font-bold">Suppliers</h3>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="w-full border-b border-gray-200 bg-gray-200 text-green-500">
              <th className="p-2">Municipality/ VDC</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <DropSupplier key={supplier.id} {...supplier} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OutgoingRequestDrop;

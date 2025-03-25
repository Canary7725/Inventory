import React, { useEffect, useState } from "react";
import { MdArrowDropUp } from "react-icons/md";
import axios from "axios"; // Make sure axios is installed

export function RequestDrop({ request, toggleExpand, supplier }) {
  return (
    <div>
      <div
        className="bg-white border-b-2 border-[#E9E9E9] text-black-bold p-4 flex items-center justify-between cursor-pointer"
        onClick={toggleExpand}
      >
        <span className="w-10">
          <MdArrowDropUp />
        </span>
        <span className="w-1/4">{request.user.username}</span>
        <span className="w-1/3">{request.vegetableName}</span>
        <span className="w-1/4">{request.requested_quantity}</span>
        <span className="w-1/4">{request.received_quantity}</span>
        <span className="w-1/6 text-green-500">{request.date}</span>
      </div>

      {/* Expanded suppliers table */}
      <div className="bg-white text-black py-4 ">
        <h3 className="font-bold flex pl-12 py-[10px] gap-[10px] text-gray-800 bg-[#e9e9e9] border-2 ">
          Suppliers
        </h3>
        <div className="flex white p-2 text-green-500 border-2 pl-12">
          <span className="w-1/3">Municipality/ VDC</span>
          <span className="w-1/3">Product</span>
          <span className="w-1/6">Quantity</span>
          <span className="w-1/6">Date</span>
        </div>
        {supplier.map((supplier) => (
          <div
            className="flex p-2 border-x-2 border-b-2 pl-12"
            key={supplier.id}
          >
            <span className="w-1/3">{supplier.municipality}</span>
            <span className="w-1/3">{supplier.product}</span>
            <span className="w-1/6">{supplier.quantity}</span>
            <span className="w-1/6 text-green-500">
              {new Date(supplier.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

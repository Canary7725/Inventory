import React from 'react';
import { MdArrowDropUp } from 'react-icons/md';

export function RequestDrop({ toggleExpand }) {
  return (
    <div>
      {/* Top bar with the upward arrow */}
      <div className="bg-[#BDEECB] text-black-bold p-4 flex items-center justify-between cursor-pointer" onClick={toggleExpand}>
        <button className="text-black w-2px h-2px mr-4"><MdArrowDropUp size={20}/></button>
        <span className="w-1/3">Suryabinayak</span>
        <span className="w-1/3">Potato</span>
        <span className="w-1/6">10,000kg</span>
        <span className="w-1/6 text-green-500">10/11/2024</span>
      </div>
      
      {/* Expanded suppliers table */}
      <div className="bg-gray-100 text-black p-4 pl-12">
        <h3 className="text-gray-800 mb-2">Suppliers</h3>
        <div className="flex bg-gray-200 p-2 text-green-500">
          <span className="w-1/3">Municipality/ VDC</span>
          <span className="w-1/3">Product</span>
          <span className="w-1/6">Quantity</span>
          <span className="w-1/6">Date</span>
        </div>
        <div className="flex p-2 border-b-2">
          <span className="w-1/3">Suryabinayak</span>
          <span className="w-1/3">Potato</span>
          <span className="w-1/6">1,000kg</span>
          <span className="w-1/6 text-green-500">10/11/2024</span>
        </div>
      </div>
    </div>
  );
}
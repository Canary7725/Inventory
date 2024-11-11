import React from 'react';
import { MdArrowDropDown } from 'react-icons/md';


export function RequestDefault({ toggleExpand }) {
  return (
    <div className="bg-white text-black p-4 flex justify-between cursor-pointer border-b-2 border-[#E9E9E9]" onClick={toggleExpand}>
      <button className="text-black w-2px h-2px mr-4"><MdArrowDropDown size={20}/></button>
      <span className="w-1/3">Suryabinayak</span>
      <span className="w-1/3">Potato</span>
      <span className="w-1/6">10,000kg</span>
      <span className="w-1/6 text-green-500">10/11/2024</span>
    </div>
  );
}

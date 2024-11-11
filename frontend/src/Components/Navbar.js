import React from 'react';

const Navbar = ({ title }) => {
  return (
    <div className="flex justify-between items-center bg-white pl-8 pt-6 pb-6 pr-10 border-l-2 border-[#E9E9E9] ">
      <h1 className="text-2xl font-Black">{title}</h1>
      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
    </div>
  );
};

export default Navbar;
import React from 'react';

const Navbar = ({ title }) => {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-sm">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
    </div>
  );
};

export default Navbar;
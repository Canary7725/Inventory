import React from "react";

// Dropdown Component
const Dropdown = ({ label, options = [], value, onChange }) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 text-gray-700 font-medium">{label}</label>
      <select
        className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-gray-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;

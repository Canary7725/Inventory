// Button.js
import React from "react";

const Button = ({ text, onClick, variant = "primary" }) => {
  const getVariant = () => {
    switch (variant) {
      case "primary":
        return "bg-green-500 hover:bg-green-600";
      case "secondary":
        return "bg-gray-500 hover:bg-gray-600";
      case "destructive":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-green-500 hover:bg-green-600";
    }
  };
  return (
    <button
      onClick={onClick}
      className={`${getVariant()} text-white px-4 py-2 rounded transition duration-200`}
    >
      {text}
    </button>
  );
};

export default Button;

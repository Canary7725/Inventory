// Button.js
import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
    >
      {text}
    </button>
  );
};

export default Button;
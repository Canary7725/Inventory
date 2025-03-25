import React from "react";

const ProdHTR = ({ production, serialNumber }) => {
  const { vegetableName, quantity, localDemand } = production;

  // Calculate status (percentage shortage or excess)
  const statusPercentage =
    ((parseInt(quantity) - parseInt(localDemand)) / parseInt(localDemand)) *
    100;
  const statusText =
    statusPercentage >= 0
      ? `${Math.abs(statusPercentage).toFixed(1)}% Excess`
      : `${Math.abs(statusPercentage).toFixed(1)}% Shortage`;

  return (
    <div className="text-gray-500 font-normal w-full p-4 flex items-center justify-between border-b-2 border-[#E9E9E9]">
      <span className="w-1/6">{serialNumber}</span>
      <span className="w-1/4">{vegetableName}</span>
      <span className="w-1/5">{quantity} kg</span>
      <span className="w-1/5">{localDemand} kg</span>
      <span
        className={`w-1/6 font-medium ${
          statusPercentage >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {statusText}
      </span>
    </div>
  );
};

export default ProdHTR;

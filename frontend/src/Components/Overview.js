import React from "react";

const Overview = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">Overview</h2>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Vegetables</span>
          <span className="text-green-500 font-semibold text-xl">300</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Excess (%)</span>
          <span className="text-green-500 font-semibold text-xl">0.8%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Productions (kg)</span>
          <span className="text-green-500 font-semibold text-xl">300k+</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shortage (%)</span>
          <span className="text-green-500 font-semibold text-xl">20%</span>
        </div>
      </div>
    </div>
  );
};

export default Overview;

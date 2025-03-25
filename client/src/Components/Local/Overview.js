import React, { useEffect, useState } from "react";

const Overview = ({ quantity, demand, vegetable }) => {
  const [status, setstatus] = useState("");
  const diff = quantity - demand;
  console.log(diff);

  useEffect(() => {
    if (diff > 0) {
      setstatus("Excess");
    } else if (diff == 0) {
      setstatus("-");
    } else {
      setstatus("Deficit");
    }
  }, [quantity]);

  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">Overview</h2>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Vegetables</span>
          <span className="text-green-500 font-semibold text-xl">
            {vegetable}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Production (kg)</span>
          <span className="text-green-500 font-semibold text-xl">
            {quantity}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Demand (kg)</span>
          <span className="text-green-500 font-semibold text-xl">{demand}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Status</span>
          <span
            className={`font-semibold text-xl ${
              diff >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Overview;

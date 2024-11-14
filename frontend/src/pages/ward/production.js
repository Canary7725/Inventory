import React, { useState } from "react";
import WardLayout from "./layout";
import { useNavigate } from "react-router-dom";
import ProdHTR from "../../Components/ProdHTR";
const WardProduction = () => {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(false); // Define expandedRow state

  const toggleExpand = () => {
    setExpandedRow((prev) => !prev);
  };

  return (
    <div>
      <WardLayout title="Production">

        <div className="bg-white rounded-xl p-6 w-full shadow-lg mt-4 ">
          <h2 className="text-lg font-bold mb-4 text-green-500">
            Enter Production Data
          </h2>
          <form>
            {/* Municipality Field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Municipality/ VDC:
              </label>
              <input
                type="text"
                value="Suryabinayak"
                readOnly
                className="bg-gray-200 border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>

            {/* Product Field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Product:</label>
              <input
                type="text"
                value="Potato"
                readOnly
                className="bg-gray-200 border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>

            {/* Quantity Field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Produced Quantity:</label>
              <input
                type="text"
                value="10,000kg"
                readOnly
                className="bg-gray-200 border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>

            {/* Demand Field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Demand Quantity:</label>
              <input
                type="text"
                value="1,000kg"
                readOnly
                className="bg-gray-200 border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>

            {/* Form Buttons */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold p-4 text-gray-800">
              Production History
            </h2>
            <div className="flex items-center space-x-2">
              <select className="text-gray-600 bg-white border rounded-md px-3 py-1 focus:outline-none">
                <option>November</option>
              </select>
            </div>
          </div>
          <div className="text-green-500 font-bold w-full p-4 flex items-center justify-between border-b-2 border-[#E9E9E9]">
            <span className="w-1/6">Serial No.</span>
            <span className="w-1/4">Product</span>
            <span className="w-1/5">Production</span>
            <span className="w-1/5">Demand</span>
            <span className="w-1/6">Status(%)</span>
          </div>
          <ProdHTR />
          <ProdHTR />
          <ProdHTR />
          <ProdHTR />
          <ProdHTR />
        </div>
      </WardLayout>
    </div>
  );
};

export default WardProduction;

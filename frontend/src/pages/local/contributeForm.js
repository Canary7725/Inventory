import React, { useState } from "react";
import LocalLayout from "./layout";
import { useNavigate } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md"; // Import MdArrowDropDown
import RequestedProductRow from "../../Components/Local/RequestedProductRow"; // Import RequestedProductRow
import RequestedProductRowExpand from "../../Components/Local/RequestedProductRowExpand"; // Import RequestedProductRowExpand

const ContributeForm = () => {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(false); // Define expandedRow state

  const toggleExpand = () => {
    setExpandedRow((prev) => !prev);
  };

  return (
    <div>
      <LocalLayout title="Request">
        <div className="bg-white shadow-md rounded-xl p-6 mt-2">
          <div className="text-green-500 font-bold w-full p-4 flex border-b-2 border-[#E9E9E9]">
            <button className="text-white w-2px px-4 h-2px mb-4">
              <MdArrowDropDown size={20} />
            </button>
            <span className="w-1/6">Date</span>
            <span className="w-1/4">Municipality/ VDC</span>
            <span className="w-1/6">Product</span>
            <span className="w-1/6">Requested Quantity</span>
            <span className="w-1/6">Received Quantity</span>
            <span className="w-1/6">Your Status</span>
            <button className="bg-white text-white px-4 py-2 rounded w-1/8">
              Contribute
            </button>
          </div>
          {expandedRow ? (
            <RequestedProductRowExpand toggleExpand={toggleExpand} />
          ) : (
            <RequestedProductRow toggleExpand={toggleExpand} />
          )}
        </div>

        <div className="bg-white rounded-xl p-6 w-full shadow-lg mt-4 ">
          <h2 className="text-lg font-bold mb-4 text-green-500">
            Contribute Product
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
              <label className="block text-gray-700 mb-2">Quantity:</label>
              <input
                type="text"
                value="10,000kg"
                readOnly
                className="bg-gray-200 border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>

            {/* Form Buttons */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/local-requested-products")}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Contribute Product
              </button>
            </div>
          </form>
        </div>
      </LocalLayout>
    </div>
  );
};

export default ContributeForm;

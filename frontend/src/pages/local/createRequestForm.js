import React from "react";
import LocalLayout from "./layout";
import { useNavigate } from "react-router-dom"; 


const CreateRequestForm =() => {
    const navigate = useNavigate();
  return (
    <div>
      <LocalLayout title="Outgoing Requests">
     
          <div className="bg-white rounded-xl p-6 w-full shadow-lg mt-4 ">
            <h2 className="text-lg font-bold mb-4 text-green-500">Create New Request</h2>
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
                  onClick={() => navigate("/local-outgoing-requests")}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Request Product
                </button>
              </div>
            </form>
          </div>
     
      </LocalLayout>
    </div>
  );
};

export default CreateRequestForm;

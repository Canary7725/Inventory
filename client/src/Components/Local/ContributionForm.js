import React from "react";

const ContributionForm = () => {
  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Request Contribution</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Municipality/ VDC:
          </label>
          <input
            type="text"
            value="Suryabinayak"
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-200"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Product:
          </label>
          <input
            type="text"
            value="Potato"
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-200"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Quantity:
          </label>
          <input
            type="text"
            value="190,000kg"
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-200"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
        >
          Request Contribution
        </button>
      </form>
    </div>
  );
};

export default ContributionForm;

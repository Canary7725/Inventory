import React, { useEffect, useState } from "react";
import WardLayout from "./layout";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ProdHTR from "../../Components/ProdHTR";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const WardProduction = () => {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(false); // Define expandedRow state
  const [vegetableName, setVegetableName] = useState();
  const [quantity, setQuantity] = useState();
  const [localDemand, setLocalDemand] = useState();

  const [production, setProduction] = useState([]);

  const token = jwtDecode(localStorage.token);
  const user = token.username;
  const userId = token.user_id;
  const toggleExpand = () => {
    setExpandedRow((prev) => !prev);
  };

  useEffect(() => {
    fetchProduction();
  }, []);

  const handleSubmit = async (e) => {
    try {
      await axios.post("http://localhost:4000/api/production/create", {
        wardNo: user,
        vegetableName,
        quantity,
        userId,
        localDemand,
      });
      toast.success("Created sucessfully");
    } catch (e) {
      console.error("Failed to submit contribution", e);
    }
  };

  const fetchProduction = async () => {
    try {
      const userproduction = await axios.get(
        `http://localhost:4000/api/production/user/${userId}`
      );
      setProduction(userproduction.data.data);
    } catch (e) {
      console.error("Error", e);
    }
  };

  return (
    <div>
      <ToastContainer />
      <WardLayout title="Production">
        <div className="bg-white rounded-xl p-6 w-full shadow-lg mt-4 ">
          <h2 className="text-lg font-bold mb-4 text-green-500">
            Enter Production Data
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Municipality Field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Municipality/ VDC:
              </label>
              <input
                type="text"
                value={user}
                readOnly
                className="bg-gray-200 border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>

            {/* Product Field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Product:</label>
              <input
                type="text"
                className="bg-gray-200 border border-gray-300 rounded px-4 py-2 w-full"
                onChange={(e) => setVegetableName(e.target.value)}
              />
            </div>

            {/* Quantity Field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Produced Quantity:
              </label>
              <input
                type="text"
                className="bg-gray-200 border border-gray-300 rounded px-4 py-2 w-full"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            {/* Demand Field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Demand Quantity:
              </label>
              <input
                type="text"
                className="bg-gray-200 border border-gray-300 rounded px-4 py-2 w-full"
                onChange={(e) => setLocalDemand(e.target.value)}
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

          {production.length > 0 ? (
            production.map((production, index) => (
              <ProdHTR
                key={production.id}
                production={production}
                serialNumber={index + 1}
              />
            ))
          ) : (
            <div className="p-4 text-gray-500">No Production found.</div>
          )}
        </div>
      </WardLayout>
    </div>
  );
};

export default WardProduction;

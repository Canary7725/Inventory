import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LocalLayout from "./layout";
import Dropdown from "../../Components/Dropdown";
import axios from "axios";

const LocalProduction = () => {
  const [selectedProduct, setSelectedProduct] = useState("All");
  const [selectedMunicipality, setSelectedMunicipality] =
    useState("Suryabinayak");
  const [productions, setProductions] = useState([]);
  const [filteredProductions, setFilteredProductions] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const username = decodedToken.username;
      fetchUserProductions(username);
    }
  }, []);

  const fetchUserProductions = async (username) => {
    try {
      const response = await axios.get("http://localhost:4000/api/production");
      const allProductions = response.data.data;

      const usersResponse = await axios.get(
        "http://localhost:4000/api/auth/users"
      );
      const users = usersResponse.data.data;

      const matchingUsers = users.filter((user) => user.localgov === username);
      const matchingUserIds = matchingUsers.map((user) => user.id);

      const userProductions = allProductions.filter((prod) =>
        matchingUserIds.includes(prod.userId)
      );

      setProductions(userProductions);
      setFilteredProductions(userProductions);
    } catch (error) {
      console.error("Failed to fetch productions", error);
    }
  };

  return (
    <div>
      <LocalLayout title="Production History">
        <div className="flex space-x-4 mt-4"></div>

        <div className="bg-white shadow-md rounded-xl p-6 mt-2">
          <div className="text-green-500 font-bold w-full p-4 flex items-center justify-between border-b-2 border-[#E9E9E9]">
            <span className="w-1/6">Ward No</span>
            <span className="w-1/4">Product</span>
            <span className="w-1/5">Production</span>
            <span className="w-1/5">Demand</span>
            <span className="w-1/6">Status</span>
          </div>
          {filteredProductions.map((prod, index) => {
            const production = parseInt(prod.quantity, 10);
            const demand = parseInt(prod.localDemand, 10);
            const difference = production - demand;
            const percentage = ((difference / demand) * 100).toFixed(2);

            return (
              <div
                key={index}
                className="text-gray-500 font-normal w-full p-4 flex items-center justify-between border-b-2 border-[#E9E9E9]"
              >
                <span className="w-1/6">{prod.wardNo}</span>
                <span className="w-1/4">{prod.vegetableName}</span>
                <span className="w-1/5">{prod.quantity}kg</span>
                <span className="w-1/5">{prod.localDemand}kg</span>
                <span
                  className={`font-medium w-1/6 ${
                    difference < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {difference < 0
                    ? `${Math.abs(percentage)}% Deficit`
                    : `${Math.abs(percentage)}% Excess`}
                </span>
              </div>
            );
          })}
        </div>
      </LocalLayout>
    </div>
  );
};

export default LocalProduction;

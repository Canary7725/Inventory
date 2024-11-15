import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Fix: Removed curly braces for correct import
import WardLayout from "./layout";
import Dropdown from "../../Components/Dropdown";
import Chart from "../../Components/Chart";
import Overview from "../../Components/Overview";
import HighestProducingVegetables from "../../Components/HighestProducingVegetables ";

const LHome = () => {
  const [vegetableOptions, setVegetableOptions] = useState([]);
  const [localUsers, setLocalUsers] = useState([]);
  const [selectedVegetable, setSelectedVegetable] = useState("All");
  const [selectedUser, setSelectedUser] = useState("");

  // Fetch vegetable names and local users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vegetableRes, userRes] = await Promise.all([
          fetch("http://localhost:4000/api/production/vegetables"),
          fetch("http://localhost:4000/api/auth/locals"),
        ]);

        const vegetables = await vegetableRes.json();
        const users = await userRes.json();

        setVegetableOptions(vegetables);
        setLocalUsers(users);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <WardLayout title="Dashboard">
      <div className="flex space-x-4 my-4">
        <Dropdown
          label="Vegetable"
          options={[...vegetableOptions]}
          value={selectedVegetable}
          onChange={setSelectedVegetable}
        />
        <Dropdown
          label="Local User"
          options={localUsers.map((user) => user.username)}
          value={selectedUser}
          onChange={setSelectedUser}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Overview />
        <HighestProducingVegetables
          username={selectedUser}
          selectedVegetable={selectedVegetable}
        />
      </div>

      <div className="mt-6">
        <Chart
          selectedUser={selectedUser}
          selectedVegetable={vegetableOptions}
        />
      </div>
    </WardLayout>
  );
};

export default LHome;

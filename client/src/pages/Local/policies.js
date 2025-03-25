import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import Layout from "../Local/layout";
import PolicyLink from "../../Components/Central/PolicyLink";
import axios from "axios";

const Policies = () => {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);

  const handleCreatePolicy = () => {
    navigate("/create-policy"); // Navigate to the CreatePolicy page
  };

  // Fetch policies from API
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/policy/");
        setPolicies(response.data.data); // Assuming the response structure has data in `data.data`
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };
    fetchPolicies();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <Layout title="Policies">
        <div className="p-6">
          <div className="border-t border-[#E9E9E9] bg-white">
            <div className="text-green-500 p-4 pl-8 pr-8 flex items-center justify-between border-b-2 border-[#E9E9E9]">
              <span className="w-1/3">Policy Title</span>
              <span className="w-1/6">Date Issued</span>
            </div>
            {policies.length > 0 ? (
              policies.map((policy) => (
                <PolicyLink key={policy.id} policy={policy} />
              ))
            ) : (
              <div className="p-4">No policies found.</div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Policies;

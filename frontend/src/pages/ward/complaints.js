import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import LocalLayout from "./layout";
import PolicyLink from "../../Components/PolicyLink";


const WardComplaints = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full">
      <LocalLayout title="Complaints">
        <div className="p-6">
          <button
            className="bg-green-500 text-white px-4 py-2 my-4 rounded"
            onClick={() => navigate("/local-create-complaints-form")}
          >
            Create New Complaint
          </button>
          <div className="border-t rounded-xl border-[#E9E9E9] p-4 bg-white">
          <h2 className="text-xl font-bold p-4 text-green-500">Recent Complaints</h2>
            <div className="text-green-500 font-bold p-4 pl-8 pr-8 flex items-center justify-between border-b-2 border-[#E9E9E9]">
              <span className="w-1/3">Complaints</span>
              <span className="w-1/6">Date Issued</span>
            </div>
            <PolicyLink />
            <PolicyLink />
            <PolicyLink />
            <PolicyLink />
            <PolicyLink />
            <PolicyLink />
            <PolicyLink />
            <PolicyLink />
          </div>
        </div>
      </LocalLayout>
    </div>
  );
};

export default WardComplaints;

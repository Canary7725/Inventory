import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import Layout from "./layout";
import PolicyLink from "../Components/PolicyLink";

const Complaints = () => {
  return (
    <div className="flex flex-col w-full">
      <Layout title="Complaints">
        <div className="p-6">
          <div className="border-t rounded-xl border-[#E9E9E9] bg-white">
            <div className="text-green-500 p-4 pl-8 pr-8 flex items-center justify-between border-b-2 border-[#E9E9E9]">
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
      </Layout>
    </div>
  );
};

export default Complaints;

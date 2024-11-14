import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WardLayout from './layout';
import PolicyLink from '../../Components/PolicyLink';


const WardPolicies = () => {

    return (
      <div className="flex flex-col w-full">
        <WardLayout title="Policies">
        <div className="p-6">
         
          <div className="border-t border-[#E9E9E9] bg-white rounded-lg">
            <div className="text-green-500 p-4 pl-8 pr-8 flex items-center justify-between border-b-2 border-[#E9E9E9]">
                <span className="w-1/3">Policy Title</span>
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
        </WardLayout>
      </div>
    );
  };
  
  
  export default WardPolicies;



import React from 'react';
import { useNavigate } from 'react-router-dom';

const PolicyLink = ({ policy }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/read-policy/${policy.id}`); // Navigates to ReadPolicy page with policy ID
    };

    return (
        <div
            className="flex bg-white pl-8 pr-8 justify-between items-center p-4 cursor-pointer hover:bg-[#E9E9E9] border-b-2 border-[#E9E9E9]"
            onClick={handleClick}
        >
            <span className="hover:text-black hover:font-bold hover:underline w-1/3">
                {policy.title}
            </span>
            <span className="w-1/6 text-green-500">
                {new Date(policy.createdAt).toLocaleDateString()}
            </span>
        </div>
    );
};

export default PolicyLink;

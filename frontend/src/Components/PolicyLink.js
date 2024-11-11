import React from 'react';
import { useNavigate } from 'react-router-dom';

const PolicyLink = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/read-policy'); // Navigates to readPolicy page
    };

    return (
        <div
            className="flex bg-white pl-8 pr-8 justify-between items-center p-4 cursor-pointer hover:bg-[#E9E9E9] border-b-2 border-[#E9E9E9]"
            onClick={handleClick}
        >
            <span className="hover:text-black hover:font-bold hover:underline">
                The Transaction Act Revised 2024
            </span>
            <span className="w-1/6 text-green-500">10/11/2024</span>
        </div>
    );
};

export default PolicyLink;

import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const User = ({ user }) => {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/update-form/${user.id}`);
  };

  return (
    <div className="flex bg-white pl-8 pr-8 justify-between items-center p-4 cursor-pointer hover:bg-[#E9E9E9] border-b-2 border-[#E9E9E9]">
      <span className="hover:text-black hover:font-bold hover:underline w-1/3">
        {user.username}
      </span>
      <span className="w-1/6 text-green-500">{user.contact}</span>
      <span className="w-1/6 text-green-500">{user.role}</span>
      <div className="w-1/6">
        <span className="flex gap-3">
          <Button text="Update" onClick={handleUpdate} />
        </span>
      </div>
    </div>
  );
};

export default User;

import React, { useEffect, useState } from "react";
import Layout from "../layout";
import Button from "../../Components/Button";
import axios from "axios";
import User from "../../Components/Central/User";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const navigate = useNavigate();

  const token = jwtDecode(localStorage.token);
  const loggedInUsername = token.username;

  const fetchUsers = async () => {
    try {
      const users = await axios.get("http://localhost:4000/api/auth/users");
      const allUsers = users.data.data;
      const filteredUsers = allUsers.filter(
        (user) => user.username !== loggedInUsername
      );

      setUsers(filteredUsers);
    } catch (e) {
      console.log("error fetching users", e);
    }
  };

  const handleCreateUser = () => {
    navigate("/create-user-form");
  };

  return (
    <div>
      <Layout title={"Manage Users"}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <Button text="Create Users" onClick={handleCreateUser} />
          </div>

          <div className="border-t border-[#E9E9E9] bg-white">
            <div className="text-green-500 p-4 pl-8 pr-8 flex items-center justify-between border-b-2 border-[#E9E9E9]">
              <span className="w-1/3">Username</span>
              <span className="w-1/6">Contact</span>
              <span className="w-1/6">Role</span>
              <span className="w-1/6">Action</span>
            </div>
            {users.length > 0 ? (
              users.map((user) => <User key={user.id} user={user} />)
            ) : (
              <div className="p-4">No policies found.</div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ManageUsers;

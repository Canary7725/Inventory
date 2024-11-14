import React from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import { useCookies } from "react-cookie"; // For managing cookies
import logo from "../../Assets/Images/logo.png";

// Importing icons from react-icons
import {
  MdDashboard,
  MdFoodBank,
  MdInbox,
  MdOutbox,
  MdBarChart,
  MdPolicy,
  MdFeedback,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import { TbPlant } from "react-icons/tb";

const LocalSidebar = ({ username }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the auth token from localStorage and cookies
    localStorage.removeItem("token");
    removeCookie("authToken"); // Clear the cookie if it's set
    navigate("/"); // Redirect to login page after logout
  };
  return (
    <div className="h-screen w-64 bg-white-100 pl-8 pt-4 ">
      <div className="mb-8 p-4">
        <img src={logo} className="h-14 w-auto" alt="Eco Nepal Logo" />
      </div>
      <nav>
        {[
          { name: "Dashboard", icon: <MdDashboard /> },
          { name: "Production History", icon: <TbPlant /> },
          { name: "Outgoing Request", icon: <MdInbox /> },
          { name: "Requests", icon: <MdOutbox /> },
          { name: "Forecast", icon: <MdBarChart /> },
          { name: "Policies", icon: <MdPolicy /> },
          { name: "Complaints", icon: <MdFeedback /> },
        ].map((item) => (
          <a
            href={`#${item.name.toLowerCase().replace(" ", "")}`}
            className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded-md p-4 w-48"
            key={item.name}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </a>
        ))}
      </nav>
      <div className="mt-auto">
        <a
          href="#settings"
          className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded-md p-4 w-48"
        >
          <MdSettings className="mr-3" />
          Settings
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded-md w-48 text-left p-4"
        >
          <MdLogout className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default LocalSidebar;

import React from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import { useCookies } from "react-cookie"; // For managing cookies
import logo from "../../Assets/Images/logo.png";

// Importing icons from react-icons
import {
  MdDashboard,
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
    localStorage.removeItem("token");
    removeCookie("authToken");
    navigate("/");
  };

  // Define routes for each sidebar item
  const routes = {
    Dashboard: "/local-home",
    "Production History": "/local-production",
    "Outgoing Request": "/local-outgoing-requests",
    Requests: "/local-requested-products",
    Forecast: "/local-home",
    Policies: "/local-policies",
    Complaints: "/local-complaints",
    Settings: "/local-home", // assuming this is the route for settings
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
          <button
            onClick={() => navigate(routes[item.name])}
            className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded-md p-4 w-48 text-left"
            key={item.name}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </nav>
      <div className="mt-auto">
        <button
          onClick={() => navigate(routes.Settings)}
          className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded-md p-4 w-48 text-left"
        >
          <MdSettings className="mr-3" />
          Settings
        </button>
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

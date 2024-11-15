import React from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import { useCookies } from "react-cookie"; // For managing cookies
import logo from "../../Assets/logo.png";

// Importing icons from react-icons
import {
  MdDashboard,
  MdPolicy,
  MdFeedback,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import { TbPlant } from "react-icons/tb";

const WardSidebar = ({ username }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    removeCookie("authToken");
    navigate("/");
  };

  const routes = {
    Dashboard: "/ward-home",
    Production: "/ward-production",
    Policies: "/ward-policies",
    Complaints: "/ward-complaints",
    Settings: "/ward-home",
  };

  return (
    <div className="h-screen w-64 bg-white-100 pl-8 pt-4 ">
      <div className="mb-8 p-4">
        <img src={logo} className="h-14 w-auto" alt="Eco Nepal Logo" />
      </div>
      <nav>
        {[
          { name: "Dashboard", icon: <MdDashboard />, link: "ward-home" },
          { name: "Production", icon: <TbPlant />, link: "ward-production" },
          { name: "Policies", icon: <MdPolicy />, link: "ward-policies" },
          { name: "Complaints", icon: <MdFeedback />, link: "ward-complaints" },
        ].map((item) => (
          <a
            href={`/${item.link}`}
            className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded-md p-4 w-48"
            key={item.name}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </a>
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

export default WardSidebar;

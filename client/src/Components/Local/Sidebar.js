import React from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import { useCookies } from "react-cookie"; // For managing cookies
import logo from "../../Assets/logo.png";

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

const Sidebar = ({ username }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the auth token from localStorage and cookies
    localStorage.removeItem("token");
    removeCookie("authToken"); // Clear the cookie if it's set
    navigate("/"); // Redirect to login page after logout
  };
  return (
    <div className="h-screen w-60 bg-white-100 pl-10 pt-4 ">
      <div className="mb-8 p-4">
        <img src={logo} className="h-14 w-auto" alt="Eco Nepal Logo" />
      </div>
      <nav>
        {[
          { name: "Dashboard", icon: <MdDashboard />, link: "local-home" },
          {
            name: "Production History",
            icon: <TbPlant />,
            link: "local-production",
          },
          {
            name: "Outgoing Request",
            icon: <MdInbox />,
            link: "local-outgoing-requests",
          },
          {
            name: "Requests",
            icon: <MdOutbox />,
            link: "local-requested-products",
          },
          { name: "Forecast", icon: <MdBarChart />, link: "local-forecast" },
          { name: "Policies", icon: <MdPolicy />, link: "local-policies" },
          {
            name: "Complaints",
            icon: <MdFeedback />,
            link: "local-complaints",
          },
        ].map((item) => (
          <a
            href={`/${item.link}`}
            className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded-md p-4"
            key={item.name}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </a>
        ))}
      </nav>
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded-md w-full text-left p-4"
        >
          <MdLogout className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

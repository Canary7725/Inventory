import React from 'react';
import { useNavigate } from "react-router-dom"; // For redirection
import { useCookies } from "react-cookie"; // For managing cookies

const Sidebar = ({username}) => {
    const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
    const navigate=useNavigate();
    const handleLogout = () => {
        // Clear the auth token from localStorage and cookies
        localStorage.removeItem("token");
        removeCookie("authToken"); // Clear the cookie if it's set
        navigate("/"); // Redirect to login page after logout
      };
  return (
    <div className="h-screen w-64 bg-gray-100 p-4 ">
      <div className="text-xl font-bold mb-8">Eco Nepal</div>
      <nav>
        {['Dashboard', 'Request Report', 'Forecast', 'Policies', 'Complaints'].map((item) => (
          <a href={`#${item.toLowerCase()}`} className="block py-2 text-gray-700 hover:bg-gray-200 rounded-md" key={item}>
            {item}
          </a>
        ))}
      </nav>
      <div className="mt-auto">
        <a href="#settings" className="block py-2 text-gray-700 hover:bg-gray-200 rounded-md">Settings</a>
        <button
        onClick={handleLogout}
        className="block py-2 text-gray-700 hover:bg-gray-200 rounded-md w-full text-left"
      >
        Logout
      </button>
      </div>
    </div>
  );
};

export default Sidebar;

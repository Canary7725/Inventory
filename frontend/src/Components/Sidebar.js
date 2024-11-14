import React from 'react';
import { useNavigate } from "react-router-dom"; 
import { useCookies } from "react-cookie"; 
import logo from '../Assets/Images/logo.png';

// Importing icons from react-icons
import { MdDashboard, MdReport, MdBarChart, MdPolicy, MdFeedback, MdSettings, MdLogout } from 'react-icons/md';

const Sidebar = ({ username }) => {
    const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
    const navigate = useNavigate();

    const handleLogout = () => {
        
        localStorage.removeItem("token");
        removeCookie("authToken"); 
        navigate("/"); 
    };

   
    const routes = {
        Dashboard: "/home",
        "Request Report": "/request-report",
        Forecast: "/forecast",
        Policies: "/policies",
        Complaints: "/complaints",
        Settings: "/settings",
    };

    return (
        <div className="h-screen w-52 bg-white-100 pl-10 pt-4 ">
            <div className="mb-8 p-4">
                <img src={logo} className="h-14 w-auto" alt="Eco Nepal Logo" />
            </div>
            <nav>
                {[
                    { name: 'Dashboard', icon: <MdDashboard /> },
                    { name: 'Request Report', icon: <MdReport /> },
                    { name: 'Forecast', icon: <MdBarChart /> },
                    { name: 'Policies', icon: <MdPolicy /> },
                    { name: 'Complaints', icon: <MdFeedback /> }
                ].map((item) => (
                    <button
                        onClick={() => navigate(routes[item.name])}
                        className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded-md p-4 w-full text-left"
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
                    className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded-md p-4 w-full text-left"
                >
                    <MdSettings className="mr-3" />
                    Settings
                </button>
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

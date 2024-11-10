import React from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';

const Layout = ({ title, children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        <Navbar title={title} />
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

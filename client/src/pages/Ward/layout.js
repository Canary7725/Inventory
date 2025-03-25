import React from "react";
import WardSidebar from "../../Components/Ward/Sidebar";
import Navbar from "../../Components/Navbar";

const WardLayout = ({ title, children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-[#E9E9E9]">
        <WardSidebar />
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 ml-64">
        {/* Navbar */}
        <header className="fixed top-0 right-0 left-64 z-10 bg-white border-b-1 border-[#E9E9E9]">
          <Navbar title={title} />
        </header>

        {/* Main Content Area */}
        <main
          className="pt-24
         px-6 pb-6"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default WardLayout;

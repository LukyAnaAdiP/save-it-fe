import React from "react";
import SidebarAdmin from "./components/admin/SidebarAdmin";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import { SidebarProvider } from "./context/SidebarContext";

function DashboardAdminApp() {
  const { darkMode } = useTheme();

  return (
    <SidebarProvider>
      <div
        className={`flex h-screen overflow-hidden ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <SidebarAdmin />
          {/* <div className="max-w-screen-2xl mx-auto"> */}
        <div className="flex-1 p-5 overflow-y-auto">
          <Header />
          <Outlet />
        {/* </div> */}
      </div>
    </div>
    </SidebarProvider>
  );
}

export default DashboardAdminApp;

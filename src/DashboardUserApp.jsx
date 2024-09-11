import "./index.css";
import SidebarDashboard from "./components/warehouse/SidebarWarehouse";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useTheme } from "./context/ThemeContext";
import { SidebarProvider } from "./context/SidebarContext";

export default function DashboardUserApp() {
  const { darkMode } = useTheme();

  return (
    <SidebarProvider>
      <div
        className={`flex h-screen overflow-hidden ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <SidebarDashboard />
          {/* <div className="max-w-screen-2xl"> */}
        <div className="flex-1 p-5 overflow-y-auto">
          <Header />
          <Outlet />
        {/* </div> */}
      </div>
    </div>
    </SidebarProvider>
  );
}

import React, { useState } from "react";
import {
  IconLayoutDashboard,
  IconBuildingStore,
  IconListDetails,
  IconChevronLeft,
  IconUsers,
  IconHome,
  IconLogout,
} from "@tabler/icons-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { useAuthentication } from "../../context/AuthContext";
import { useSidebar } from "../../context/SidebarContext";

const linkClasses =
  "flex items-center gap-2 font-bold px-3 py-5 hover:bg-orange-500 hover:text-white hover:rounded hover:rounded-xl hover:no-underline active:bg-neutral-600 rounded-sm text-base";

const SidebarAdmin = () => {
  const [open, setOpen] = useState(true);
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const toast = useToast();
  const navigate = useNavigate();
  const { logout } = useAuthentication();

  const handleSignOut = () => {
    toast.open("Success sign out!", "success");
    logout();
    navigate("/signin");
  };

  const navigation = [
    {
      key: "dashboard",
      name: "Dashboard",
      to: "/dashboardadmin",
      icon: <IconLayoutDashboard />,
    },
    {
      key: "vendor",
      name: "Vendor & Product",
      to: "vendor",
      icon: <IconBuildingStore />,
    },
    {
      key: "vendorlist",
      name: "Vendor List",
      to: "vendorlist",
      icon: <IconListDetails />,
    },
    {
      key: "customerlist",
      name: "Customer List",
      to: "customerlist",
      icon: <IconUsers />,
    },
  ];

  return (
    <div className="flex">
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-800 h-screen p-5 pt-8 relative duration-300`}
      >
        <IconChevronLeft
          size={30}
          className={`absolute cursor-pointer border-black -right-3 top-9 w-7 text-white bg-black border rounded-full ${
            !isSidebarOpen && "rotate-180"
          }`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className="flex flex-col h-full justify-between">
          <div>
            <Link
              to="/"
              className="flex items-center text-orange-600 text-lg font-bold hover:text-orange-700 hover:cursor-pointer"
            >
              <IconHome color="white" size={24} className="mx-2" />
              <span
                className={`${
                  !isSidebarOpen && "hidden"
                } origin-left duration-200`}
              >
                Back To Home
              </span>
            </Link>
            <ul className="pt-6">
              {navigation.map((item) => (
                <li key={item.key} className="-mx-1">
                  <SidebarLink item={item} open={isSidebarOpen} />
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-5">
            <Link
              onClick={handleSignOut}
              className="font-bold text-lg cursor-pointer text-orange-600 hover:text-white"
            >
              <IconLogout className="inline mx-2 ml-3" size={25} />
              <span
                className={`${
                  !isSidebarOpen && "hidden"
                } origin-left duration-200`}
              >
                Sign Out
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;

const SidebarLink = ({ item, open }) => {
  return (
    <NavLink
      to={item.to}
      end={item.to === "/dashboardadmin"}
      className={({ isActive }) =>
        `${linkClasses} ${isActive ? "text-white" : "text-neutral-400"}`
      }
    >
      <span className="text-2xl">{item.icon}</span>
      <span className={`${!open && "hidden"} origin-left duration-200 ml-2`}>
        {item.name}
      </span>
    </NavLink>
  );
};

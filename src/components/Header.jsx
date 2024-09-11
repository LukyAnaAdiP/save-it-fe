import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Avatar from "../../public/images/avatar-default.svg";
import { IconSettings, IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { IconSearch } from "@tabler/icons-react";
import { useTheme } from "../context/ThemeContext";
import { useAuthentication } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import SearchInput from "../constant/SearchInput";

const formatDateTime = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();
  const { authenticationState } = useAuthentication();
  const { roles } = authenticationState;
  const isAdmin = roles.includes("ROLE_SUPER_ADMIN");
  const { logout } = useAuthentication();
  const toast = useToast();

  const [currentDateTime, setCurrentDateTime] = useState(
    formatDateTime(new Date())
  );

  const handleLogout = () => {
    toast.open("Success sign out, Thankyou!", 'success')
    logout();
    navigate('/signin'); 
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(formatDateTime(new Date()));
    }, 60000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div
      className={`bg-white h-12 flex items-center dark:bg-gray-900 border-gray-200 rounded-md ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex items-center space-x-4 flex-1 relative dark:bg-gray-900">
        <SearchInput/>
        <div className="text-gray-600 dark:text-white text-sm">
          {currentDateTime}
        </div>
        <div className="flex flex-col justify-center ml-3">
          <input
            type="checkbox"
            id="light-switch"
            className="light-switch sr-only"
            onChange={toggleDarkMode}
          />
          <label
            htmlFor="light-switch"
            className="relative cursor-pointer p-2 flex items-center"
          >
            <svg
              className="dark:hidden"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-slate-300"
                d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
              />
              <path
                className="fill-slate-400"
                d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
              />
            </svg>
            <svg
              className="hidden dark:block"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-slate-400"
                d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
              />
              <path
                className="fill-slate-500"
                d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
              />
            </svg>
            <span className="sr-only">Switch to light / dark version</span>
          </label>
        </div>
      </div>
      <Menu as="div" className="ml-auto relative">
        <MenuButton className="inline-flex rounded-full focus:outline-none">
          <span className="sr-only">Open user menu</span>
          {authenticationState.isLoggedIn && (
            <h6 className="text-slate-900 dark:text-white font-normal mr-2 text-sm my-3">
              Hello, {authenticationState.user}
            </h6>
          )}
          <div className="h-10 w-10 rounded-full bg-cover bg-no-repeat bg-center mr-3 ">
            <img
              src={Avatar}
              alt="user"
              className="h-full w-full rounded-full"
            />
            <span className="sr-only">Username</span>
          </div>
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {!isAdmin && (
          <MenuItem>
            <button
              onClick={() => navigate("/profile")}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-200 transition-colors duration-150 ease-in-out"
            >
              <IconSettings className="size-4" />
              Profile
            </button>
          </MenuItem>
          )}
          <MenuItem>
            <button
              onClick={handleLogout}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-200 transition-colors duration-150 ease-in-out"
            >
              <IconLogout className="size-4" />
              Sign Out
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import defaultAvatar from "../../public/images/avatar-default.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthentication } from "../context/AuthContext";
import { useState, useEffect } from "react";
import {
  IconLogout,
  IconUserCircle,
  IconSettings,
  IconShoppingCart,
} from "@tabler/icons-react";
import logo from "../assets/logo.png";
import { useToast } from "../context/ToastContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { authenticationState, logout } = useAuthentication();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toast = useToast();
  const cart = useSelector((state) => state.cart.cart);
  const cartItemCount = useSelector((state) => state.cart.itemCount);
  const username = localStorage.getItem("user");
  const { roles } = authenticationState;
  

  const isAdmin = roles?.includes("ROLE_SUPER_ADMIN");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleMenuClick = () => {
    setSidebarOpen(false);
    navigate("/profile");
  };

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const getTotalQuantity = () => {
    let total = 0;
    // if (!Array.isArray(cart)) return 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleSignOut = () => {
    toast.open("Thankyou!", "success");
    logout();
    navigate("/signin");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleCart = () => {
    navigate("/checkout");
  };

  const navigation = authenticationState.isLoggedIn
    ? [
        { name: "Home", to: "/" },
        { name: "About Us", to: "/aboutus" },
        {
          name: username === "superadmin" ? "Dashboard Admin" : "Warehouse",
          to: username === "superadmin" ? "/dashboardadmin" : "/dashboarduser",
        },
        ...(username !== "superadmin"
          ? [{ name: "Shopping", to: "/vendorproduct" }]
          : []),
        { name: "Help", to: "/help" },
      ]
    : [
        { name: "Home", to: "/" },
        { name: "About Us", to: "/aboutus" },
        { name: "Features", to: "/features" },
        { name: "Help", to: "/help" },
      ];

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed w-full z-10 top-0">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-orange-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Save It"
                src={logo}
                className="h-10 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) =>
                  item.dropdown ? (
                    <Menu as="div" key={item.name} className="relative">
                      <div>
                        <MenuButton
                          className={classNames(
                            currentPath === item.to
                              ? "text-orange-600 font-bold"
                              : "text-white font-bold hover:text-orange-600",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </MenuButton>
                      </div>
                    </Menu>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={classNames(
                        currentPath === item.to
                          ? "text-orange-600 font-bold"
                          : "text-white font-bold hover:text-orange-600",
                        "rounded-md px-3 py-2 text-sm font-bold"
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {!authenticationState.isLoggedIn ? (
              <>
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="text-orange-600 bg-white  border border-orange-600 hover:bg-orange-600 hover:text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2 dark:border-orange-600 dark:text-orange-600 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-800"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={handleSignUp}
                  className="focus:outline-none text-white bg-orange-600 hover:bg-orange-700 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2 dark:focus:ring-orange-900"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                {!isAdmin && (
                  <div className="relative">
                    <button onClick={handleCart} className="text-white mr-2">
                      <IconShoppingCart size={30} />
                      {getTotalQuantity() > 0 && (
                        <span className="absolute -top-2 -left-1 bg-orange-500 text-white text-xs font-bold rounded-full px-2 py-1">
                          {getTotalQuantity()}
                        </span>
                      )}
                    </button>
                  </div>
                )}

                {/* Navigation Toggle */}
                <div className="py-16 text-center">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="focus:outline-none"
                  >
                    {isAdmin ? (
                      <img
                        className="w-10 h-10 rounded-full filter invert brightness-0"
                        src={defaultAvatar}
                        alt="Rounded avatar"
                      />
                    ) : (
                      <img
                        className="w-10 h-10 rounded-full"
                        src={user?.customerImage.url}
                        alt="Rounded avatar"
                      />
                    )}
                  </button>
                </div>
                {/* End Navigation Toggle */}

                {/* Sidebar */}
                <div
                  className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ease-out ${
                    sidebarOpen ? "opacity-100" : "opacity-0"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                  style={{ pointerEvents: sidebarOpen ? "auto" : "none" }}
                >
                  <div
                    className={`fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-lg z-20 transition-transform duration-300 ease-out transform ${
                      sidebarOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-4 flex justify-between items-center border-b text-white border-b-slate-700">
                      <h2 className="text-lg font-semibold">Profile</h2>
                      <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="text-white"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="p-4">
                      {authenticationState.isLoggedIn && (
                        <div className="flex items-center space-x-2 mb-4">
                          <IconUserCircle
                            size={24}
                            className="text-white ml-2"
                          />

                          <div>
                            <h3 className="font-bold text-white text-base">
                              {authenticationState.user}
                            </h3>
                            {/* <p className="text-sm text-gray-600">
                              user@gmail.com
                            </p> */}
                          </div>
                        </div>
                      )}
                        {!isAdmin && (
                      <div className="flex items-center mb-4 mt-10 text-white hover:bg-orange-500 p-2 rounded">
                          <>
                            <IconSettings size={24} className="mr-2" />
                            <Link
                              to="/profile"
                              onClick={handleMenuClick}
                              className="font-bold"
                            >
                              Edit Profile
                            </Link>
                          </>
                      </div>
                        )}
                      <div className="flex items-center mb-4 text-base text-red-600 hover:bg-orange-500 hover:text-white rounded">
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="flex items-center w-full p-2"
                        >
                          <IconLogout
                            size={24}
                            // strokeWidth={3}
                            className="mx-1"
                          />
                          <span className="font-bold">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  );
}

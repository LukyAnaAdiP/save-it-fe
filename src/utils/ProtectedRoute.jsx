import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthentication } from "../context/AuthContext";

const ProtectedRoute = ({
  element,
  userOnly = false,
  adminOnly = false,
  adminNoCheckoutAccess = false,
  noAdminAccess = false,
}) => {
  const { authenticationState } = useAuthentication();
  const { isLoggedIn, user, roles } = authenticationState;

  // console.log("Is logged in:", isLoggedIn);
  // console.log("User roles:", roles);

  // If not logged in and trying to access a protected route, redirect to login
  if (!isLoggedIn && (userOnly || adminOnly)) {
    return <Navigate to="/signin" />;
  }

  // If logged in and trying to access login page, redirect to home
  if (isLoggedIn && window.location.pathname === "/signin") {
    return <Navigate to="/" />;
  }

  // Check if user has ROLE_SUPER_ADMIN
  const isAdmin = roles && roles.includes("ROLE_SUPER_ADMIN");

  // If it's an admin-only route and user is not an admin, redirect to home
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  // If it's a user-only route and user is an admin, redirect to admin dashboard
  if (userOnly && isAdmin) {
    return <Navigate to="/dashboardadmin" />;
  }

  //if role is super admin, then can't access checkout page
  if (adminNoCheckoutAccess) {
    if (
      roles.includes("ROLE_SUPER_ADMIN") &&
      location.pathname === "/checkout"
    ) {
      return <Navigate to="/" />;
    }
  }
  //if role is super admin, then can't access shopping page
  if (noAdminAccess) {
    if (
      roles.includes("ROLE_SUPER_ADMIN") &&
      location.pathname === "/vendorproduct"
    ) {
      return <Navigate to="/" />;
    }
  }

  // If all checks pass, render the protected element
  return element;
};

export default ProtectedRoute;

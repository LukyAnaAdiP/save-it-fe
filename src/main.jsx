import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import { AuthenticationProvider } from "./context/AuthContext.jsx";
import SignUp from "./pages/SignUp.jsx";
import ToastProvider from "./components/toast/ToastProvider.jsx";
import DashboardUser from "./pages/warehouse/DashboardUser.jsx";
import ProductList from "./pages/warehouse/ProductList.jsx";
import ProductCard from "./pages/warehouse/ProductCard.jsx";
import TransactionHistoryList from "./components/warehouse/TransactionHistoryList.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import SignIn from "./pages/SignIn.jsx";
import Features from "./pages/Features.jsx";
import Help from "./pages/Help.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import VendorProduct from "./pages/vendor/VendorProduct.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Checkout from "./components/vendor/Checkout.jsx";
import EditProfile from "./components/warehouse/EditProfile.jsx";
import DashboardUserApp from "./DashboardUserApp.jsx";
import DashboardAdminApp from "./DashboardAdminApp.jsx";
import DashboardAdmin from "./pages/admin/DashboardAdmin.jsx";
import Vendor from "./pages/admin/Vendor.jsx";
import CustomerList from "./pages/admin/CustomerList.jsx";
import VendorList from "./pages/admin/VendorList.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/features",
        element: <Features />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/vendorproduct",
        element:<ProtectedRoute element={<VendorProduct />} noAdminAccess={true}/> ,
      },
      {
        path: "/profile",
        element: <EditProfile />,
      },
    ],
  },
  {
    path: "/signin",
    element: <ProtectedRoute element={<SignIn />} />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/checkout",
    element: <ProtectedRoute element={<Checkout />} adminNoCheckoutAccess= {true}/> ,
  },
  {
    path: "/dashboarduser",
    element: <ProtectedRoute element={<DashboardUserApp />} userOnly={true} />,
    children: [
      {
        path: "",
        element: <DashboardUser />,
      },
      {
        path: "transactionhistory",
        element: <TransactionHistoryList />,
      },
      {
        path: "product",
        element: <ProductCard />,
      },
      {
        path: "productlist",
        element: <ProductList />,
      },
    ],
  },
  {
    path: "/dashboardadmin",
    element: <ProtectedRoute element={<DashboardAdminApp />} adminOnly={true} />,
    children: [
      {
        path: "",
        element: <DashboardAdmin />,
      },
      {
        path: "vendor",
        element: <Vendor />,
      },
      {
        path: "vendorlist",
        element: <VendorList />,
      },
      {
        path: "customerlist",
        element: <CustomerList />,
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <SearchProvider>
          <ToastProvider>
            <AuthenticationProvider>
              <RouterProvider router={router} />
            </AuthenticationProvider>
          </ToastProvider>
        </SearchProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

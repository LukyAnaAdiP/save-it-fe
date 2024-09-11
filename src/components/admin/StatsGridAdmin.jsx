import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconBox } from "@tabler/icons-react";
import { fetchVendors } from "../../redux/features/vendor/vendorSlice";
import { fetchCustomers } from "../../redux/features/vendor/customerListSlice";


function StatsGridAdmin() {
  const dispatch = useDispatch();
  const vendors = useSelector((state) => state.vendor.vendors);
  const customers = useSelector((state) => state.customer.customers);

  useEffect(() => {
    dispatch(fetchVendors());
    dispatch(fetchCustomers());
  }, [dispatch]);

  return (
    <div className="flex gap-4 mt-3 w-full">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IconBox className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 dark:text-white font-light">
            Total Vendors
          </span>
          <div className="flex items-center">
            <strong className="text-lg text-gray-700 dark:text-white font-semibold">
              {vendors.length} Vendors
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IconBox className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 dark:text-white font-light">
            Total Customers
          </span>
          <div className="flex items-center">
            <strong className="text-lg text-gray-700 dark:text-white font-semibold">
              {customers.length} users
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}

export default StatsGridAdmin;
import React from "react";
import { IconBox } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchWarehouseProducts } from "../../redux/features/customer/customerSlice";
import WaitingAnimation from "../../constant/WaitingAnimation";

export default function DashboardStatsGrid() {
  const dispatch = useDispatch();
  const { warehouseProducts, status, error } = useSelector((state) => state.customerWarehouse);

  useEffect(() => {
    dispatch(fetchWarehouseProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <WaitingAnimation/>;
  }

  if (status === "failed") {
    return <div>Error: {error.message || JSON.stringify(error)}</div>;
  }

  // Calculate stats
  const totalProducts = warehouseProducts.reduce((total, product) => total + product.goods?.length, 0);
  const uniqueCategories = new Set(warehouseProducts.flatMap(product => product.goods?.map(item => item.goodsCategoryName)));
  const totalCategories = uniqueCategories.size;
  const uniqueVendors = new Set(warehouseProducts.flatMap(product =>
    product.goods?.map(item => (
      item.vendorDetails && item.vendorDetails.vendorName
    ) ? item.vendorDetails.vendorName : "Others")));
  const totalVendors = uniqueVendors.size;

  return (
    <div className="flex gap-4 mt-3 w-full">

      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IconBox className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 dark:text-white font-light">
            Total Product
          </span>
          <div className="flex items-center">
            <strong className="text-lg text-gray-700 dark:text-white font-semibold">
              {totalProducts}
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
            Total Category
          </span>
          <div className="flex items-center">
            <strong className="text-lg text-gray-700 dark:text-white font-semibold">
              {totalCategories}
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
            Total Vendor
          </span>
          <div className="flex items-center">
            <strong className="text-lg text-gray-700  dark:text-white font-semibold">
              {totalVendors}
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

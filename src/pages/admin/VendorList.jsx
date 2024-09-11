import { format } from "date-fns";
import React from "react";
import { getOrderStatus } from "../../utils/GetOrderStatus";
import { useSearch } from "../../context/SearchContext";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchVendors } from "../../redux/features/vendor/vendorSlice";

// Masih error dari backend
function VendorList() {
  const dispatch = useDispatch();
  const vendors = useSelector((state) => state.vendor.vendors);
  const vendorStatus = useSelector((state) => state.vendor.status);
  const error = useSelector((state) => state.vendor.error);
  const { searchTerm } = useSearch();

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  const filteredVendor = vendors?.filter(
    (vendor) =>
      vendor.vendorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.vendorAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.vendorEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.vendorPhone?.includes(searchTerm)
  );

  return (
    <div className="bg-white dark:bg-gray-800 px-4 pt-3 pb-4 mt-7 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-800 dark:text-white font-medium text-xl">
        Vendor List
      </strong>
      {vendorStatus === "loading" && <p>Loading...</p>}
      {vendorStatus === "failed" && <p>Error: {error}</p>}
      {vendorStatus === "succeeded" && (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-gray-800 border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr className="font-semibold border-b text-center text-blue-900 border-gray-200 dark:text-white">
                <th className="px-4 py-2">Vendor Name</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone Number</th>
                {/* <th className="px-4 py-2">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredVendor?.map((vendor) => (
                <tr
                  key={vendor.id}
                  className="border-b text-center dark:text-white border-gray-200 hover:bg-gray-50 dark:hover:bg-slate-400"
                >
                  <td className="px-4 py-2">{vendor.vendorName}</td>
                  <td className="px-4 py-2">{vendor.vendorAddress}</td>
                  <td className="px-4 py-2">{vendor.vendorEmail}</td>
                  <td className="px-4 py-2">{vendor.vendorPhone}</td>
                  {/* <td className="px-4 py-2">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 mr-2"
                      onClick={() => dispatch(updateVendor(vendor))} // Placeholder for update functionality
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      onClick={() => dispatch(deleteVendor(vendor.id))}
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default VendorList;

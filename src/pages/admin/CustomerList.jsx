import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../redux/features/vendor/customerListSlice";

function CustomerList() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.customers);
  const status = useSelector((state) => state.customer.status);
  const error = useSelector((state) => state.customer.error);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  return (
    <div className="p-6 mt-7 rounded-sm border border-gray-200 flex-1">
      <h1 className="text-gray-800 font-medium text-2xl">Customer List</h1>
      {status === "succeeded" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-800 border-collapse">
            <thead className="bg-gray-100">
              <tr className="font-semibold border-b text-center text-blue-900 border-gray-200">
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Fullname</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Total Items</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.customerDetails.username}
                  className="border-b text-center border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{customer.customerDetails.username}</td>
                  <td className="px-4 py-2">{customer.customerDetails.fullNameCustomer}</td>
                  <td className="px-4 py-2">{customer.customerDetails.phoneCustomer}</td>
                  <td className="px-4 py-2">{customer.customerDetails.addressCustomer}</td>
                  <td className="px-4 py-2">{customer.customerDetails.emailCustomer}</td>
                  <td className="px-4 py-2">{customer.totalItem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CustomerList;

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { IconDownload, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionHistory } from "../../redux/features/customer/customerSlice";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DownloadList from "./DownloadList";

function TransactionHistoryList() {
  const dispatch = useDispatch();
  const { transactionHistory, status, error } = useSelector((state) => state.customerWarehouse);
  const [expandedRows, setExpandedRows] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [snapToken, setSnapToken] = useState("");
  const [currentTransactionId, setCurrentTransactionId] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(fetchTransactionHistory());
  }, [dispatch]);

  const toggleRowExpansion = (transactionId) => {
    setExpandedRows(prev => ({
      ...prev,
      [transactionId]: !prev[transactionId]
    }));
  };

  const handlePayNow = (transactionId, token) => {
    setCurrentTransactionId(transactionId);
    setSnapToken(token);
    setShowPopup(true);
  };

  function generateReportId(transactionId) {
    // Create a hash of the transaction ID
    let hash = 0;
    for (let i = 0; i < transactionId.length; i++) {
      const char = transactionId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    // Convert the hash to a positive number and then to base 36 (numbers + letters)
    const positiveHash = Math.abs(hash);
    const reportId = positiveHash.toString(36).toUpperCase();

    // Pad with zeros if necessary to ensure a minimum length
    return reportId.padStart(8, '0');
  }

  const processPayment = () => {
    if (window.snap) {
      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          console.log('success');
          console.log(result);
          Swal.fire({
            title: "Payment Successful",
            text: "Your payment has been processed successfully.",
            icon: "success",
          });
          setShowPopup(false);
          dispatch(fetchTransactionHistory());
        },
        onPending: function (result) {
          console.log('pending');
          console.log(result);
          Swal.fire({
            title: "Payment Pending",
            text: "Your payment is being processed.",
            icon: "info",
          });
        },
        onError: function (result) {
          console.log('error');
          console.log(result);
          Swal.fire({
            title: "Payment Failed",
            text: "There was an error processing your payment.",
            icon: "error",
          });
        },
        onClose: function () {
          console.log('customer closed the popup without finishing the payment');
          Swal.fire({
            title: "Payment Cancelled",
            text: "You closed the payment window without completing the transaction.",
            icon: "warning",
          });

        }
      });
    } else {
      console.error('Snap.js is not loaded');
      Swal.fire({
        title: "Error",
        text: "Payment system is not available. Please try again later.",
        icon: "error",
      });
    }
  };

  const getFullData = (transactions) => {
    return transactions.flatMap(transaction => {
      const baseData = {
        transactionDate: `${transaction.transactionDate} ${transaction.transactionTime}`,
        transactionId: generateReportId(transaction.transactionId),
        totalPrice: transaction.totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
        paymentStatus: transaction.paymentStatus.toUpperCase(),
        customerEmail: transaction.customerEmail
      };

      if (expandedRows[transaction?.transactionId]) {
        return transaction.items.map(item => ({
          ...baseData,
          productName: item.productDetails?.name || '',
          category: item.productDetails?.category || '',
          vendorName: item.vendorDetails?.vendorName || '',
          quantity: item.quantity || '',
          price: item.price?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) || '',
          totalPricePerItem: item.totalPricePerItem?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) || '',
        }));
      }

      return [baseData];
    });
  };

  const handleDownload = (format) => {
    if (!transactionHistory) return;

    const fullData = getFullData(transactionHistory);
    if (format === 'pdf') {
      downloadPDF(fullData);
    } else if (format === 'excel') {
      downloadExcel(fullData);
    }
    setShowMenu(false);
  };

  const downloadPDF = (data) => {
    const doc = new jsPDF('l', 'mm', 'a4');
    const title = "TRANSACTION HISTORY"
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    
    // Center the title
    const x = (pageWidth - textWidth) / 2;
    const y = 16; // Y position for the title
    
    doc.text(title, x, y);
    const tableStartY = 30;

    const columns = [
      { title: "Date & Time", dataKey: "transactionDate" },
      { title: "Transaction ID", dataKey: "transactionId" },
      { title: "Total Price", dataKey: "totalPrice" },
      { title: "Status", dataKey: "paymentStatus" },
      { title: "Customer Email", dataKey: "customerEmail" },
      // { title: "Product Name", dataKey: "productName" },
      // { title: "Category", dataKey: "category" },
      // { title: "Vendor Name", dataKey: "vendorName" },
      // { title: "Quantity", dataKey: "quantity" },
      // { title: "Price", dataKey: "price" },
      // { title: "Total Price per Item", dataKey: "totalPricePerItem" },
    ];

    const tableColumn = [columns.map(col => col.title)];
    const tableRows = data.map(item => columns.map(col => item[col.dataKey] || ''));

    doc.autoTable({
      startY: tableStartY,
      head: tableColumn,
      body: tableRows,
      theme: 'grid'
    });

    doc.save('transactions.pdf');
  };


  const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');

    XLSX.writeFile(workbook, 'transactions.xlsx');
  };


  return (
    <div className="bg-white dark:bg-gray-800 px-4 pt-3 pb-4 mt-7 rounded-sm border border-gray-200 flex-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Transaction History
        </h2>
        <div className="relative inline-block text-left">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download
        <IconDownload className="ml-2 mb-1" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
          <button
            onClick={() => handleDownload('pdf')}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Download PDF
          </button>
          <button
            onClick={() => handleDownload('excel')}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Download Excel
          </button>
        </div>
      )}
    </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Date & Time</th>
              <th scope="col" className="px-6 py-3">Transaction ID</th>
              <th scope="col" className="px-6 py-3">Total Price</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactionHistory && transactionHistory.map((transaction) => (
              <React.Fragment key={transaction.transactionId}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">
                    {transaction.transactionDate}
                  </td>
                  <td className="px-6 py-4">{generateReportId(transaction.transactionId)}</td>
                  <td className="px-6 py-4">{transaction.totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${transaction.paymentStatus === 'settlement'
                      ? 'bg-green-100 text-green-800 border border-green-800'
                      : transaction.paymentStatus === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-800'
                        : 'bg-red-100 text-red-800 border border-red-800'
                      }`}>
                      {transaction.paymentStatus === 'settlement' && (
                        <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                      )}
                      {transaction.paymentStatus === 'pending' && (
                        <svg className="w-4 h-4 inline mr-1 animate-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z M8 16l4-4 4 4M8 8l4 4 4-4" />
                        </svg>
                      )}
                      {transaction.paymentStatus !== 'settlement' && transaction.paymentStatus !== 'pending' && (
                        <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                        </svg>
                      )}
                      {transaction.paymentStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleRowExpansion(transaction.transactionId)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {expandedRows[transaction.transactionId] ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
                    </button>
                  </td>
                </tr>
                {expandedRows[transaction.transactionId] && (
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <td colSpan="5" className="px-6 py-4">
                      <div className="space-y-2">
                        {transaction.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{item.productDetails.name}</p>
                              <p className="text-sm text-gray-500">{item.productDetails.category}</p>
                              <p className="text-sm">Vendor: {item.vendorDetails.vendorName}</p>
                            </div>
                            <div className="text-right">
                              <p>Quantity: {item.quantity}</p>
                              <p>Price: {item.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                              <p>Total: {item.totalPricePerItem.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                            </div>
                          </div>
                        ))}
                        <div className="mt-4">
                          <p>Total Quantity: {transaction.totalQuantity}</p>
                          <p>Total Price: {transaction.totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                          {transaction.paymentStatus !== 'settlement' && (
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePayNow(transaction.transactionId, transaction.paymentToken);
                              }}
                              className="inline-block mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                            >
                              Pay Now
                            </a>
                          )}
                          {showPopup && (
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                                <div className="mt-3 text-center">
                                  <h3 className="text-lg leading-6 font-medium text-gray-900">Confirm Payment</h3>
                                  <div className="mt-2 px-7 py-3">
                                    <p className="text-sm text-gray-500">
                                      Are you ready to complete your payment?
                                    </p>
                                  </div>
                                  <div className="items-center px-4 py-3">
                                    <button
                                      onClick={processPayment}
                                      className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 mb-2"
                                    >
                                      Pay Now
                                    </button>
                                    <button
                                      onClick={() => setShowPopup(false)}
                                      className="px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default TransactionHistoryList;
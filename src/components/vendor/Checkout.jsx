import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { IconTrash, IconChevronsLeft } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../redux/cartSlice";
import { transactionProcurements } from "../../redux/procurementSlice";
import { useAuthentication } from "../../context/AuthContext";
import { formatIDR } from "../../utils/formatIDR";

function Checkout() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const { authenticationState } = useAuthentication();
  const [showPopup, setShowPopup] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [snapToken, setSnapToken] = useState("");

  // const username = authenticationState.user;

  const handleDecrease = async (id) => {
    const item = cart.find((item) => item.vendorProductId === id);
    if (!item) {
      console.error(`Item with id ${id} not found in cart`);
      return;
    }
    if (item.quantity === 1) {
      // Tampilkan konfirmasi SweetAlert2
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Hapus item dan tampilkan pesan sukses
          dispatch(removeItem(id));
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
          });
        }
      });
    } else {
      // Kurangi jumlah barang jika lebih dari 1
      dispatch(decrementQuantity(id));
    }
  };

  const handleIncrease = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleRemove = (id) => {
    Swal.fire({
      title: "Confirmation",
      text: "Are you sure to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your item has been deleted.",
          icon: "success",
        });
        dispatch(removeItem(id));
      }
    });
  };

  const formatToIDR = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const calculateSubtotal = () => {
    return formatToIDR(cart.reduce((total, item) => total + item.price * item.quantity, 0));
  };


  const calculateTotal = () => {
    return formatToIDR(cart.reduce((total, item) => total + item.price * item.quantity, 0));
  };

  const handlePlaceOrder = () => {
    const transactionDetail = cart.map((item) => ({
      vendorProductId: item.vendorProductId,
      quantity: item.quantity,
    }));
    dispatch(transactionProcurements({ transactionDetail }))
      .then((response) => {
        const paymentResponse = response.payload?.paymentResponse;
        const url = paymentResponse?.redirectUrl;
        const token = paymentResponse?.token;

        if (token) {
          setSnapToken(token);
          setShowPopup(true);
        } else {
          Swal.fire({
            title: "Transaction Failed",
            text: "Unable to retrieve payment token. Please try again.",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Transaction Failed",
          text: `Error: ${error.message}`,
          icon: "error",
        });
      });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Swal.fire({
        title: "Empty Cart",
        text: "Your cart is empty",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Confirmation",
        text: "Are you sure to checkout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          handlePlaceOrder();
          dispatch(clearCart());
        }
      })
    }
  };

  const handlePayNow = () => {
    if (window.snap) {
      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          console.log('success');
          console.log(result);
          // Handle successful payment
          Swal.fire({
            title: "Payment Successful",
            text: "Your payment has been processed successfully.",
            icon: "success",
          });
          setShowPopup(false);
        },
        onPending: function (result) {
          console.log('pending');
          console.log(result);
          // Handle pending payment
          Swal.fire({
            title: "Payment Pending",
            text: "Your payment is being processed.",
            icon: "info",
          });
        },
        onError: function (result) {
          console.log('error');
          console.log(result);
          // Handle payment error
          Swal.fire({
            title: "Payment Failed",
            text: "There was an error processing your payment.",
            icon: "error",
          });
        },
        onClose: function () {
          console.log('customer closed the popup without finishing the payment');
          // Handle popup closure
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

  const handlePayLater = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="flex text-gray-900 hover:text-gray-600">
          <IconChevronsLeft size={30} />
          <Link to="/vendorproduct" className="text-xl font-bold ">
            Back to shopping
          </Link>
        </div>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <Link
                  to="/vendorproduct"
                  className="font-semibold text-gray-900 hover:text-orange-600"
                >
                  Shop
                </Link>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-white ring ring-orange-500 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Checkout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a payment method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-10">
            {cart.map((item) => (
              <div
                key={item.vendorProductId}
                className="flex flex-col rounded-lg bg-white sm:flex-row"
              >
                <div className="m-2 h-24 w-28">
                  <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={item.productImage.url}
                    alt={item.productImage}
                  />
                </div>

                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{item.productName}</span>
                  <span className="float-right text-gray-400">
                    {item.productCategory}
                  </span>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold">
                      {formatToIDR(item.price)}
                    </p>

                    <div className="flex items-center ">
                      <button
                        onClick={() => handleDecrease(item.vendorProductId)}
                        className="px-2 bg-gray-200 rounded-md text-gray-700"
                      >
                        -
                      </button>

                      <span className="mx-2">{item.quantity}</span>

                      <button
                        onClick={() => handleIncrease(item.vendorProductId)}
                        className="px-2 bg-gray-200 rounded-md text-gray-700"
                      >
                        +
                      </button>

                      <button
                        onClick={() => handleRemove(item.vendorProductId)}
                        className="ml-4 px-1 border border-red-600 text-red-600 rounded-md flex hover:bg-red-600 hover:text-white"
                      >
                        <IconTrash />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="py-24">
          <div className="mt-8 bg-gray-50 px-4 pt-8 lg:mt-5">
            <p className="text-xl font-medium">Shopping summary</p>
            <p className="text-gray-400">
              Complete your order by providing your payment details.
            </p>
            <div className="mt-6 ">
              <div className="border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">
                    {calculateSubtotal()}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {calculateTotal()}
                </p>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">Order Placed Successfully!</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Your order has been placed. Would you like to pay now or later?
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={handlePayNow}
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 mb-2"
                >
                  Pay Now
                </button>
                <button
                  onClick={handlePayLater}
                  className="px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Pay Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default Checkout;

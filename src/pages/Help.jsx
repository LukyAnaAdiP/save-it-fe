import React from "react";
import helpImage from "../../public/images/contactus.svg";
import { useAuthentication } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useState } from "react";
import { useEffect } from "react";

const Help = () => {
  const { authenticationState } = useAuthentication();
  const {roles} = authenticationState
  const isAdmin = roles?.includes('ROLE_SUPER_ADMIN')

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateForm();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };


  const handleSave = (e) => {
    e.preventDefault()
    validateForm(); 

    if (!isAdmin) {
    if (isFormValid) {
      Swal.fire({
        title: 'Message sent successfully!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        // Reset form data
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out all required fields.',
        icon: 'error',
        timer: 3000,
        showConfirmButton: false,
      });
    }
  } else {
    Swal.fire({
      title: 'Not Allowed!',
      text: 'You cannot send messages as a super admin.',
      icon: 'error',
      timer: 3000,
      showConfirmButton: false,
    });
  }
};

  return (
    <>
      {/* <BackgroundAnimation /> */}
      <div className="p-2 my-11 md:p-8 lg:p-12 max-w-6xl mx-auto">
        {/* <div className="bg-gray-100 p-6 md:p-8 lg:p-12 rounded-lg shadow-lg"> */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="md:w-1/2">
            <img
              src={helpImage}
              alt="Help Illustration"
              className="w-auot h-96 rounded-lg"
            />
            <h3 className="text-2xl font-semibold text-orange-600 mt-4">
              How can we help?
            </h3>
            <ul className="list-disc text-xl list-inside text-gray-700">
              <li className="mb-2 mt-2">Find Solutions Quickly</li>
              <li className="mb-2">Get Personalized Support</li>
              <li className="mb-2">Access Helpful Resources</li>
            </ul>
          </div>
          <div className="md:w-1/2 flex flex-col">
            <div className="mt-5">
              <div className="text-left mb-2">
                {!authenticationState.isLoggedIn ? (
                  <h2 className="text-xl md:text-4xl font-semibold text-orange-600">
                    Have questions? <br /> Shoot us an email
                  </h2>
                ) : (
                  <h2 className="text-xl md:text-4xl font-semibold text-gray-600">
                    Request Demo? <br /> Shoot us an email
                  </h2>
                )}
                <p className="text-gray-700 mt-4">
                  How can we assist you today?
                </p>
              </div>
            </div>
            <div className="bg-transparent p-6 mb-10 rounded-lg shadow-lg">
              <form>
                <div className="relative mb-9">
                  <input
                    type="text"
                    id="floating_outlined"
                    name="name"
                    value={formData.name}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-orange-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                  <label
                    htmlFor="name"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-9 peer-focus:-translate-y-9 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Your Name
                    <span className="text-red-500"> *</span>
                  </label>
                </div>
                <div className="relative mb-9">
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    id="floating_outlined"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-orange-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                  <label
                    htmlFor="floating_outlined"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-9 peer-focus:-translate-y-9  scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Your Email
                    <span className="text-red-500"> *</span>
                  </label>
                </div>
                <div className="relative">
                  <textarea
                    type="text"
                    id="floating_outlined"
                    name="message"
                    value={formData.message}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-orange-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                    onChange={handleChange}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm">{errors.message}</p>
                  )}
                  <label
                    htmlFor="floating_outlined"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-9 peer-focus:-translate-y-9 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Your Message
                    <span className="text-red-500"> *</span>
                  </label>
                </div>
                <div className="flex justify-center">
                  <button
                  type="submit"
                    onClick={handleSave}
                    disabled= {isAdmin}
                    className={`bg-orange-600 text-xl text-white font-semibold py-2 px-10 rounded-md mt-4 hover:bg-orange-700 ${isAdmin ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                   {isAdmin? 'You cannot send' : 'Send'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Help;

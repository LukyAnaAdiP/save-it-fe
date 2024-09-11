import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserByUsername,
  updateUserProfile,
} from "../../redux/features/user/userSlice";
import defaultAvatar from "../../../public/images/avatar-default.svg";
import Swal from "sweetalert2";
import { useAuthentication } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const EditProfile = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const { authenticationState } = useAuthentication();
  const { roles } = authenticationState;
  const isAdmin = roles.includes("ROLE_SUPER_ADMIN");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    contactNumber: "",
    image: null,
  });

  useEffect(() => {
    dispatch(fetchUserByUsername());
  }, [dispatch]);

  const handleEditClick = () => {
    setFormData({
      fullName: user.fullNameCustomer,
      email: user.emailCustomer,
      address: user.addressCustomer,
      contactNumber: user.phoneCustomer,
      image: null,
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("phone", formData.contactNumber);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    dispatch(updateUserProfile(formDataToSend))
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your profile has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsEditing(false);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-400 py-12 ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden mt-8">
          <div className="md:flex">
            <div
              className={`md:w-1/2 p-8 ${isEditing ? "hidden md:block" : ""}`}
            >
              <div className="text-center">
                <img
                  src={user?.customerImage?.url}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full border-4 border-orange-300 shadow-lg mx-auto mb-4"
                />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome Back, {user?.fullNameCustomer}!
                </h1>
                <p className="text-gray-600 mb-6">
                  We're glad to see you again! You can update your profile
                  information here.
                </p>
              </div>

              <div className="space-y-3 text-center">
                <p className="text-lg font-semibold text-gray-700">
                  {user?.fullNameCustomer}
                </p>
                <p className="text-gray-600">{user?.emailCustomer}</p>
                <p className="text-gray-600">{user?.addressCustomer}</p>
                <p className="text-gray-600">{user?.phoneCustomer}</p>
              </div>

              {!isEditing && (
                <button
                  onClick={handleEditClick}
                  className="mt-8 w-full px-6 py-3 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing && (
              <div className="md:w-1/2 p-8 bg-orange-50">
                <h2 className="text-2xl text-gray-800 font-bold mb-6">
                  Edit Your Profile
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.files[0] })
                      }
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-8 space-x-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full shadow-md hover:bg-gray-300 transition duration-300 ease-in-out"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="px-6 py-2 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 0115.65-2.207l1.15-1.15a10 10 0 00-18.95 0l1.15 1.15A8 8 0 014 12z"
                          />
                        </svg>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

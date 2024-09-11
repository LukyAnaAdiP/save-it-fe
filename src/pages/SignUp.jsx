import React, { useState } from "react";
import SignUpPicture from "../../public/images/signup.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import {
  IconRosetteDiscountCheckFilled,
  IconArrowLeft,
  IconEyeOff,
  IconEye,
} from "@tabler/icons-react";
import { useAuthentication } from "../context/AuthContext";

export default function SignUp() {
  const { register } = useAuthentication();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setError((prevErrors) => ({ ...prevErrors, isChecked: "" }));
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!validatePassword(password)) {
      newErrors.password =
        "Password must contain at least 8 characters, including letters, numbers, and symbols";
    }

    if (password !== confirmPassword) {
      newErrors.password = "Passwords do not match";
    }
    if (!isChecked) {
      newErrors.isChecked = "Checked is required!";
    }
    if (!username) {
      newErrors.username = "Username is required!";
    }
    if (!email) {
      newErrors.email = "Email is required!";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await register(username, email, password);
        toast.open("Sign up is Success!", "success");
        navigate("/signin");
        console.log("Logging in with username:", username);
      } catch (error) {
        toast.open("Sign up is Failed!\nPlease try again", "error");
        throw error;
      }
    }
  };

  return (
    <>
      <button
        onClick={() => navigate("/")}
        type="button"
        className="flex items-center px-5 py-2 text-sm text-orange-500"
      >
        <IconArrowLeft color="orange" size={25} strokeWidth={4} />
        <span className="font-bold text-xl">Back to Home</span>
      </button>
      <section className="bg-gray-100 max-h-screen flex box-border justify-center items-center overflow-hidden">
        <div className="bg-[#dddcda] rounded-2xl flex max-w-3xl mt-10 items-center">
          <div className="md:block hidden w-full">
            <img
              className="rounded-2xl w-[600px]"
              src={SignUpPicture}
              alt="signup form image"
            />
          </div>
          <div className="md:w-1/2 px-8">
            <h2 className="text-xl text-center mt-3 text-black">
              Welcome to
              <span className="text-[#FF4F04] ml-1">Save It!</span>
            </h2>

            <div className="text-center text-gray-100">
              <p className="mt-2 text-xs text-gray-800">
                Already Sign Up?
                <span className="ml-2 text-sm font-bold text-orange-600 hover:underline cursor-pointer">
                  <Link to="/signin">Sign In</Link>
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative mt-6 mb-2">
                <input
                  id="username"
                  className={`peer p-2 rounded-xl w-full border text-sm border-orange-500 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-orange-500 ${error.username ? "error-shake border-red-500" : ""
                    }`}
                  type="text"
                  name="username"
                  placeholder=" "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label
                  htmlFor="username"
                  className={`absolute text-base text-gray-500 duration-300 transform -translate-y-7 peer-focus:-translate-y-7 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-orange-500 peer-placeholder-shown:scale-200 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${username ? "scale-75 -translate-y-4 text-orange-500" : ""
                    }`}
                >
                  Enter Username
                </label>
                {error.username && (
                  <div className="text-red-600 text-sm mt-1">
                    {error.username}
                  </div>
                )}
              </div>

              <div className="relative mb-2">
                <div className="mt-0">
                  <input
                    className={`peer p-2 rounded-xl w-full border text-sm border-orange-500 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-orange-500 ${error.email ? "error-shake border-red-500" : ""
                      }`}
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="email"
                    className={`absolute text-base text-gray-500 duration-300 transform -translate-y-7 peer-focus:-translate-y-7 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-orange-500 peer-placeholder-shown:scale-200 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${email ? "scale-75 -translate-y-4 text-orange-500" : ""
                      }`}
                  >
                    Enter Email
                  </label>
                  {error.email && (
                    <div className="text-red-600 text-sm">{error.email}</div>
                  )}
                </div>
              </div>
              <div className="relative mb-2">
                <div className="mt-0">
                  <input
                    className={`peer p-2 rounded-xl w-full border text-sm border-orange-500 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-orange-500 ${error.password ? "error-shake border-red-500" : ""
                      }`}
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label
                    htmlFor="password"
                    className={`absolute text-base text-gray-500 duration-300 transform -translate-y-7 peer-focus:-translate-y-7 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-orange-500 peer-placeholder-shown:scale-200 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${password ? "scale-75 -translate-y-4 text-orange-500" : ""
                      }`}
                  >
                    Enter Password
                  </label>
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-2 transform cursor-pointer"
                  >
                    {passwordVisible ? (
                      <IconEye color="grey" />
                    ) : (
                      <IconEyeOff color="grey" />
                    )}
                  </span>
                  {error.password && (
                    <div className=" text-red-600 text-sm">
                      {error.password}
                    </div>
                  )}
                </div>
              </div>

              <div className="relative w-full max-w-md">
                <div className="mt-0">
                  <input
                    className={`peer p-2 rounded-xl w-full border text-sm border-orange-500 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-orange-500 ${error.password || error.confirmPassword
                      ? "border-red-500 error-shake"
                      : ""
                      }`}
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Your Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <label
                    htmlFor="confirmPassword"
                    className={`absolute text-base text-gray-500 duration-300 transform -translate-y-7 peer-focus:-translate-y-7 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-orange-500 peer-placeholder-shown:scale-200 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${confirmPassword ? "scale-75 -translate-y-4 text-orange-500" : ""
                      }`}
                  >
                    Confirm Password
                  </label>
                  <span
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-2 transform cursor-pointer"
                  >
                    {confirmPasswordVisible ? (
                      <IconEye color="grey" />
                    ) : (
                      <IconEyeOff color="grey" />
                    )}
                  </span>
                </div>
              </div>
              <div
                className={`flex items-center ${error.isChecked ? "error-shake" : ""
                  }`}
              >
                <input
                  id="default-checkbox"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className={`w-4 h-4 text-orange-600 bg-white border-orange-500 rounded focus:ring-orange-500 focus:ring-2 ${error.isChecked ? "error-shake" : ""
                    }`}
                />
                <label
                  htmlFor="default-checkbox"
                  className={`ml-2 text-xs font-bold text-orange-600 ${error.isChecked ? "error-shake" : ""
                    }`}
                >
                  I agree to the Save It terms
                </label>
              </div>
              {/* {error.isChecked && <div className="text-red-600 text-sm">{error.isChecked}</div>} */}
              <button
                className=" bg-[#FF4F04] text-white py-2 rounded-xl hover:scale-105 duration-300 font-medium"
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

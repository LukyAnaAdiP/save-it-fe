import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../context/AuthContext";
import LoginPicture from "../../public/images/login.svg";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import {
  IconRosetteDiscountCheckFilled,
  IconArrowLeft,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import LoadingAnimation from "../constant/LoadingAnimation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthentication();
  const toast = useToast();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(username, password);
      toast.open("Sign in is Success!", "success");
      if (username === "superadmin") {
        // setIsLoading(true);
        navigate("/dashboardadmin");
      } else {
        // setIsLoading(true);
        navigate("/");
      }
      // navigate("/");
    } catch (error) {
      toast.open("Username or password is wrong", "error");
      setError(error.message);
      setIsLoading(false);
    }
  };

  // if (isLoading) {
  //   return <LoadingAnimation />;
  // }

  return (
    <>
      <button
        onClick={() => navigate("/")}
        type="button"
        className=" flex items-center px-5 py-2 text-sm text-orange-500 "
      >
        <IconArrowLeft color="orange" size={25} strokeWidth={4}></IconArrowLeft>
        <span className="font-bold text-xl">Back to Home</span>
      </button>
      <section className="bg-gray-100 max-h-screen flex box-border justify-center items-center overflow-hidden">
        <div className="bg-[#dddcda] rounded-2xl mt-5 flex max-w-3xl p-5 items-center">
          <div className="md:block hidden w-full">
            <img
              className="rounded-2xl w-[600px]"
              src={LoginPicture}
              alt="login form image"
            />
          </div>

          <div className="md:w-1/2 px-8">
            <h2 className="relative top-0 left-[150px] font-bold text-xl text-[#FF4F04]">
              Save It
            </h2>
            <h2 className="text-xl mt-4 font-bold text-[#FF4F04]">Hello,</h2>
            <h2 className="text-2xl font-bold text-[#FF4F04]">Welcome Back!</h2>

            <form
              onSubmit={handleSubmit}
              action=""
              className="flex flex-col gap-4 "
            >
              <div className="w-full max-w-sm mx-auto">
                <div className="relative mt-8">
                  <input
                    className="p-2 rounded-xl border border-orange-500 w-full text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-2 top-2 px-1 text-orange-500 transition-all transform origin-left scale-75 -translate-y-8 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-orange-500 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:px-1 peer-focus:text-orange-500"
                  >
                    Username
                  </label>
                </div>

                <div className="relative mt-8">
                  <input
                    className="p-2 rounded-xl border w-full border-orange-500 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-2 top-2.5 px-1 text-orange-500 transition-all transform origin-left scale-75 -translate-y-8 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-orange-500 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:px-1 peer-focus:text-orange-500"
                  >
                    Password
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
                </div>
              </div>
              <button
                className="bg-[#FF4F04] text-white py-2 rounded-xl hover:scale-105 duration-300 hover: font-medium"
                type="submit"
              >
                Sign In
              </button>
            </form>
            <div className="mt-6  items-center text-gray-100">
              <p className=" text-sm text-black">
                Don’t have account?
                <span className="ml-2 text-sm font-bold text-orange-600 hover:underline cursor-pointer">
                  <Link to="/signup">Sign Up</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

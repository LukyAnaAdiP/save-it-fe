import React from "react";
import LandingPage from "../../public/images/landingpage2.svg";
import homeAnimation from "../../public/animations/HomeAnimation.json";
import { useNavigate } from "react-router-dom";
import Typewriter from "../components/typinganimation/TypeWriter";
import { useAuthentication } from "../context/AuthContext";
import Lottie from "lottie-react";
import galery1 from "../../public/images/g1.jpg";
import galery2 from "../../public/images/g2.jpeg";
import galery3 from "../../public/images/g3.jpeg";
import galery4 from "../../public/images/g4.jpeg";
import galery5 from "../../public/images/g5.jpeg";
import galery6 from "../../public/images/g6.jpeg";
import galery7 from "../../public/images/g7.jpeg";
import galery8 from "../../public/images/g8.jpeg";

export default function Home() {
  const { authenticationState, logout } = useAuthentication();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/features");
  };
  return (
    <>
      <section className=" overflow-x-hidden">
        <div className="grid grid-rows-2 grid-flow-col my-20">
          <div className="row-span-3 ml-10">
            <div className="font-bold text-6xl text-gray-600 -orange-600 mt-20">
              <h1>Save Your Goods</h1>
            </div>
            <div className="font-bold text-6xl text-gray-600 mb-5">
              <h1>
                Storage
                <Typewriter text=" Here." delay={400} infinite />
              </h1>
            </div>
            <div className="text-xl">
              <p className="text-justify inline">
                Revolutionize your warehouse management with our innovative
                solution. Streamline inventory tracking, automate order
                processing, and boost efficiency—all from one user-friendly
                platform. Experience seamless integration and real-time
                insights. <br />
                Transform your warehouse operations today with
              </p>
              <p className="text-orange-600 inline mx-1 text-2xl font-semibold text-justify">
                Save It!
              </p>
              <div className="flex justify-center items-center">
                {!authenticationState.isLoggedIn && (
                  <button
                    onClick={handleClick}
                    className="mt-10 py-2 px-3 text-white bg-orange-600 hover:bg-orange-700 focus:ring-orange-300 font-medium text-xl rounded-lg me-2 mb-2 dark:focus:ring-orange-900"
                  >
                    Learn more
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="row-span-2 col-span-2">
            {/* <img src={LandingPage}  className="w-[850px] h-[500px]" /> */}
            <Lottie
              animationData={homeAnimation}
              loop={true}
              style={{ height: "600px" }}
            />
          </div>
        </div>
      </section>
      <section className="">
        <div className="relative text-gray-600 text-center">
          <h1 className="text-6xl font-bold">OUR GALERY</h1>
        </div>
        <div className="px-72">
          <p className="flex justify-center text-center mt-4 text-2xl font-medium leading-relaxed bg-orange-500 text-white ">
            Explore our diverse gallery showcasing a range of images
          </p>
        </div>
        <div className="h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="relative lg:w-[290px] lg:h-[290px] md:w-[220px] md:h-[220px] sm:w-[180px] sm:h-[180px] w-[100px] h-[100px] [transform-style:preserve-3d] animate-[rotate_30s_linear_infinite]">
            <span style={{ "--i": 1 }} className="span-style">
              <img src={galery1} alt="img - 1" className="img-style object-fill" />
            </span>
            <span style={{ "--i": 2 }} className="span-style">
              <img src={galery2} alt="img - 2" className="img-style object-fill" />
            </span>
            <span style={{ "--i": 3 }} className="span-style">
              <img src={galery3} alt="img - 3" className="img-style object-fill" />
            </span>
            <span style={{ "--i": 4 }} className="span-style">
              <img src={galery4} alt="img - 4" className="img-style object-fil " />
            </span>
            <span style={{ "--i": 5 }} className="span-style">
              <img src={galery5} alt="img - 5" className="img-style object-fill" />
            </span>
            <span style={{ "--i": 6 }} className="span-style">
              <img src={galery6} alt="img - 6" className="img-style object-fill" />
            </span>
            <span style={{ "--i": 7 }} className="span-style">
              <img src={galery7} alt="img - 7" className="img-style object-fill" />
            </span>
            <span style={{ "--i": 8 }} className="span-style">
              <img src={galery8} alt="img - 8" className="img-style object-fill" />
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

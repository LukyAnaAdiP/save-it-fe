import React from "react";
import {
  IconHistory,
  IconDeviceDesktopAnalytics,
  IconContract,
  IconDeviceMobileCheck,
  IconShoppingCartPlus,
  IconBox,
} from "@tabler/icons-react";
import Typewriter from "../components/typinganimation/TypeWriter";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useAuthentication } from "../context/AuthContext";
import Picture1 from "../../public/images/picture1.jpg";
import Picture2 from "../../public/images/picture2.jpg";
import Picture3 from "../../public/images/picture3.jpg";

export default function Features() {
  return (
    <>
      <section className="bg-gray-100 py-2">
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center mt-6 py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-5">
              <Typewriter text="Why Choose Save It" delay={400} infinite />
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl px-4">
              <Feature
                icon={<IconDeviceDesktopAnalytics size={40} color="white" />}
                title="Dashboard"
                description={
                  <div>
                    <p className="text-center font-semibold p-1">
                      A central information hub that provides a concise and
                      comprehensive view of various data and key metrics
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-orange-600 font-semibold">
                      <li>Key Statistics at a Glance</li>
                      <li>Captivating Data Visualization</li>
                      <li>Seamlessly Integrated Data</li>
                      <li>Easy Filtering and Search</li>
                    </ul>
                  </div>
                }
              />
              <Feature
                icon={<IconBox size={40} color="white" />}
                title="Product Management"
                description={
                  <div className="p-1">
                    <p className="text-center font-semibold">
                      Ensuring the availability of goods in sufficient
                      quantities to meet customer demand while minimizing
                      inventory costs and risks
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-orange-600 font-semibold">
                      <li>Stock Recording</li>
                      <li>Inventory Management</li>
                      <li>Systematic Storage</li>
                    </ul>
                  </div>
                }
              />
              <Feature
                icon={<IconHistory size={40} color="white" />}
                title="Transaction History"
                description={
                  <div className="p-1">
                    <p className="text-center font-semibold">
                      Transaction History refers to a detailed record of all
                      financial transactions or operations that have been
                      performed over a specific period
                    </p>
                  </div>
                }
              />
              <Feature
                icon={<IconDeviceMobileCheck size={40} color="white" />}
                title="Mobile App Support"
                description={
                  <div className="p-1">
                    <p className="text-center font-semibold">
                      Can be downloaded and used on mobile phones with an
                      intuitive design, making it easy to use and enhancing the
                      user experience
                    </p>
                  </div>
                }
              />
              <Feature
                icon={<IconShoppingCartPlus size={40} color="white" />}
                title="Procurement"
                description={
                  <div className="p-1">
                    <p className="text-center font-semibold">
                      Obtaining goods from vendors to meet the operational and
                      production needs of the company without having to meet the
                      vendors in person
                    </p>
                  </div>
                }
              />
              <Feature
                icon={<IconContract size={40} color="white" />}
                title="Reporting"
                description={
                  <div className="p-1">
                    <p className="text-center font-semibold">
                      Analyzing warehouse data to improve efficiency and make
                      better decisions.
                    </p>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-5">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Optimize Your Warehouse Management
            </h2>
            <p className="text-lg text-orange-600">
              Our comprehensive warehouse management system is designed to
              streamline your operations, reduce errors, and boost productivity.
              Manage inventory and more with ease.
            </p>
          </div>

          <div className="flex flex-col mx-36 md:flex-row items-center md:space-x-8">
            <div className="flex-1 w-full max-w-md mx-auto">
              <Swiper
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="swiper-container relative"
                style={{
                  "--swiper-pagination-color": "#4f46e5",
                  "--swiper-pagination-bullet-inactive-color": "#9ca3af",
                  "--swiper-pagination-bullet-inactive-opacity": "1",
                  "--swiper-pagination-bullet-size": "10px",
                  "--swiper-pagination-bullet-horizontal-gap": "6px",
                }}
              >
                <SwiperSlide>
                  <div className="bg-indigo-50 rounded-xl h-96 flex justify-center items-center">
                    <img
                      src={Picture1}
                      alt="Description 1"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="bg-indigo-50 rounded-xl h-96 flex justify-center items-center">
                    <img
                      src={Picture2}
                      alt="Description 2"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="bg-indigo-50 rounded-xl h-96 flex justify-center items-center">
                    <img
                      src={Picture3}
                      alt="Description 3"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            <div className="flex-1 bg-white px-5 py-5 text-start max-w-sm h-96 rounded-lg shadow-md">
              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Why Choose Us?
                </h3>
                <ul className="list-disc list-inside text-gray-600 mb-6">
                  <li className="mb-2">Easy order management</li>
                  <li className="mb-2">Comprehensive transaction history</li>
                  <li className="mb-2">
                    Seamless integration with your existing systems
                  </li>
                </ul>
                <div className="text-center mt-16">
                  <Link
                    to="/signup"
                    className="inline-block px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition duration-300 animate-bounce"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-xl font-bold text-gray-800 mb-6">
              Start transforming your warehouse management today. <br />{" "}
              Experience the difference with our intuitive and powerful system.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

const Feature = ({ icon, title, description }) => (
  <div className="relative w-64 h-60 perspective">
    <div className="card w-full h-full transition-transform duration-500 transform-style-preserve-3d">
      <div className="front absolute w-full h-full flex flex-col items-center justify-center text-center p-6 bg-transparent rounded-lg shadow-md">
        <div className="text-black bg-orange-600 rounded-full p-3 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
      </div>
      <div className="back absolute w-full h-full flex items-center justify-center bg-gray-300 rounded-lg rotate-y-180">
        {/* <!-- Isi belakang kartu --> */}
        <div className="text-gray-800 items-center text-justify">
          {description}
        </div>
      </div>
    </div>
  </div>
);

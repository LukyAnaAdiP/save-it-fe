import React from "react";
import AboutUsPicture from "../../public/images/aboutus.svg";
import Unilever from "../../public/images/Unilever.png";
import Sony from "../../public/images/Sony.png";
import Samsung from "../../public/images/Samsung.png";
import Mayora from "../../public/images/Mayora.png";
import Logitech from "../../public/images/Logitech.png";
import Lenovo from "../../public/images/Lenovo.png";
import Indofood from "../../public/images/Indofood.png";
import Erigo from "../../public/images/Erigo.png";
import Eiger from "../../public/images/eiger.png";
import Adidas from "../../public/images/Adidas.png";
import Nike from "../../public/images/Nike.png";
import Wings from "../../public/images/Wing.svg";
import Asus from "../../public/images/Asus.png";
import Roughneck from "../../public/images/Roughneck.jpeg";
import Xiaomi from "../../public/images/Xiaomi.jpeg";
import Rucika from "../../public/images/Rucika.png";

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../context/AuthContext";

export default function AboutUs() {
  const {authenticationState} = useAuthentication()
  const navigate = useNavigate();
  const testimonials = [
    {
      image:
        "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/2a/2a955480b429991668c4b9fb1af887763f8bfbd2_full.jpg",
      rating: 5,
      name: "Neil Patel",
      text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Dignissimos facere voluptas atque ipsum delectus, vitae iure ea! Ea, sint laudantium!",
    },
    {
      image:
        "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/9b/9b63aa06eca2b66c7ef80037b3280567f61b72e1_full.jpg",
      name: "Rins",
      rating: 4,
      text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Dignissimos facere voluptas atque ipsum delectus, vitae iure ea! Ea, sint laudantium!",
    },
    {
      image:
        "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/3e/3e5961724174676711dfa18582c89d615eb2fa80_full.jpg",
      name: "Mike Demien",
      rating: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Dignissimos facere voluptas atque ipsum delectus, vitae iure ea! Ea, sint laudantium!",
    },
    {
      image:
        "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/9b/9b7b96187ae8d0aa507f466e01c83b8fbe81d0e7_full.jpg",
      name: "Stephen William",
      rating: 4,
      text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Dignissimos facere voluptas atque ipsum delectus, vitae iure ea! Ea, sint laudantium!",
    },
    {
      image:
        "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/d1/d14a9f53dec855a4d3028f506658bf83f276a595_full.jpg",
      name: "Ersha Steffy",
      rating: 4,
      text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Dignissimos facere voluptas atque ipsum delectus, vitae iure ea! Ea, sint laudantium!",
    },
    {
      image:
        "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/fd/fd37b39e13f65bfec015fdbb04785909214ce22e_full.jpg",
      name: "Caroline",
      rating: 4,
      text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Dignissimos facere voluptas atque ipsum delectus, vitae iure ea! Ea, sint laudantium!",
    },
  ];

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <div className="overflow-x-hidden">
        <section className="min-h-screen min-w-full overflow-x-hidden mb-auto">
          <div className="p-8">
            <div className="container mx-auto">
              <div className="grid grid-rows-2 grid-flow-col  ">
                <div className="row-span-2 col-span-2">
                  <img
                    src={AboutUsPicture}
                    data-aos="fade-right"
                    className="w-[900px] h-[600px]"
                  />
                </div>
                <div className="row-span-3 mr-10">
                  <div className="font-bold text-4xl text-orange-600 mt-20">
                    <h1 data-aos="fade-down-left">Who Are We?</h1>
                  </div>
                  <div
                    data-aos="fade-up"
                    data-aos-delay="500"
                    className="text-xl mt-3 text-justify"
                  >
                    <p className="inline mx-2">At</p>
                    <p className="inline text-orange-600 text-2xl mx-1 font-bold">
                      Save It,
                    </p>
                    we are dedicated to revolutionizing warehouse management. We
                    are a team of experienced professionals committed to
                    delivering innovative solutions that streamline operations
                    and drive efficiency.
                  </div>
                  <div className="font-bold text-4xl text-orange-600 mt-16 mb-3 justify-center text-center">
                    <h1 data-aos="fade-down-left">Our Mission</h1>
                  </div>
                  <div className="text-xl text-justify" data-aos="fade-in"
                    data-aos-delay="800">
                    <ul className="list-none pl-6">
                      <li className="relative pl-6 py-3 text-justify before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-orange-500 before:rounded-full">
                        To empower businesses with cutting-edge technology and
                        seamless integration
                      </li>
                      <li className="relative pl-6 py-3 text-justify before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-orange-500 before:rounded-full">
                      Ensuring that every aspect of warehouse
                      management is optimized for success
                      </li>
                      <li className="relative pl-6 py-3 text-justify before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-orange-500 before:rounded-full">
                      Focus on
                      excellence and customer satisfaction
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-t-4 border-gray-200 w-auto my-4 mx-auto mt-6" />
        </section>
        <section>
          <hr className="border-t-4 border-orange-600 w-40 my-4 mx-auto" />
          <div className="container mx-auto ">
            <h4 className="text-center font-bold text-gray-600 text-4xl mb-3 font-mono">
              Trusted by 1,500+ clients
            </h4>
            <hr className="border-t-4 border-orange-600 w-40 my-4 mx-auto" />
            {/* <div className="bg-transparent min-h-80 flex box-border outline outline-2 outline-orange-600 justify-center items-center rounded-xl"> */}
            <div className="flex flex-col gap-4 p-4">
              <div className="flex-1 p-4 mb-4">
                <div className="overflow-hidden relative w-full h-32">
                  <div className="flex animate-conveyor">
                    <img src={Unilever} className="w-36 h-32 mx-5" />
                    <img src={Sony} className="w-36 h-32 mx-5" />
                    <img src={Nike} className="w-36 h-32 mx-5" />
                    <img src={Roughneck} className="w-36 h-32 mx-5" />
                    <img src={Logitech} className="w-36 h-32 mx-5" />
                    <img src={Xiaomi} className="w-36 h-32 mx-5" />
                    <img src={Wings} className="w-36 h-32 mx-5" />
                    <img src={Indofood} className="w-36 h-32 mx-5" />
                  </div>
                </div>
              </div>
              <div className="flex-1 p-4 mt-11">
                <div className="overflow-hidden relative w-full h-32">
                  <div className="flex animate-conveyor-reverse">
                    <img src={Mayora} className="w-36 h-32 mx-5" />
                    <img src={Adidas} className="w-36 h-32 mx-5" />
                    <img src={Eiger} className="w-36 h-32 mx-5" />
                    <img src={Asus} className="w-36 h-32 mx-5" />
                    <img src={Lenovo} className="w-36 h-32 mx-5" />
                    <img src={Samsung} className="w-36 h-32 mx-5" />
                    <img src={Erigo} className="w-36 h-32 mx-5" />
                    <img src={Rucika} className="w-36 h-32 mx-5" />
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </section>
        <section>
          <hr className="border-t-4 border-gray-200 w-auto my-4 mx-auto mt-6" />
          <div className="p-8">
            <div className="container mx-auto">
              <div className="grid grid-rows-2 grid-flow-col  ">
                <div className="row-span-3 mr-10 mt-44">
                  <div className="font-bold text-4xl text-black mt-28">
                    <h1>
                      See What Our <br /> Clients Say
                      <span className="font-bold text-4xl text-orange-600">
                        {" "}
                        When
                        <br />
                        Using Our Services
                      </span>
                    </h1>
                  </div>
                  <div className="flex justify-center items-center">
                    {!authenticationState.isLoggedIn && (
                      <button
                        onClick={() => navigate("/signup")}
                        className="mt-10 text-white bg-orange-600  hover:bg-orange-700 focus:ring-orange-300 font-medium rounded-lg text-lg px-5 py-1.5 me-2 mb-2 dark:focus:ring-orange-900"
                      >
                        Sign Up Free
                      </button>

)}
</div>
                </div>
                <div className="row-span-2 col-span-2">
                  <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    data-aos="fade-left"
                    data-aos-duration="3000"
                  >
                    {testimonials.map((testimonial, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-6 flex flex-col items-center text-justify"
                      >
                        <img
                          className="w-24 h-24 rounded-full mb-4"
                          src={testimonial.image}
                          alt="Client"
                        />
                        <p className="text-lg font-bold text-gray-700">
                          {testimonial.name}
                        </p>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, starIndex) => (
                            <svg
                              key={starIndex}
                              className={`w-5 h-5 ${
                                starIndex < testimonial.rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L1 6.545l6.561-.955L10 0l2.439 5.59L19 6.545l-4.245 4.09L15.878 18z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-sm text-gray-700">
                          {testimonial.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function CarouselVendor() {
  const images = [
    // { src: "../../../public/images/Carousel1.png", alt: "picture 1" },
    { src: "../../../public/images/Carousel3.png", alt: "picture 2" },
    { src: "../../../public/images/Carousel4.png", alt: "picture 3" },
    { src: "../../../public/images/Carousel2.png", alt: "picture 3" },

  ];

  return (
    <>
    <div className="flex justify-center items-center">
      <div className="max-w-6xl items-center h-120 w-200 mt-20 object-cover rounded-lg overflow-hidden">
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={3000}
          className="relative"
          // renderIndicator={(clickHandler, isSelected) => (
          //   <div
          //     className={`mx-1 w-2 h-2 rounded-full ${
          //       isSelected ? "bg-blue-500" : "bg-gray-400"
          //     }`}
          //     onClick={clickHandler}
          //   />
          // )}
        >
          {images.map((image, index) => (
            <div key={index} className="relative w-auto">
              <img
                src={image.src}
                alt={image.alt}
                className="object-fill w-[400px] lg:h-[380px]"
              />
            </div>
          ))}
        </Carousel>
      </div>
      </div>
    </>
  );
}

export default CarouselVendor;

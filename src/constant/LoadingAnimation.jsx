import Lottie from "lottie-react";
import React from "react";
import animation from "../../public/animations/LoadingAnimation.json";

function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Lottie animationData={animation} loop={true} width={5} />
    </div>
  );
}

export default LoadingAnimation;

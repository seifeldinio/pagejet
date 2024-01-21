"use client";

import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";

const Loading = () => {
  // Define your Lottie options
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: require("@/public/lotties/layers.json"),
  };

  const [isLottieLoaded, setIsLottieLoaded] = useState(false); // State to track Lottie loading

  useEffect(() => {
    setIsLottieLoaded(true);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full">
      {isLottieLoaded && (
        <div className="relative flex w-[150px]">
          <div>
            <Lottie options={lottieOptions} />
          </div>
        </div>
      )}
      {/* <Loader2 className="animate-spin h-12 w-12" /> */}
    </div>
  );
};

export default Loading;

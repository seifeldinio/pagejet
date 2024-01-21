import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useOrigin } from "@/hooks/use-origin";

const Branding = () => {
  const origin = useOrigin();

  return (
    <div
      onClick={() => {
        // Open landing page in new tab
        window.open(
          `${origin}`,
          "_blank" // <- This is what makes it open in a new window.
        );
      }}
      className="fixed right-5 bottom-5 bg-[#ffef60] px-2 rounded-md cursor-pointer opacity-75  hover:opacity-100 duration-150 transition-all ease-in-out"
    >
      <div className="flex flex-row items-center">
        <span className="text-[14px] mb-0.5 mr-0.5">Made with</span>
        <Image
          src="/images/logo-text-black.webp"
          className="w-[90px] h-auto"
          width={90}
          height={0}
          alt=""
        />
      </div>
    </div>
  );
};

export default Branding;

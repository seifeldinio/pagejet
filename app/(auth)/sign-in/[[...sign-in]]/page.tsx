"use client";

import { SignIn } from "@clerk/nextjs";
import { useState } from "react";
import SideImage from "../../_components/side-image";
import DemoUser from "@/components/demo-user";

export default function Page() {
  return (
    <div className="flex flex-row w-full h-full">
      <div className="relative flex flex-1 flex-col items-center justify-center space-y-6 ">
        <div className="w-[140px] mix-blend-difference filter brightness-0 invert">
          <img
            src="/images/logo-text.webp"
            alt="PageJet Logo"
            draggable={false}
          />
        </div>
        <SignIn />
        {/* Demo User Information */}
        <div className="w-[360px] ">
          <DemoUser />
        </div>
      </div>
      <div className="hidden md:flex flex-col flex-1 items-center justify-center bg-[#202023] text-white ">
        <SideImage />
      </div>
    </div>
  );
}

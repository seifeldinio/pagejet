"use client";

import DemoUserCopyButton from "@/components/ui/demo-user-copy-button";
import { SignIn } from "@clerk/nextjs";
import { useState } from "react";
import SideImage from "../../_components/side-image";

export default function Page() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  // Function to copy text to clipboard and reset copied state after 2 seconds
  const copyToClipboardAndResetState = (
    text: string,
    setCopiedState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  return (
    <div className="flex flex-row w-full h-full">
      <div className="flex flex-1 flex-col items-center justify-center space-y-6">
        <div className="w-[140px] mix-blend-difference filter brightness-0 invert">
          <img
            src="/images/logo-text.webp"
            alt="PageJet Logo"
            draggable={false}
          />
        </div>
        <SignIn />
        {/* Demo User Information */}
        <div className="flex flex-col items-start rounded-md border border-[#eae475] bg-[#fffcc5] w-[340px] px-4 py-2 ">
          <p className="font-bold mb-3">👇 Demo user 👇</p>
          <div className="flex flex-row items-center  mb-3 w-full ">
            <span className="mr-2">Email:</span>
            <span>demo@gmail.com</span>
            <DemoUserCopyButton
              onClick={() =>
                copyToClipboardAndResetState("demo@gmail.com", setCopiedEmail)
              }
              copied={copiedEmail}
            />
          </div>

          <div className="flex flex-row items-center  mb-2 w-full ">
            <span className="mr-2">Password:</span>
            <span>123456</span>
            <DemoUserCopyButton
              onClick={() =>
                copyToClipboardAndResetState("123456", setCopiedPassword)
              }
              copied={copiedPassword}
            />
          </div>
        </div>
      </div>
      <div className="hidden md:flex flex-col flex-1 items-center justify-center bg-[#202023] text-white ">
        <SideImage />
      </div>
    </div>
  );
}

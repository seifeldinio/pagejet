import React, { useState } from "react";
import DemoCopy from "@/components/ui/demo-copy";

const DemoUser: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPassword, setCopiedPassword] = useState<boolean>(false);

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
    <div className="flex flex-col items-start rounded-md border border-[#eae475] bg-[#fffcc5] dark:text-black w-full px-4 py-2 ">
      <p className="font-bold mb-3">👇 Demo user 👇</p>
      <div className="flex flex-row items-center  mb-3 w-full ">
        <span className="mr-2">Email:</span>
        <span>demo@codementorx.com</span>
        <DemoCopy
          onClick={() =>
            copyToClipboardAndResetState("demo@codementorx.com", setCopiedEmail)
          }
          copied={copiedEmail}
        />
      </div>

      <div className="flex flex-row items-center  mb-2 w-full ">
        <span className="mr-2">Password:</span>
        <span>{"TZ+iEA6~kb*ui("}</span>
        <DemoCopy
          onClick={() =>
            copyToClipboardAndResetState("TZ+iEA6~kb*ui(", setCopiedPassword)
          }
          copied={copiedPassword}
        />
      </div>
    </div>
  );
};

export default DemoUser;

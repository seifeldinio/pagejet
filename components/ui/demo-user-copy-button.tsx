import React from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface DemoUserCopyButtonProps {
  onClick: () => void; // Specify the type of onClick function
  copied: boolean; // Specify the type of copiedEmail as boolean
}

const DemoUserCopyButton: React.FC<DemoUserCopyButtonProps> = ({
  onClick,
  copied,
}) => {
  return (
    <div className="relative ml-auto">
      <Button
        size={"icon"}
        className="h-8 w-8 bg-white hover:bg-[#f1f1f1]"
        onClick={onClick}
      >
        <Copy className="h-4 w-4" />
      </Button>
      {copied && (
        <div className="absolute bottom-0 left-[40px] bg-gray-900 text-white px-4 py-2 rounded shadow">
          Copied!
        </div>
      )}
    </div>
  );
};

export default DemoUserCopyButton;

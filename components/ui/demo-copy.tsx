import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface DemoCopyProps {
  onClick: () => void;
  copied: boolean;
}

const DemoCopy: React.FC<DemoCopyProps> = ({ onClick, copied }) => {
  return (
    <div className="relative ml-auto">
      <Button size="icon" className="h-8 w-8 " onClick={onClick}>
        {copied ? (
          <Check className="h-4 w-4 text-green" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
      {/* {copied && (
        <div className="fade absolute bottom-0 left-[40px] bg-gray-900 text-white px-4 py-2 rounded shadow">
          Copied!
        </div>
      )} */}
    </div>
  );
};

export default DemoCopy;

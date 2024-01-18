import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

const IconButton = ({ icon, text }: { icon: ReactNode; text: string }) => {
  return (
    <Button className="flex flex-row items-center space-x-1" size="sm">
      {icon}
      <span>{text}</span>
    </Button>
  );
};

export default IconButton;

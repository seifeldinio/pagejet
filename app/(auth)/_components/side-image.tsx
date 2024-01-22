import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, StarHalf } from "lucide-react";
import React from "react";

function SideImage() {
  return (
    <div className="flex flex-col items-center justify-center md:px-20 3xl:px-40 space-y-[22px] ">
      {/* 478px */}
      <div className="w-3/4 h-auto">
        <img src="/images/auth.webp" alt="Illustration" draggable={false} />
      </div>

      <div className="flex flex-col justify-start space-y-4">
        <p className="text-xl font-light">
          {
            '"PageJet is a game-changer! It exceeded my expectations with its user-friendly interface and intuitive drag-and-drop builder."'
          }
        </p>
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center space-x-2 justify-start w-fit">
            <Avatar className="text-black">
              <AvatarFallback className="bg-[#ABD7FF]">A</AvatarFallback>
            </Avatar>
            <span>Alex Thompson</span>
          </div>
          <div className="flex flex-row items-center space-x-1 text-[#FFCA28] text-sm">
            <Star className="h-4 w-4" />
            <Star className="h-4 w-4" />
            <Star className="h-4 w-4" />
            <Star className="h-4 w-4" />
            <StarHalf className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideImage;

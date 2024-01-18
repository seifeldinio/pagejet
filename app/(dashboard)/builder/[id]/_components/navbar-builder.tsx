import React from "react";
import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

const BuilderNavbar = () => {
  return (
    <nav className="flex justify-between items-center h-[62px] px-4 py-2 bg-background">
      <Logo />

      <div className="flex gap-4 items-center">
        <ModeToggle />
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </nav>
  );
};

export default BuilderNavbar;

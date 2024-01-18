import React from "react";
import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center border-b border-b-background dark:border-border h-[62px] px-8 py-2 bg-dark500">
      <Logo />

      <div className="flex gap-4 items-center">
        <ModeToggle />
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </nav>
  );
};

export default Navbar;

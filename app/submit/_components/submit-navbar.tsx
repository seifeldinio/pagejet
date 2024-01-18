import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import React from "react";

function SubmitNavbar() {
  return (
    <nav className="flex justify-between items-center h-[62px] px-8 py-2 bg-background border-b shadow-sm">
      <Logo />

      <div className="flex gap-4 items-center">
        <ModeToggle />
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </nav>
  );
}

export default SubmitNavbar;

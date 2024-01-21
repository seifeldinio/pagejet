import React, { useEffect, useState } from "react";
import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { File, FileSpreadsheet } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
  // const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const currentPage = usePathname();

  // Check if the current pathname includes 'builder'
  const formsActive = currentPage === "/";
  const pagesActive = currentPage.includes("pages");

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) return null; // to avoid rehyrdration errors

  return (
    <nav className="flex justify-between items-center border-b border-b-background dark:border-border h-[62px] px-8 py-2 bg-dark500">
      <div className="flex flex-row items-center space-x-[26px]">
        <Logo />
        <div className="flex flex-row items-center space-x-4">
          <div
            onClick={() => {
              router.push("/");
            }}
            className={cn(
              formsActive &&
                "flex flex-row items-center space-x-1.5 text-white h-[62px] border-b-[4px] border-b-purple500 px-2 cursor-pointer",
              !formsActive &&
                "flex flex-row items-center space-x-1.5 text-[#CCCCCC] h-[62px] border-b-[4px] border-b-transparent px-2 cursor-pointer hover:text-white hover:border-white/30 transition-all duration-150 ease-in-out"
            )}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Forms</span>
          </div>
          <div
            onClick={() => {
              router.push("/pages");
            }}
            className={cn(
              pagesActive &&
                "flex flex-row items-center space-x-1.5 text-white h-[62px] border-b-[4px] border-b-purple500 px-2 cursor-pointer",
              !pagesActive &&
                "flex flex-row items-center space-x-1.5 text-[#CCCCCC] h-[62px] border-b-[4px] border-b-transparent px-2 cursor-pointer hover:text-white hover:border-white/30 transition-all duration-150 ease-in-out"
            )}
          >
            <File className="w-4 h-4" />
            <span>Pages</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <ModeToggle />
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </nav>
  );
};

export default Navbar;

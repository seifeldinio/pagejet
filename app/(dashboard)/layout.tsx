"use client";
import React, { ReactNode } from "react";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";
import BuilderNavbar from "./builder/[id]/_components/navbar-builder";

const Layout = ({ children }: { children: ReactNode }) => {
  const currentPage = usePathname();

  // Check if the current pathname includes 'builder'
  const isBuilderPage = currentPage.includes("builder");

  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      {!isBuilderPage && <Navbar />}
      {isBuilderPage && <BuilderNavbar />}

      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
};

export default Layout;

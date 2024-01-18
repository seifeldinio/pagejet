"use client";
import React, { ReactNode } from "react";
import Navbar from "@/components/navbar";
import SubmitNavbar from "./_components/submit-navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <SubmitNavbar />
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
};

export default Layout;

import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-[#FAFAFA]">
      {children}
    </div>
  );
}

export default Layout;

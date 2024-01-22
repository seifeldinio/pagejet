import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      {/* bg-[#FAFAFA] */}
      {children}
    </div>
  );
}

export default Layout;

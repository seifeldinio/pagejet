import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col w-full flex-grow mx-auto px-8">
      {children}
    </div>
  );
};

export default Layout;

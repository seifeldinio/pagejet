import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="flex w-full flex-grow mx-auto">{children}</div>;
};

export default Layout;

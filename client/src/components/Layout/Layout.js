import React from "react";
import Header from "./Header";

import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-[4rem]">
        <Toaster />
        {children}
      </main>
    </div>
  );
};

export default Layout;

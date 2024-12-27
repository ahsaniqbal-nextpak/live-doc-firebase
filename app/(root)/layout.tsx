import Providers from "@/store/Providers";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Providers>{children}</Providers>
    </main>
  );
};

export default Layout;

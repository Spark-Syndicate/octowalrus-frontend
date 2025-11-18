import type React from "react";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";

interface LayoutProviderProps {
  children: React.ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Nav />
        <main className="flex-1 p-6 md:ml-[250px]">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

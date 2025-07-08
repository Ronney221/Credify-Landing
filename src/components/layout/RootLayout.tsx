import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 w-full">
        {/* Remove container padding from root and let each section handle its own padding */}
        {children}
      </main>
      <Footer />
    </div>
  );
} 
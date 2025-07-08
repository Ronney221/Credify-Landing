import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          {children}
        </div>
      </main>
    </div>
  );
} 
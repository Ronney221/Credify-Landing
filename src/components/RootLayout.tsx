import { Header } from "./Header";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      {children}
    </div>
  );
} 
import { Header } from "./Header";
import { ReactNode } from "react";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        <div className="min-h-screen flex flex-col bg-white">
          <Header />
          {children}
        </div>
      </AnimatePresence>
    </LazyMotion>
  );
} 
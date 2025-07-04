import { Link } from "react-router-dom";
import { Home, LayoutGrid, Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  return (
    <>
      {/* Top Header - Hidden on Mobile */}
      <header className="sticky top-0 z-50 hidden md:block w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center space-x-2">
            <img src="/assets/logo/icon.png" alt="Credify" className="h-8 w-8" />
            <span className="text-xl font-bold">Credify</span>
          </div>
          <nav className="ml-auto flex gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <Link to="/features" className="text-muted-foreground hover:text-foreground">Features</Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link>
            <Button asChild>
              <Link to="/waitlist">Join Waitlist</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background md:hidden">
        <div className="grid h-16 grid-cols-4">
          <Link to="/" className="flex flex-col items-center justify-center">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/features" className="flex flex-col items-center justify-center">
            <LayoutGrid className="h-5 w-5" />
            <span className="text-xs">Features</span>
          </Link>
          <Link to="/waitlist" className="flex flex-col items-center justify-center">
            <Mail className="h-5 w-5" />
            <span className="text-xs">Waitlist</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center w-full">
                <Menu className="h-5 w-5" />
                <span className="text-xs">Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/about" className="text-lg">About</Link>
                <Link to="/pricing" className="text-lg">Pricing</Link>
                <Link to="/blog" className="text-lg">Blog</Link>
                <Link to="/help" className="text-lg">Help</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
} 
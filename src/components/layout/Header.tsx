import { Home, LayoutGrid, Mail, Menu } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";

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
            <a href="#home" className="text-muted-foreground hover:text-foreground">Home</a>
            <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</a>
            <Button asChild>
              <a href="#waitlist">Join Waitlist</a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background md:hidden">
        <div className="grid h-16 grid-cols-4">
          <a href="#home" className="flex flex-col items-center justify-center">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </a>
          <a href="#features" className="flex flex-col items-center justify-center">
            <LayoutGrid className="h-5 w-5" />
            <span className="text-xs">Features</span>
          </a>
          <a href="#waitlist" className="flex flex-col items-center justify-center">
            <Mail className="h-5 w-5" />
            <span className="text-xs">Waitlist</span>
          </a>
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
                <a href="#about" className="text-lg">About</a>
                <a href="#pricing" className="text-lg">Pricing</a>
                <a href="#blog" className="text-lg">Blog</a>
                <a href="#help" className="text-lg">Help</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
} 
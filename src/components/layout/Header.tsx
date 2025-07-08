import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useScrollTo } from "@/hooks/useScrollTo";

const navigation = [
  { name: "Download", id: "hero" },
  { name: "Cards", id: "cards" },
  { name: "How It Works", id: "how-it-works" },
  { name: "FAQ", id: "faq" }
];

export function Header() {
  const scrollTo = useScrollTo();

  const handleDownload = () => {
    window.open('https://testflight.apple.com/join/xtFTgddM', '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Logo on the left */}
        <a href="/" className="flex items-center gap-2 flex-shrink-0">
          <img src="/assets/logo/icon.png" alt="Credify Icon" className="h-8 w-8" />
          <span className="text-xl font-semibold text-[#002B5B]">Credify</span>
        </a>

        {/* Right-aligned section with flex-grow to push items right */}
        <div className="flex items-center gap-6 flex-grow justify-end">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <Button 
            variant="default" 
            className="hidden md:inline-flex whitespace-nowrap ml-8" 
            onClick={handleDownload}
          >
            Download Beta
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      scrollTo(item.id);
                      const closeButton = document.querySelector('[data-radix-collection-item]');
                      if (closeButton instanceof HTMLElement) {
                        closeButton.click();
                      }
                    }}
                    className="text-left py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
                {/* Mobile CTA Button */}
                <Button variant="default" className="w-full" onClick={handleDownload}>
                  Download Beta
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
} 
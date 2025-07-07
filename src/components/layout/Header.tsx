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
  { name: "Features", id: "features" },
  { name: "AI Assistant", id: "ai-assistant" },
  { name: "Cards", id: "cards" },
  { name: "FAQ", id: "faq" }
];

export function Header() {
  const scrollTo = useScrollTo();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2">
            <img src="/assets/logo/logo_text.png" alt="Credify" className="h-8" />
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="default" onClick={() => scrollTo("waitlist")}>
            Join Waitlist
          </Button>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
} 
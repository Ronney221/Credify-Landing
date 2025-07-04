import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center space-x-2">
          <img src="/assets/logo/icon.png" alt="Credify" className="h-8 w-8" />
          <span className="text-xl font-bold">Credify</span>
        </div>
        <NavigationMenu className="ml-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}>
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/features" className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}>
                Features
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/pricing" className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}>
                Pricing
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
} 
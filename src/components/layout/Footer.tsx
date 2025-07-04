import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t bg-background", className)}>
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Product</h3>
            <Link to="/features" className="text-muted-foreground hover:text-foreground">Features</Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link>
            <Link to="/waitlist" className="text-muted-foreground hover:text-foreground">Join Waitlist</Link>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link>
            <Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link>
            <Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <Link to="/help" className="text-muted-foreground hover:text-foreground">Help Center</Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <a href="https://twitter.com/credifyapp" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">Twitter</a>
            <a href="https://linkedin.com/company/credifyapp" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">LinkedIn</a>
            <a href="mailto:hello@credify.app" className="text-muted-foreground hover:text-foreground">Contact</a>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between border-t pt-8">
          <div className="flex items-center space-x-2">
            <img src="/assets/logo/icon.png" alt="Credify" className="h-6 w-6" />
            <span className="text-sm text-muted-foreground">© 2024 Credify. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
} 
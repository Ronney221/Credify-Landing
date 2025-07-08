import { Github, Twitter, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/credifyapp",
    icon: Twitter
  },
  {
    name: "GitHub",
    href: "https://github.com/credifyapp",
    icon: Github
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/credifyapp",
    icon: Linkedin
  }
];

const legalLinks = [
  {
    name: "Privacy Policy",
    href: "/privacy"
  },
  {
    name: "Terms of Service",
    href: "/terms"
  },
  {
    name: "Contact",
    href: "mailto:support@getcredify.app"
  }
];

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("py-12 bg-slate-900", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-8 border-b border-white/10">
          <div>
            <h3 className="font-semibold text-white mb-4">About Credify</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Credify helps you maximize credit card benefits through AI-powered tracking and personalized recommendations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <span className="sr-only">{link.name}</span>
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 text-center text-sm text-white/40">
          <p>© {new Date().getFullYear()} Credify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 
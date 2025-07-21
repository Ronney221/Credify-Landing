import { Github, Twitter, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { supabase } from '../../lib/supabase';
import { FeedbackForm } from "../forms/FeedbackForm";

interface FooterProps {
  className?: string;
}

const socialLinks = [
  {
    name: "Twitter",
    href: "https://x.com/getCredifyApp",
    icon: Twitter
  },
  {
    name: "GitHub",
    href: "https://github.com/ronney221",
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
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            email,
            platform: 'both',
            marketing_consent: true
          }
        ]);

      if (error) throw error;
      
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to subscribe");
    }
  };

  return (
    <footer className={cn("py-12 bg-slate-950", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 pb-8 border-b border-white/10">
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
              <li className="mt-4">
                <FeedbackForm className="text-sm text-white/60 hover:text-white transition-colors bg-transparent hover:bg-white/5 border-white/10 w-full" />
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Stay Updated</h3>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
              <Button 
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-white text-slate-950 hover:bg-white/90"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </Button>
              {status === "success" && (
                <p className="text-sm text-green-400">Thanks for subscribing!</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-400">{errorMessage}</p>
              )}
              <p className="text-xs text-white/40">
                By subscribing, you agree to receive Credify updates. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
        <div className="pt-8 text-center text-sm text-white/40">
          <p>© {new Date().getFullYear()} Credify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 
import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Credify</h3>
            <p className="text-gray-600 max-w-md">
              The ultimate app for tracking, managing, and maximizing your credit card benefits.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-600 hover:text-gray-900">Features</a></li>
              <li><a href="#benefits" className="text-gray-600 hover:text-gray-900">Benefits</a></li>
              <li><a href="#cards" className="text-gray-600 hover:text-gray-900">Cards</a></li>
              <li><a href="#faq" className="text-gray-600 hover:text-gray-900">FAQ</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/credifyapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/credifyapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Credify. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
              <a href="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
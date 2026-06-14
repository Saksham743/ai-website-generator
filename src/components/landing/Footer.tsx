import { Link } from "react-router-dom";
import { Sparkles, Globe, MessageCircle, Play, Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Documentation", href: "#docs" },
    { label: "Pricing", href: "#pricing" },
    { label: "Templates", href: "#templates" },
    { label: "Changelog", href: "#changelog" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
  ],
  Legal: [
    { label: "Terms", href: "#terms" },
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Cookie Policy", href: "#cookies" },
    { label: "GDPR", href: "#gdpr" },
  ],
};

const socials = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: MessageCircle, href: "#", label: "Community" },
  { icon: Play, href: "#", label: "Videos" },
  { icon: Mail, href: "#", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#060612]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                SiteForge<span className="text-violet-400"> AI</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Build beautiful websites with the power of AI. Describe your idea and generate instantly.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-gray-500 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-200"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} SiteForge AI. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Built with ❤️ for creators everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}

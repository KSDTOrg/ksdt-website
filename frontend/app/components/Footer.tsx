import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { 
    label: 'Linktree', 
    href: 'https://linktr.ee/RadioKSDT', 
    icon: '/images/linktree-icon.svg' 
  },
  { 
    label: 'Instagram', 
    href: 'https://www.instagram.com/ksdtradio/', 
    icon: '/images/instagram-icon.svg' 
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 relative">
      <div className="container relative mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
          <div className="flex justify-center space-x-6 md:justify-start md:order-1">
            {footerLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-900 hover:text-black font-semibold transition-colors"
              >
                <img 
                  src={link.icon} 
                  alt={link.label} 
                  className="w-5 h-5 opacity-100" 
                />
                <span className="text-sm tracking-wide">{link.label}</span>
              </a>
            ))}
          </div>

          
          <p className="text-sm font-medium text-zinc-600 text-center md:text-right md:order-2">
            © {new Date().getFullYear()} KSDT Radio
          </p>

        </div>
      </div>
    </footer>
  );
}

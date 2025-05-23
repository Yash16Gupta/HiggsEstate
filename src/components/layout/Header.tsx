
"use client";
import Link from 'next/link';
import { Home, Building, Users, Mail, Tag, Briefcase } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';

const Header = () => {
  const navItems = [
    { href: '/#hero', label: 'Home', icon: <Home className="h-4 w-4" />, type: 'anchor' },
    { href: '/#residential', label: 'Residential', icon: <Home className="h-4 w-4" />, type: 'anchor' },
    { href: '/#commercial', label: 'Commercial', icon: <Building className="h-4 w-4" />, type: 'anchor' },
    { href: '/sell', label: 'Sell Property', icon: <Tag className="h-4 w-4" />, type: 'link' },
    { href: '/#agents', label: 'Meet Our Agents', icon: <Users className="h-4 w-4" />, type: 'anchor' },
    { href: '/agent/list-property', label: 'Agent Portal', icon: <Briefcase className="h-4 w-4" />, type: 'link' },
    // { href: '#about', label: 'About Us', icon: <Users className="h-4 w-4" /> },
    // { href: '#contact', label: 'Contact', icon: <Mail className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/#hero" className="mr-6 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary">
            <path d="M12 2L2 7l10 5 10-5L12 2zm0 7.5L4.5 14H12v5.5l7.5-3.9V14H12V9.5zM4 15l8 4 8-4v-2.1l-8 4-8-4V15z"/>
          </svg>
          <span className="font-bold text-xl sm:inline-block">Higgs Estate</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild className="text-sm font-medium text-foreground/80 hover:text-foreground px-3 py-2">
              <Link href={item.href}>
                {/* {item.icon} */}
                <span className="ml-1">{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center">
          <ThemeToggle />
          {/* Mobile menu button can be added here */}
        </div>
      </div>
    </header>
  );
};

export default Header;

import { Copyright } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-8 bg-background/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center space-x-1">
          <Copyright className="h-4 w-4" />
          <span>{new Date().getFullYear()} Higgs Estate. All rights reserved.</span>
        </div>
        <p className="mt-2">Your trusted partner in real estate.</p>
      </div>
    </footer>
  );
};

export default Footer;

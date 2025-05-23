
"use client";
import Link from 'next/link';
import { Home, Building, Users, Tag, Briefcase, LogIn, LogOut, Loader2 } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const { user, signOutUser, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/'); // Redirect to homepage after logout
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: "Could not log you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const navItems = [
    { href: '/#hero', label: 'Home', icon: <Home className="h-4 w-4" /> },
    { href: '/#residential', label: 'Residential', icon: <Home className="h-4 w-4" /> },
    { href: '/#commercial', label: 'Commercial', icon: <Building className="h-4 w-4" /> },
    { href: '/sell', label: 'Sell Property', icon: <Tag className="h-4 w-4" /> },
    { href: '/#agents', label: 'Meet Our Agents', icon: <Users className="h-4 w-4" /> },
  ];
  
  // Conditional Agent Portal/Login link
  let agentPortalLink;
  if (loading) {
    agentPortalLink = (
      <Button variant="ghost" disabled className="text-sm font-medium text-foreground/80 hover:text-foreground px-3 py-2">
        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
        <span>Loading...</span>
      </Button>
    );
  } else if (user) {
    agentPortalLink = (
      <>
        <Button variant="ghost" asChild className="text-sm font-medium text-foreground/80 hover:text-foreground px-3 py-2">
          <Link href="/agent/list-property">
            <Briefcase className="h-4 w-4 mr-1" />
            <span>Agent Portal</span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" onClick={handleLogout} className="ml-2">
          <LogOut className="h-4 w-4 mr-1" />
          Logout
        </Button>
      </>
    );
  } else {
    agentPortalLink = (
      <Button variant="ghost" asChild className="text-sm font-medium text-foreground/80 hover:text-foreground px-3 py-2">
        <Link href="/login">
          <LogIn className="h-4 w-4 mr-1" />
          <span>Agent Login</span>
        </Link>
      </Button>
    );
  }


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
          {agentPortalLink}
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

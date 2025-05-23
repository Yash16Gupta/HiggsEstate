
"use client";
import React, { type JSX } from 'react';
import Link from 'next/link';
import { Home, Building, Users, Tag, Briefcase, LogIn, LogOut, Loader2, Menu, Mail } from 'lucide-react'; // Added Mail for Contact Us
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

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
      router.push('/'); 
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: "Could not log you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const navItems = [
    { href: '/#hero', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { href: '/#residential', label: 'Residential', icon: <Home className="h-5 w-5" /> },
    { href: '/#commercial', label: 'Commercial', icon: <Building className="h-5 w-5" /> },
    { href: '/sell', label: 'Sell Property', icon: <Tag className="h-5 w-5" /> },
    { href: '/#agents', label: 'Meet Our Agents', icon: <Users className="h-5 w-5" /> },
    { href: '/contact', label: 'Contact Us', icon: <Mail className="h-5 w-5" /> }, // Added Contact Us
  ];
  
  const getAgentPortalLink = (isMobile = false): JSX.Element | JSX.Element[] => {
    const buttonVariant = isMobile ? "ghost" : "ghost";
    const baseButtonClasses = isMobile ? "w-full justify-start text-base py-3 flex items-center" : "text-sm font-medium text-foreground/80 hover:text-foreground px-3 py-2";
    const iconClasses = isMobile ? "mr-2 h-4 w-4" : "mr-1 h-4 w-4";

    if (loading) {
      const loadingButton = (
        <Button variant={buttonVariant} size={isMobile ? "default" : "sm"} disabled className={`${baseButtonClasses}`}>
          <Loader2 className={`${iconClasses} animate-spin`} />
          <span>Loading...</span>
        </Button>
      );
      return isMobile ? [loadingButton] : loadingButton;
    } else if (user) {
      const agentPortalLink = (
        <Link href="/agent/list-property" passHref legacyBehavior>
          <Button variant={buttonVariant} size={isMobile ? "default" : "sm"} asChild={!isMobile} className={`${baseButtonClasses} ${isMobile ? '' : 'inline-flex'}`}>
            {isMobile ? (
              <>
                <Briefcase className={iconClasses} /> Agent Portal
              </>
            ) : (
              <a><Briefcase className={iconClasses} />Agent Portal</a>
            )}
          </Button>
        </Link>
      );
      const logoutButton = (
         <Button 
            variant={isMobile ? "outline" : "outline"} 
            size={isMobile ? "default" : "sm"} 
            onClick={handleLogout} 
            className={`${baseButtonClasses} ${isMobile ? 'mt-2' : 'ml-2'}`}
          >
            <LogOut className={iconClasses} />
            Logout
          </Button>
      );
      
      if (isMobile) {
        return [
          <SheetClose asChild key="agent-portal-mobile">{agentPortalLink}</SheetClose>,
          <SheetClose asChild key="logout-mobile">{logoutButton}</SheetClose>
        ];
      }
      return <>{agentPortalLink}{logoutButton}</>;

    } else {
      const loginLink = (
        <Link href="/login" passHref legacyBehavior>
           <Button variant={buttonVariant} size={isMobile ? "default" : "sm"} asChild={!isMobile} className={`${baseButtonClasses} ${isMobile ? '' : 'inline-flex'}`}>
             {isMobile ? (
                <>
                  <LogIn className={iconClasses} /> Agent Login
                </>
             ) : (
                <a><LogIn className={iconClasses} />Agent Login</a>
             )}
          </Button>
        </Link>
      );
      return isMobile ? [<SheetClose asChild key="login-mobile">{loginLink}</SheetClose>] : loginLink;
    }
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/#hero" className="mr-6 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary">
              <path d="M12 2L2 7l10 5 10-5L12 2zm0 7.5L4.5 14H12v5.5l7.5-3.9V14H12V9.5zM4 15l8 4 8-4v-2.1l-8 4-8-4V15z"/>
            </svg>
            <span className="font-bold text-xl sm:inline-block">Higgs Estate</span>
          </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild className="text-sm font-medium text-foreground/80 hover:text-foreground px-3 py-2">
              <Link href={item.href}>
                <span className="ml-1">{item.label}</span>
              </Link>
            </Button>
          ))}
          {getAgentPortalLink(false)}
        </nav>

        <div className="flex items-center">
          <ThemeToggle />
          {/* Mobile Menu Button */}
          <div className="md:hidden ml-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[340px] p-0">
                <div className="p-6">
                 <SheetClose asChild>
                    <Link href="/#hero" className="flex items-center space-x-2 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-primary">
                          <path d="M12 2L2 7l10 5 10-5L12 2zm0 7.5L4.5 14H12v5.5l7.5-3.9V14H12V9.5zM4 15l8 4 8-4v-2.1l-8 4-8-4V15z"/>
                        </svg>
                        <span className="font-bold text-lg">Higgs Estate</span>
                    </Link>
                  </SheetClose>
                </div>
                <Separator />
                <nav className="flex flex-col p-4 space-y-1">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.label}>
                      <Button variant="ghost" asChild className="w-full justify-start text-base py-3">
                        <Link href={item.href} className="flex items-center">
                          {item.icon}
                          <span className="ml-3">{item.label}</span>
                        </Link>
                      </Button>
                    </SheetClose>
                  ))}
                  <Separator className="my-3" />
                  {/* Process output of getAgentPortalLink for mobile */}
                  {React.Children.toArray((getAgentPortalLink(true) as JSX.Element | JSX.Element[]))
                    .map((element, index) => (
                    // Each element from getAgentPortalLink(true) is already wrapped in SheetClose asChild if needed
                    // We just need to render it and provide a key for the .map()
                    React.cloneElement(element as React.ReactElement, { key: `agent-action-${index}` })
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

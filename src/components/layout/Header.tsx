
"use client";
import Link from 'next/link';
import { Home, Building, Users, Tag, Briefcase, LogIn, LogOut, Loader2, Menu, ShieldCheck } from 'lucide-react';
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
    { href: '/#hero', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { href: '/#residential', label: 'Residential', icon: <Home className="h-5 w-5" /> },
    { href: '/#commercial', label: 'Commercial', icon: <Building className="h-5 w-5" /> },
    { href: '/sell', label: 'Sell Property', icon: <Tag className="h-5 w-5" /> },
    { href: '/#agents', label: 'Meet Our Agents', icon: <Users className="h-5 w-5" /> },
  ];
  
  const getAgentPortalLink = (isMobile = false) => {
    const buttonSize = isMobile ? "default" : "sm";
    const buttonVariant = isMobile ? "ghost" : "ghost";
    const className = isMobile ? "w-full justify-start text-base py-3" : "text-sm font-medium text-foreground/80 hover:text-foreground px-3 py-2";

    if (loading) {
      return (
        <Button variant={buttonVariant} size={buttonSize} disabled className={`${className} ${isMobile ? 'flex items-center' : ''}`}>
          <Loader2 className={`h-4 w-4 mr-2 animate-spin ${isMobile ? 'mr-2' : 'mr-1'}`} />
          <span>Loading...</span>
        </Button>
      );
    } else if (user) {
      return (
        <>
          <Button variant={buttonVariant} size={buttonSize} asChild className={`${className} ${isMobile ? 'flex items-center' : ''}`}>
            <Link href="/agent/list-property">
              <Briefcase className={`h-4 w-4 ${isMobile ? 'mr-2' : 'mr-1'}`} />
              <span>Agent Portal</span>
            </Link>
          </Button>
          <Button 
            variant={isMobile ? "outline" : "outline"} 
            size={isMobile ? "default" : "sm"} 
            onClick={handleLogout} 
            className={`${isMobile ? 'w-full justify-start text-base py-3 mt-2' : 'ml-2'} ${isMobile ? 'flex items-center' : ''}`}
          >
            <LogOut className={`h-4 w-4 ${isMobile ? 'mr-2' : 'mr-1'}`} />
            Logout
          </Button>
        </>
      );
    } else {
      return (
        <Button variant={buttonVariant} size={buttonSize} asChild className={`${className} ${isMobile ? 'flex items-center' : ''}`}>
          <Link href="/login">
            <LogIn className={`h-4 w-4 ${isMobile ? 'mr-2' : 'mr-1'}`} />
            <span>Agent Login</span>
          </Link>
        </Button>
      );
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
                {/* {item.icon} // Desktop icons can be added back if desired */}
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
                  <Link href="/#hero" className="flex items-center space-x-2 mb-6">
                     <SheetClose asChild>
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-primary">
                          <path d="M12 2L2 7l10 5 10-5L12 2zm0 7.5L4.5 14H12v5.5l7.5-3.9V14H12V9.5zM4 15l8 4 8-4v-2.1l-8 4-8-4V15z"/>
                        </svg>
                        <span className="font-bold text-lg">Higgs Estate</span>
                      </>
                     </SheetClose>
                  </Link>
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
                  <SheetClose asChild>
                     <div>{getAgentPortalLink(true)}</div>
                  </SheetClose>
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


"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

// Google Icon SVG - simple version
const GoogleIcon = () => (
  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);


export default function LoginPage() {
  const [error, setError] = useState<string | null>(null); // For general errors displayed on page
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const redirectPath = searchParams.get('redirect') || '/agent/list-property';

  useEffect(() => {
    if (!authLoading && user) {
      router.push(redirectPath);
    }
  }, [user, authLoading, router, redirectPath]);


  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const signedInUser = await signInWithGoogle();
      if (signedInUser) { // User is authorized and signed in
        toast({
          title: "Login Successful",
          description: "Welcome!",
        });
        router.push(redirectPath);
      } else {
        // This case should ideally not be reached if signInWithGoogle throws for unauthorized
        // or returns null for other failures handled by it.
        // However, as a fallback:
        setError("Login failed. Please try again.");
         toast({
          title: "Login Failed",
          description: "Could not complete sign-in.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      let errorMessage = "Failed to sign in with Google. Please try again.";
      
      if (err.code === 'auth/unauthorized-agent') {
        errorMessage = err.message; // Use the message from AuthContext
         toast({
          title: "Access Denied",
          description: errorMessage,
          variant: "destructive",
        });
      } else if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = "Sign-in cancelled. The Google sign-in popup was closed.";
         toast({ // Toast for user-cancelled actions might be optional or less severe
          title: "Sign-in Cancelled",
          description: "The Google sign-in popup was closed.",
          variant: "default",
        });
      } else if (err.code === 'auth/cancelled-popup-request') {
        errorMessage = "Sign-in cancelled. Multiple popup requests were made.";
         toast({
          title: "Sign-in Cancelled",
          description: "Please try signing in again.",
          variant: "default",
        });
      } else if (err.message) { // General error message
        errorMessage = err.message;
         toast({
          title: "Login Failed",
          description: errorMessage,
          variant: "destructive",
        });
      } else { // Fallback toast for unknown errors
         toast({
          title: "Login Failed",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
      
      setError(errorMessage); // Set error for on-page display if needed, though toasts are primary
    } finally {
      setIsLoading(false);
    }
  };
  
  if (authLoading) {
    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-16rem)]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }
  // If user is already logged in (and authorized by AuthContext's onAuthStateChanged), redirect
  if (user) { 
    return ( 
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-16rem)]">
            <p>Redirecting...</p>
        </div>
    );
  }


  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-16rem)]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Agent Portal Login</CardTitle>
          <CardDescription>Sign in with your Google account to access the Higgs Estate agent features.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && !isLoading && ( // Only show page error if not loading (toasts handle loading feedback)
            <p className="text-sm text-center text-destructive bg-destructive/10 p-3 rounded-md">{error}</p>
          )}
          <Button 
            onClick={handleGoogleSignIn} 
            className="w-full" 
            size="lg" 
            disabled={isLoading}
            variant="outline"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <GoogleIcon />
                Sign In with Google
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Only authorized agents can access this portal.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

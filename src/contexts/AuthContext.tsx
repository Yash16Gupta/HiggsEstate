
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { type User, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase/firebase';

// --- Allowlist removed ---
// const AUTHORIZED_AGENT_EMAILS = [
//   "yashgupta16052005@gmail.com",
// ];
// --- End of allowlist removal ---

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<User | null>; // Return User or null
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Directly set user without checking allowlist
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<User | null> => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const signedInUser = result.user;

      if (!signedInUser || !signedInUser.email) {
        // It's still good practice to sign out if essential user info is missing
        await firebaseSignOut(auth);
        throw new Error("Could not retrieve user information from Google Sign-In.");
      }
      
      // No longer checking against an allowlist.
      // setUser will be handled by onAuthStateChanged.
      // setLoading(false) will also be handled by onAuthStateChanged.
      return signedInUser; 
    } catch (error: any) {
      setLoading(false);
      // Sign out in case of any other error during the process if a user was partially authenticated
      if (auth.currentUser) {
         await firebaseSignOut(auth);
      }
      console.error("Google Sign-In Error:", error);
      throw error; // Re-throw error to be caught by the caller
    }
  };

  const signOutUser = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null); 
    } catch (error) {
      console.error("Error signing out: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

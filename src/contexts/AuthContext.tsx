
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { type User, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase/firebase';

// Define the list of authorized agent emails
// IMPORTANT: YOU MUST UPDATE THIS LIST WITH YOUR ACTUAL AGENT EMAILS
const AUTHORIZED_AGENT_EMAILS = [
  "agent1@example.com", // Replace with actual agent email
  "agent2@example.com", // Replace with actual agent email
  // Add more authorized agent emails here
];

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<User | null>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // If a user is authenticated and their email is in the allowlist, set them as the current user.
      // Otherwise, ensure user is null. This also handles the case where a user was previously
      // logged in but their email is no longer in the allowlist (e.g., if the list changes).
      if (currentUser && currentUser.email && AUTHORIZED_AGENT_EMAILS.includes(currentUser.email)) {
        setUser(currentUser);
      } else {
        // If there's a current user but they are not authorized, sign them out.
        if (currentUser) {
          firebaseSignOut(auth); // Sign out unauthorized user
        }
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
        await firebaseSignOut(auth);
        throw new Error("Could not retrieve user information from Google Sign-In.");
      }

      if (AUTHORIZED_AGENT_EMAILS.includes(signedInUser.email)) {
        // User email is in the allowlist.
        // onAuthStateChanged will handle setting the user and loading state.
        return signedInUser;
      } else {
        // User email is NOT in the allowlist. Sign them out and throw an error.
        await firebaseSignOut(auth);
        const authError = new Error("Access denied. This email is not authorized for agent access.");
        // Add a property to easily identify this specific error type
        (authError as any).code = 'auth/unauthorized-agent'; 
        throw authError;
      }
    } catch (error: any) {
      // Ensure loading is false and user is null if any error occurs during sign-in.
      // This also handles the case where firebaseSignOut might be called above.
      setLoading(false); 
      setUser(null); 
      console.error("Google Sign-In Error:", error);
      throw error; 
    }
  };

  const signOutUser = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null); 
    } catch (error) {
      console.error("Error signing out: ", error);
      // Even if sign-out fails, ensure local state is cleared
      setUser(null);
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

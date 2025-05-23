
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { type User, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, type AuthProvider as FirebaseAuthProvider } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase/firebase'; // Import googleProvider

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<any>; // Changed method name and signature
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .catch((error) => {
        setLoading(false);
        // Handle Errors here.
        console.error("Google Sign-In Error:", error);
        // The error.code, error.message, error.customData.email might be useful
        throw error; // Re-throw error to be caught by the caller
      })
      .finally(() => {
        // setLoading(false) is handled by onAuthStateChanged or error handler
      });
  };

  const signOutUser = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null); // Explicitly set user to null
    } catch (error) {
      console.error("Error signing out: ", error);
      // Optionally handle sign-out errors (e.g., display a toast)
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

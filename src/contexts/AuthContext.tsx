
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { type User, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase/firebase';

// --- Simple allowlist for agent emails (for prototyping) ---
// In a production app, this list should be managed securely, e.g., in Firestore or a backend.
const AUTHORIZED_AGENT_EMAILS = [
  "agent1@example.com",
  "another.agent@example.com",
  // Add the Google account emails you want to test with here
];
// --- End of allowlist ---

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
        // Additional check here in case onAuthStateChanged fires after a non-agent signed in
        // and was then signed out by the signInWithGoogle logic.
        if (AUTHORIZED_AGENT_EMAILS.includes(currentUser.email || "")) {
          setUser(currentUser);
        } else {
          // If a non-agent somehow gets here, sign them out.
          // This is a fallback, the primary check is in signInWithGoogle.
          firebaseSignOut(auth).then(() => setUser(null));
        }
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
        await firebaseSignOut(auth); // Sign out if email is not available
        throw new Error("Could not retrieve user email from Google Sign-In.");
      }

      if (!AUTHORIZED_AGENT_EMAILS.includes(signedInUser.email)) {
        await firebaseSignOut(auth); // Sign out non-authorized user
        throw new Error("Access denied. This portal is for authorized agents only.");
      }
      
      // User is authorized, setUser will be handled by onAuthStateChanged
      // but we can return the user for immediate use by the caller if needed.
      // setLoading(false) will also be handled by onAuthStateChanged
      return signedInUser; 
    } catch (error: any) {
      setLoading(false);
      // Sign out in case of any other error during the process before authorization check
      if (auth.currentUser && (!AUTHORIZED_AGENT_EMAILS.includes(auth.currentUser.email || ''))) {
         await firebaseSignOut(auth);
      }
      console.error("Google Sign-In Error:", error);
      throw error; // Re-throw error to be caught by the caller
    }
    // setLoading(false) is handled by onAuthStateChanged or error handler
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

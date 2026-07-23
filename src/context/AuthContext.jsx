import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
} from "firebase/auth";

import { auth } from "../firebase";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Check if user is admin (you can modify this logic)
        const isAdmin = currentUser.email === "emmyng7@gmail.com"; // Example check
        
        setUser({
          uid: currentUser.uid,
          name: currentUser.displayName || "",
          email: currentUser.email,
          photo: currentUser.photoURL || "",
          isAdmin: isAdmin, // Add admin flag
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Register
  async function register(name, email, password) {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await firebaseUpdateProfile(result.user, {
        displayName: name,
      });

      return {
        success: true,
        message: "Account created successfully.",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  // Login
  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  // Logout
  async function logout() {
    await signOut(auth);
  }

  // Update profile
  async function updateProfile(updatedData) {
    try {
      if (!auth.currentUser) return;

      await firebaseUpdateProfile(auth.currentUser, {
        displayName: updatedData.name,
        photoURL: updatedData.photo || "",
      });

      setUser({
        uid: auth.currentUser.uid,
        name: updatedData.name,
        email: auth.currentUser.email,
        photo: updatedData.photo || "",
        phone: updatedData.phone || "",
        country: updatedData.country || "",
        address: updatedData.address || "",
        isAdmin: user?.isAdmin || false, // Preserve admin status
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
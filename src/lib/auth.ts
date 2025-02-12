import toast from "react-hot-toast";
import { supabase } from "./supabase"; // ✅ Import the Supabase client

// Sign in with Google
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    toast.error("Google Sign-In Error:");
    console.log("Google Sign-In Error:", error);
  }

  return data;
};

// Sign out function
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    toast.error("Sign-out error:");
    console.log("Sign-out error:", error);
  }
};

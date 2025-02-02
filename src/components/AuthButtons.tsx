"use client";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";

const AuthButtons = () => {
  const { user } = useUser();

  return (
    <div>
      {user ? (
        <SignOutButton>
          <button className="bg-red-500 text-white p-2 rounded">
            Sign Out
          </button>
        </SignOutButton>
      ) : (
        <SignInButton mode="modal">
          <button className="bg-blue-500 text-white p-2 rounded">
            Sign In
          </button>
        </SignInButton>
      )}
    </div>
  );
};

export default AuthButtons;

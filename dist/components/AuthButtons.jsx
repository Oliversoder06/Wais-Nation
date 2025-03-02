"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const nextjs_1 = require("@clerk/nextjs");
const AuthButtons = () => {
    const { user } = (0, nextjs_1.useUser)();
    return (<div>
      {user ? (<nextjs_1.SignOutButton>
          <button className="bg-red-500 text-white p-2 rounded">
            Sign Out
          </button>
        </nextjs_1.SignOutButton>) : (<nextjs_1.SignInButton mode="modal">
          <button className="bg-blue-500 text-white p-2 rounded">
            Sign In
          </button>
        </nextjs_1.SignInButton>)}
    </div>);
};
exports.default = AuthButtons;

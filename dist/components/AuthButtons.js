"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const nextjs_1 = require("@clerk/nextjs");
const AuthButtons = () => {
    const { user } = (0, nextjs_1.useUser)();
    return ((0, jsx_runtime_1.jsx)("div", { children: user ? ((0, jsx_runtime_1.jsx)(nextjs_1.SignOutButton, { children: (0, jsx_runtime_1.jsx)("button", { className: "bg-red-500 text-white p-2 rounded", children: "Sign Out" }) })) : ((0, jsx_runtime_1.jsx)(nextjs_1.SignInButton, { mode: "modal", children: (0, jsx_runtime_1.jsx)("button", { className: "bg-blue-500 text-white p-2 rounded", children: "Sign In" }) })) }));
};
exports.default = AuthButtons;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signInWithGoogle = void 0;
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const supabase_1 = require("./supabase"); // ✅ Import the Supabase client
// Sign in with Google
const signInWithGoogle = async () => {
    const { data, error } = await supabase_1.supabase.auth.signInWithOAuth({
        provider: "google",
    });
    if (error) {
        react_hot_toast_1.default.error("Google Sign-In Error:");
    }
    return data;
};
exports.signInWithGoogle = signInWithGoogle;
// Sign out function
const signOut = async () => {
    const { error } = await supabase_1.supabase.auth.signOut();
    if (error) {
        react_hot_toast_1.default.error("Sign-out error:");
    }
};
exports.signOut = signOut;

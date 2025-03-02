"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const supabase_1 = require("@/lib/supabase");
async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    // Fetch playlists from Supabase
    const { data, error } = await supabase_1.supabase.from("playlists").select("*");
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(data);
}

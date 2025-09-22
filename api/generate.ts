import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const apiKey = process.env.GEMINI_API_KEY; // 🔑 haetaan Vercel envistä

        if (!apiKey) {
            return res.status(500).json({ error: "API key is missing" });
        }

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                contents: [
                    {
                        parts: [{ text: "Hello from Vercel function!" }],
                    },
                ],
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        res.status(200).json(response.data);
    } catch (error: any) {
        console.error("Gemini API error:", error.message);
        res.status(500).json({ error: "Failed to call Gemini API" });
    }
}

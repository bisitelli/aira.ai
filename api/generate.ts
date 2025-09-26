// /api/generate.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
    result?: string;
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { symptoms, imageBase64 } = req.body;

    if (!symptoms || !imageBase64) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    try {
        // Käytetään Vercel env-muuttujaa
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "Missing API key" });
        }

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `Analyze this image and return GOOD/BAD/NEUTRAL for symptoms.`
                            },
                            {
                                inline_data: {
                                    mime_type: "image/jpeg",
                                    data: imageBase64,
                                },
                            },
                        ],
                    },
                ],
            },
            { headers: { "Content-Type": "application/json" } }
        );

        const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        res.status(200).json({ result: aiText });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "AI request failed" });
    }
}

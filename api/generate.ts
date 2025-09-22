// /api/generate.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { symptoms, imageBase64 } = req.body;

    if (!symptoms || !imageBase64) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `You are a nutrition therapist.
1. Identify the food in this image (be specific, include main ingredients and preparation if possible).
2. Analyze whether this food is GOOD, BAD, or NEUTRAL for the user's selected symptoms: ${symptoms.join(", ")}.
3. Explain in 2–4 sentences why it may be good or bad, using clear, patient-friendly language. Mention known triggers.
4. If relevant, add other typical digestive symptoms this food might cause.
5. Give a practical suggestion.

Return plain text only.`
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

        // Palauta vain teksti frontille
        res.status(200).json({ result: aiText });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "AI request failed" });
    }
}

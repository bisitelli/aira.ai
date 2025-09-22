import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import 'dotenv/config';

export default function FoodCameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [result, setResult] = useState<{ status: "good" | "bad"; text: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [symptoms, setSymptoms] = useState<string[]>([]);

    const cameraRef = useRef<CameraView | null>(null);

    // ✅ Lataa symptomit
    useEffect(() => {
        const loadSymptoms = async () => {
            const stored = await AsyncStorage.getItem("userSymptoms");
            if (stored) {
                setSymptoms(JSON.parse(stored));
            }
        };
        loadSymptoms();
    }, []);

    // ✅ Kysy lupa jos ei ole
    if (!permission) {
        return <View />;
    }
    if (!permission.granted) {
        return (
            <View style={styles.center}>
                <Text>We need your permission to show the camera</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.retryButton}>
                    <Text style={styles.retryText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const takePhoto = async () => {
        if (!cameraRef.current) return;
        const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.7 });

        if (photo.base64) {
            analyzeFood(photo.base64);
        }
    };

    const analyzeFood = async (base64: string) => {
        try {
            setLoading(true);
            setResult(null);

            const response = await axios.post(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}",
                {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `You are a nutrition therapist.
1. Identify the food in this image (be specific, include main ingredients and preparation if possible).
2. Analyze whether this food is GOOD, BAD, or NEUTRAL for the user's selected symptoms: ${symptoms.join(", ")}.
3. Explain in 2–4 sentences why it may be good or bad, using clear, patient-friendly language. Mention known triggers (e.g. fat, spice, lactose, caffeine, FODMAPs).  
4. If relevant, add other typical digestive symptoms this food might cause, even if the user didn’t select them.
5. Give a practical suggestion (e.g. portion control, alternative preparation, or substitution).

Return the response strictly in this JSON format:
{
    "[identified food]"
    "[short explanation]",
    Tip: [optional suggestion or alternative]

    Do not use JSON, do not include braces {}, do not use markdown or code formatting. Return plain text only.
}`
                                },
                                {
                                    inline_data: {
                                        mime_type: "image/jpeg",
                                        data: base64,
                                    },
                                },
                            ],
                        },
                    ],
                },
                { headers: { "Content-Type": "application/json" } }
            );

            const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

            // Määritetään status
            let status: "good" | "bad" = "bad";
            const lower = aiText.toLowerCase();
            if (lower.includes("good")) status = "good";
            else if (lower.includes("bad")) status = "bad";

            // Poistetaan ensimmäinen good/bad selityksestä
            const cleanedText = aiText.replace(/^(good|bad)[\s,:.-]*/i, "").trim();

            setResult({ status, text: cleanedText });
        } catch (err) {
            console.error(err);
            setResult({ status: "bad", text: "Error analyzing food." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <CameraView style={{ flex: 1 }} facing="back" ref={cameraRef} />
            <View>
                {!loading && (
                    <TouchableOpacity onPress={takePhoto} style={styles.captureButton} />
                )}
            </View>

            {result && (
                <View
                    style={[
                        styles.resultBox,
                        result.status === "good" ? styles.goodBox : styles.badBox,
                    ]}
                >
                    <Text style={styles.resultTitle}>
                        {result.status === "good" ? "GOOD ✅" : "BAD ❌"}
                    </Text>
                    <Text style={styles.resultText}>{result.text}</Text>



                    <TouchableOpacity
                        onPress={() => setResult(null)}
                        style={styles.retryButton}
                    >
                        <Text style={styles.retryText}>🔄 Take Another Photo</Text>
                    </TouchableOpacity>
                </View>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    captureButton: {
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#fff",
        borderWidth: 3,
        borderColor: "#000",
    },
    resultBox: {
        position: "absolute",
        bottom: 120,
        left: 20,
        right: 20,
        padding: 15,
        borderRadius: 10,
        zIndex: 10,
    },
    goodBox: {
        borderColor: "green",
        borderWidth: 3,
        backgroundColor: "rgba(0,255,0,0.2)",
    },
    badBox: {
        borderColor: "red",
        borderWidth: 3,
        backgroundColor: "rgba(255,0,0,0.2)",
    },
    resultTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
        textAlign: "center",
    },
    resultText: {
        fontSize: 16,
        textAlign: "center",
    },
    retryButton: {
        marginTop: 10,
        backgroundColor: "#000",
        padding: 10,
        borderRadius: 8,
    },
    retryText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "600",
    },
});

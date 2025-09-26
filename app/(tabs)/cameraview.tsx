import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function FoodCameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [result, setResult] = useState<{ status: "good" | "bad"; text: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [symptoms, setSymptoms] = useState<string[]>([]);

    const cameraRef = useRef<CameraView | null>(null);

    const router = useRouter();

    const closeCamera = () => {
        router.push("/"); // navigoi rootiin tai haluamaasi tab-screeniin
    };

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
        const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.5 });

        if (photo.base64) {
            analyzeFood(photo.base64);
        }
    };

    const analyzeFood = async (base64: string) => {
        try {
            setLoading(true);
            setResult(null);

            const response = await axios.post("https://aira-ai-red.vercel.app/api/generate", {
                symptoms,
                imageBase64: base64,
            });

            const aiText = response.data.result || "";

            let status: "good" | "bad" = "bad";
            const lower = aiText.toLowerCase();
            if (lower.includes("good")) status = "good";
            else if (lower.includes("bad")) status = "bad";

            const cleanedText = aiText.replace(/^(good|bad)[\s,:.-]*/i, "").trim();
            setResult({ status, text: cleanedText });
        } catch (err: any) {
            console.error("❌ Axios error:");
            console.error("Status:", err.response?.status);
            console.error("Data:", err.response?.data);
            console.error("Message:", err.message);

            setResult({ status: "bad", text: "Error analyzing food." });
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={{ flex: 1 }}>

            {/* Close button */}
            <TouchableOpacity
                onPress={closeCamera}
                style={{
                    position: "absolute",
                    top: 50,
                    left: 20,
                    zIndex: 10,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    padding: 10,
                    borderRadius: 20,
                }}
            >
                <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>

            <CameraView style={{ flex: 1, zIndex: 0, }} facing="back" ref={cameraRef} />
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
        bottom: 30,
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

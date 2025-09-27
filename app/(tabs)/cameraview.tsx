import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import FoodResultCard from "../components/foodResultCard";

export default function FoodCameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [result, setResult] = useState<{
        name: string;
        healthScore: number;
        macros: { protein: string; carbs: string; fat: string };
        issues: string[];
        calories?: string;
        description?: string;
    } | null>(null);
    const [loading, setLoading] = useState(false);
    const [symptoms, setSymptoms] = useState<string[]>([]);

    const cameraRef = useRef<CameraView | null>(null);
    const router = useRouter();

    // Lataa symptomit AsyncStoragesta
    useEffect(() => {
        const loadSymptoms = async () => {
            const stored = await AsyncStorage.getItem("userSymptoms");
            if (stored) setSymptoms(JSON.parse(stored));
        };
        loadSymptoms();
    }, []);

    // Tarkista kameran lupa
    if (!permission) return <View />;
    if (!permission.granted) {
        return (
            <View style={styles.center}>
                <Text>Camera permission is required</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.retryButton}>
                    <Text style={styles.retryText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const takePhoto = async () => {
        if (!cameraRef.current) return;
        const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.3 });
        if (photo.base64) analyzeFood(photo.base64);
    };

    const analyzeFood = async (base64: string) => {
        try {
            setLoading(true);
            setResult(null);

            const response = await axios.post("https://aira-ai-red.vercel.app/api/generate", {
                symptoms,
                imageBase64: base64,
            });

            const aiData = response.data.result;

            const parsedResult = {
                name: aiData.name || "Unknown Food",
                healthScore: aiData.healthScore || 50,
                macros: aiData.macros || { protein: "0g", carbs: "0g", fat: "0g" },
                issues: aiData.issues || [],
                calories: aiData.calories || "0 kcal",
                description: aiData.description || "",
            };

            setResult(parsedResult);
        } catch (err: any) {
            console.error("Axios error:", err.message);
            setResult({
                name: "Unknown Food",
                healthScore: 0,
                macros: { protein: "0g", carbs: "0g", fat: "0g" },
                issues: [],
                calories: "0 kcal",
                description: "Error analyzing food",
            });
        } finally {
            setLoading(false);
        }
    };

    const closeCamera = () => router.push("/"); // Palaa root screenille

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

            {/* Kamera koko näytöllä */}
            <CameraView style={{ flex: 1 }} ref={cameraRef} facing="back" />

            {/* Capture button */}
            {!loading && !result && (
                <TouchableOpacity onPress={takePhoto} style={styles.captureButton} />
            )}

            {/* Loading indicator */}
            {loading && <ActivityIndicator size="large" style={styles.loading} />}

            {/* Result card */}
            {result && <FoodResultCard result={result} onClose={() => setResult(null)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    retryButton: { marginTop: 10, backgroundColor: "#000", padding: 10, borderRadius: 8 },
    retryText: { color: "#fff", textAlign: "center", fontWeight: "600" },
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
    loading: { position: "absolute", bottom: 50, alignSelf: "center", justifyContent: "center" },
});

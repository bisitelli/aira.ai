import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FoodResult {
    name: string;
    healthScore: number; // 0-100
    macros: {
        protein: string;
        carbs: string;
        fat: string;
    };
    issues: string[];
}

export default function FoodResultCard({
    result,
    onClose,
}: {
    result: FoodResult | null;
    onClose: () => void;
}) {
    if (!result) return null;

    return (
        <View style={styles.overlay}>
            <View style={styles.card}>
                {/* Food name */}
                <Text style={styles.title}>{result.name}</Text>

                {/* Health score */}
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>Health Score: {result.healthScore}/100</Text>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progress,
                                { width: `${result.healthScore}%`, backgroundColor: getScoreColor(result.healthScore) },
                            ]}
                        />
                    </View>
                </View>

                {/* Macros */}
                <View style={styles.macroRow}>
                    <Text style={styles.macro}>🍗 Protein: {result.macros.protein}</Text>
                    <Text style={styles.macro}>🍞 Carbs: {result.macros.carbs}</Text>
                    <Text style={styles.macro}>🥑 Fat: {result.macros.fat}</Text>
                </View>

                {/* Issues */}
                {result.issues.length > 0 && (
                    <View style={styles.issues}>
                        <Text style={styles.issuesTitle}>⚠️ Possible Issues:</Text>
                        <Text style={styles.issuesText}>{result.issues.join(", ")}</Text>
                    </View>
                )}

                {/* Retry button */}
                <TouchableOpacity onPress={onClose} style={styles.retryButton}>
                    <Ionicons name="refresh-outline" size={20} color="#fff" />
                    <Text style={styles.retryText}> Take Another Photo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const getScoreColor = (score: number) => {
    if (score > 70) return "green";
    if (score > 40) return "orange";
    return "red";
};

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    card: {
        width: "100%",
        backgroundColor: "#000",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -3 },
        shadowRadius: 5,
        elevation: 5,
    },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 12, color: "#fff" },
    scoreContainer: { marginBottom: 12, color: "#fff" },
    scoreText: { fontSize: 16, marginBottom: 6, color: "#fff" },
    progressBar: {
        width: "100%",
        height: 10,
        backgroundColor: "#eee",
        borderRadius: 5,
        overflow: "hidden",
    },
    progress: { height: "100%", borderRadius: 5 },
    macroRow: { flexDirection: "column", marginBottom: 12 },
    macro: { fontSize: 14, marginVertical: 2, color: "#fff" },
    issues: { marginBottom: 16 },
    issuesTitle: { fontWeight: "bold", marginBottom: 4, color: "fff" },
    issuesText: { fontSize: 14, color: "#fff" },
    retryButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        backgroundColor: "#ffa500",
        borderRadius: 10,
    },
    retryText: { color: "#fff", fontWeight: "600" },
});

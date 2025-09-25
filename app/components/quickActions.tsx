// components/QuickActions.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface QuickActionsProps {
    onPressAction?: (type: "Meal" | "Water" | "Symptoms" | "Exercise") => void;
}

export default function QuickActions({ onPressAction }: QuickActionsProps) {
    const handlePress = (type: "Meal" | "Water" | "Symptoms" | "Exercise") => {
        if (onPressAction) onPressAction(type);
        console.log(`Add new ${type}`);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => handlePress("Meal")}>
                <Ionicons name="restaurant-outline" size={28} color="#1E90FF" />
                <Text style={styles.label}>Meal</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => handlePress("Water")}>
                <Ionicons name="water-outline" size={28} color="#1E90FF" />
                <Text style={styles.label}>Water</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => handlePress("Symptoms")}>
                <Ionicons name="pulse-outline" size={28} color="#1E90FF" />
                <Text style={styles.label}>Symptoms</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 14,
        marginBottom: 30,
    },
    button: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: 12,
        marginHorizontal: 4,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        color: "#000",
        marginTop: 4,
        fontWeight: "600",
        fontSize: 14,
    },
});

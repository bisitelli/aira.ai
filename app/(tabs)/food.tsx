import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FoodEntry = {
    id: string;
    meal: string;
    notes?: string;
    timestamp: string;
};

export default function FoodScreen() {
    const [meal, setMeal] = useState("");
    const [notes, setNotes] = useState("");
    const [foodLog, setFoodLog] = useState<FoodEntry[]>([]);

    // Lataa tallennetut ruokamerkinnät
    useEffect(() => {
        const loadFood = async () => {
            const stored = await AsyncStorage.getItem("foodLog");
            if (stored) {
                setFoodLog(JSON.parse(stored));
            }
        };
        loadFood();
    }, []);

    // Tallenna merkinnät aina kun foodLog päivittyy
    useEffect(() => {
        AsyncStorage.setItem("foodLog", JSON.stringify(foodLog));
    }, [foodLog]);

    const addFoodEntry = () => {
        if (!meal.trim()) return;

        const newEntry: FoodEntry = {
            id: Date.now().toString(),
            meal,
            notes,
            timestamp: new Date().toLocaleString(),
        };

        setFoodLog([newEntry, ...foodLog]);
        setMeal("");
        setNotes("");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Food Log</Text>

            <TextInput
                style={styles.input}
                placeholder="What did you eat?"
                value={meal}
                onChangeText={setMeal}
            />
            <TextInput
                style={styles.input}
                placeholder="Notes (optional)"
                value={notes}
                onChangeText={setNotes}
            />

            <Button title="Add Meal" onPress={addFoodEntry} />

            <FlatList
                data={foodLog}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.entry}>
                        <Text style={styles.meal}>{item.meal}</Text>
                        {item.notes ? <Text style={styles.notes}>{item.notes}</Text> : null}
                        <Text style={styles.timestamp}>{item.timestamp}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={{ marginTop: 20 }}>No meals logged yet.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20, paddingTop: 100 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    entry: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    meal: { fontSize: 18, fontWeight: "600" },
    notes: { fontSize: 14, fontStyle: "italic", marginTop: 4 },
    timestamp: { fontSize: 12, color: "#888", marginTop: 4 },
});

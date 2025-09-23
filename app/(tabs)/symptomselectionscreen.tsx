import React, { use, useState } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const SYMPTOMS = ["Bloating", "Abdominal pain", "Nausea", "Reflux/heartburn", "Stool"];

export default function SymptomSelectionScreen({ navigation }: any) {
    const [selected, setSelected] = useState<string[]>([]);
    const router = useRouter();

    const toggleSymptom = (symptom: string) => {
        if (selected.includes(symptom)) {
            setSelected(selected.filter(s => s !== symptom));
        } else {
            setSelected([...selected, symptom]);
        }
    };

    const saveAndContinue = async () => {
        try {
            await AsyncStorage.setItem("userSymptoms", JSON.stringify(selected));
            router.push("/cameraview");
        } catch (error) {
            console.error("Error saving symptoms", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Which symptoms do you want to track?</Text>
            {SYMPTOMS.map(symptom => (
                <TouchableOpacity
                    key={symptom}
                    style={[styles.option, selected.includes(symptom) && styles.optionSelected]}
                    onPress={() => toggleSymptom(symptom)}
                >
                    <Text style={styles.optionText}>{symptom}</Text>
                </TouchableOpacity>
            ))}

            <Button title="Continue →" onPress={saveAndContinue} disabled={selected.length === 0} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "left" },
    option: {
        padding: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginBottom: 10,
    },
    optionSelected: {
        backgroundColor: "#a1c4fd",
        borderColor: "#5a91f7",
    },
    optionText: { fontSize: 16 },
});

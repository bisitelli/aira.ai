import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect } from "react";

type Insight = {
    id: string;
    title: string;
    description: string;
};

export default function AIInsightsScreen() {
    const [insights, setInsights] = useState<Insight[]>([]);

    // Placeholder data, myöhemmin voit hakea AI:n kautta
    useEffect(() => {
        setInsights([
            { id: "1", title: "Title1", description: "Lorem lipsum" },
            { id: "2", title: "Title2", description: "Lorem lipsum" },
            { id: "3", title: "Title3", description: "Lorem lipsum" },
        ]);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>AI Insights</Text>

            <FlatList
                data={insights}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>No insights yet</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 100, backgroundColor: "#fff" },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
    card: { padding: 12, borderRadius: 8, backgroundColor: "#f2f2f2", marginBottom: 12 },
    title: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
    description: { fontSize: 14, color: "#555" },
});

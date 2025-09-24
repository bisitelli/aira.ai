import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {

  const user = "Anna";
  const healthScore = 78;
  const shortInsight = "Your digestion is stable today!";
  const summary = {
    meals: "Oatmeal, Salad, Chicken",
    water: "1.5L",
    exercise: "30 mins walk",
  };

  const aiInsights = [
    "Consider adding more fiber to your diet.",
    "Try to reduce sugar intake for better digestion.",
    "Incorporate probiotics for gut health.",
  ];
  return (
    <View style={styles.container}>
      {/* Tervetuloviesti käyttäjälle */}
      <Text style={styles.greeting}>Hello, {user} 👋</Text>

      {/* Päivän lyhyt terveydentila */}
      <View style={styles.healthScoreContainer}>
        <Text style={styles.healthScore}>{healthScore}</Text>
        <Text style={styles.healthScoreLabel}>Health Score</Text>
        <Text style={styles.shortInsight}>{shortInsight}</Text>
      </View>

      {/* Päivän yhteenveto */}
      <View style={styles.summaryContainer}>
        <Text style={styles.sectionHeader}>Today's Summary</Text>
        <View style={styles.summaryColumns}>
          <View style={styles.summaryColumn}>
            <Ionicons name="restaurant-outline" size={24} color="#fff" style={{ marginRight: 8, backgroundColor: "#1E90FF", padding: 10, borderRadius: 50, }} />
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.columnLabel}>Meals</Text>
              <Text style={styles.columnValue}>{summary.meals}</Text>
            </View>
          </View>
          <View style={styles.summaryColumn}>
            <Ionicons name="water-outline" size={24} color="#fff" style={{ marginRight: 8, backgroundColor: "#1E90FF", padding: 10, borderRadius: 50, }} />
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.columnLabel}>Water Intake</Text>
              <Text style={styles.columnValue}>{summary.water}</Text>
            </View>
          </View>
          <View style={styles.summaryColumn}>
            <Ionicons name="bicycle-outline" size={24} color="#fff" style={{ marginRight: 8, backgroundColor: "#1E90FF", padding: 10, borderRadius: 50, }} />
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.columnLabel}>Exercise</Text>
              <Text style={styles.columnValue}>{summary.exercise}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* AI Insights Section */}
      {/* AI Insights */}
      <View style={styles.aiInsightsContainer}>
        <Text style={styles.sectionHeader}>AI Insights</Text>
        {aiInsights.map((insight, idx) => (
          <Text key={idx} style={styles.aiText}>
            • {insight}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 100 },
  greeting: { fontSize: 24, fontWeight: "600", marginBottom: 20 },
  healthScoreContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#e0f7fa",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  healthScore: { fontSize: 48, fontWeight: "700", color: "#00796b" },
  healthScoreLabel: { fontSize: 16, color: "#00796b", marginBottom: 8 },
  shortInsight: { fontSize: 14, color: "#004d40", textAlign: "center" },

  summaryContainer: { marginBottom: 20 },
  sectionHeader: { fontSize: 20, fontWeight: "600", marginBottom: 10 },
  summaryColumns: { flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: 8, },
  summaryColumn: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 12, borderRadius: 8, width: "100%", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2, },
  columnValue: { fontSize: 14, color: "#555" },
  columnLabel: { fontSize: 18, fontWeight: "700", color: "#000" },

  aiInsightsContainer: { marginTop: 10 },
  aiText: { fontSize: 14, color: "#555", marginBottom: 6 },
});

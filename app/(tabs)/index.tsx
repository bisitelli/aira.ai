import { Ionicons } from "@expo/vector-icons";
import {ScrollView, View, Text, StyleSheet } from "react-native";
import QuickActions from "../components/quickActions";
import HealthScoreChart from "../components/healthScoreChart";
import HealthScore from "../components/healthScore";

export default function HomeScreen() {

  const user = "Anna";
  const healthScore = 78;
  const shortInsight = "Your digestion is stable today!";

  const aiInsights = [
    "Consider adding more fiber to your diet.",
    "Try to reduce sugar intake for better digestion.",
    "Incorporate probiotics for gut health.",
  ];
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
    <View style={styles.container}>
      {/* Tervetuloviesti käyttäjälle */}
      <Text style={styles.greeting}>Hi {user} 👋</Text>

      <View>
        <HealthScoreChart />
      </View>

      <View>
        <HealthScore />
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Recent Logs</Text>
      </View>

    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, },
  greeting: { fontSize: 24, fontWeight: "600", marginBottom: 10, color: "#fff" },
  healthScoreContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  scoreBox: { width: 80, height: 80, borderRadius: 12, backgroundColor: "#1E90FF", justifyContent: "center", alignItems: "center", marginRight: 20 },
  scoreInfo: { flex: 1, flexDirection: "column", },
  healthScore: { fontSize: 32, fontWeight: "700", color: "#fff" },
  healthScoreLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  shortInsight: { fontSize: 14, color: "#555" },

  summaryContainer: { marginBottom: 20 },
  summaryTitle: { fontSize: 20, fontWeight: "600", marginBottom: 10, color: "#fff" },
});

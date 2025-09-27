import { View, Text, StyleSheet } from "react-native";

export default function HealthScore() {
    const healthScore = 78;
    const shortInsight = "Your digestion is stable today!";

    return (
        <View style={styles.container}>
            <View style={styles.scoreBox}>
                <Text style={styles.healthScore}>{healthScore}</Text>
            </View>
            <View style={styles.scoreInfo}>
                <Text style={styles.healthScoreLabel}>Health Score</Text>
                <Text style={styles.shortInsight}>{shortInsight}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2c2c2c",
        padding: 16,
        borderRadius: 12,
        marginVertical: 20,
    },
    scoreBox: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#ffa500",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    healthScore: {
        fontSize: 24,
        fontWeight: "700",
        color: "#fff",
    },
    scoreInfo: {
        flex: 1,
    },
    healthScoreLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
    shortInsight: {
        fontSize: 14,
        color: "#ccc",
        marginTop: 4,
    },
});
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

// Esimerkkidata: viimeisen 7 päivän health score
const labels = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];
const scores = [72, 55, 80, 65, 90, 40, 77]; // Voit korvata tekoälyn laskemilla arvoilla

export default function HealthScoreChart() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Health Score</Text>
            <View style={styles.chartWrapper}>
            <BarChart
                data={{
                    labels,
                    datasets: [{ data: scores }],
                }}
                width={screenWidth * 0.7}
                height={220}
                fromZero
                showValuesOnTopOfBars
                yAxisLabel=""
                yAxisSuffix=""
                withHorizontalLabels={false}
                withVerticalLabels={true}
                chartConfig={{
                    backgroundColor: "black",
                    backgroundGradientFrom: "black",
                    backgroundGradientTo: "black",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(200,200,200,${opacity})`, // harmaa palkki
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    barPercentage: 0.6,
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 12,
                }}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        padding: 0,
        borderRadius: 12,
        margin: 0,
    },
    title: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
    },
    chartWrapper: {
        alignItems: "center",
        justifyContent: "center",
    },
});

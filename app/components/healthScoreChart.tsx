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
            <Text style={styles.title}>Average Meal Score</Text>
            <Text style={styles.subtitle}>Past 7 days</Text>
            <BarChart
                data={{
                    labels,
                    datasets: [{ data: scores }],
                }}
                width={screenWidth * 0.8} // hieman leveämpi kaavio
                height={220}
                fromZero
                showValuesOnTopOfBars
                yAxisLabel=""
                yAxisSuffix=""
                withInnerLines={false} // poistaa ruudukon
                withHorizontalLabels={true} // näyttää päivät palkkien alla
                withVerticalLabels={true}
                chartConfig={{
                    backgroundColor: "#2c2c2c",
                    backgroundGradientFrom: "#2c2c2c",
                    backgroundGradientTo: "#2c2c2c",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255,165,0,${opacity})`, // oranssi palkki
                    labelColor: (opacity = 1) => `rgba(255,165,0,${opacity})`,
                    paddingRight: 30, // Tila y-akselin arvoille
                    barPercentage: 0.8,
                    
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 12,
                    alignSelf: "center",
                    paddingRight: 1, // Tila y-akselin arvoille
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2c2c2c",
        padding: 0,
        borderRadius: 12,
        margin: 0,
    },
    title: {
        color: "white",
        fontSize: 12,
        fontWeight: "600",
        marginBottom: 8,
        marginLeft: 10,
        marginTop: 8,
    },
    subtitle: {
        color: "white",
        fontSize: 10,
        marginBottom: 4,
        marginLeft: 10,
        alignItems: "flex-end",
    },
});

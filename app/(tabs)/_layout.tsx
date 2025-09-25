import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet } from "react-native";



export default function TabsLayout() {
    return <Tabs
        screenOptions={{
            tabBarActiveTintColor: "#1E90FF",
            headerShown: false,
        }}
    >
        <Tabs.Screen name="index"
            options={{
                title: "Home",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" color={color} size={size} />
                )
            }} />
        <Tabs.Screen name="food"
            options={{
                title: "Food Log",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="book-outline" color={color} size={size} />
                )
            }} />
        <Tabs.Screen
                name="cameraview"
                options={{
                    title: "",
                    tabBarIcon: () => null, // Ei perusikonia
                    tabBarButton: (props) => {
                        // Poista kaikki null-arvoiset propsit
                        const safeProps = Object.fromEntries(
                            Object.entries(props).filter(([_, value]) => value !== null)
                        );

                        return (
                            <TouchableOpacity {...safeProps} style={styles.fabButton}>
                                <View style={styles.fabCircle}>
                                    <Ionicons name="scan" color="#fff" size={32} />
                                </View>
                            </TouchableOpacity>
                        );
                    },
                }}
            />
        <Tabs.Screen name="symptomselectionscreen"
            options={{
                title: "Symptoms",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="medkit-outline" color={color} size={size} />
                )
            }} />
        <Tabs.Screen name="insights"
            options={{
                title: "AI Insights",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="bulb" color={color} size={size} />
                )
            }} />
    </Tabs>;
}

const styles = StyleSheet.create({
    fabButton: {
        top: -20, // nostaa painiketta ylöspäin tab barin yläpuolelle
        justifyContent: "center",
        alignItems: "center",
    },
    fabCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#1E90FF",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
});

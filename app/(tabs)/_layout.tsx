import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";


export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#fff",
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    backgroundColor: "transparent", // make it transparent
                    borderTopWidth: 0,
                    elevation: 0, // remove Android shadow
                },
                tabBarBackground: () => (
                    <BlurView
                        tint="dark" // "light" | "dark" | "default"
                        intensity={70} // blur strength
                        style={{ flex: 1 }}
                    />
                ),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="apps-sharp" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="food"
                options={{
                    title: "",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar-sharp" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cameraview"
                options={{
                    title: "",
                    tabBarStyle: { display: "none" },
                    tabBarIcon: () => null,
                    tabBarButton: (props) => {
                        const safeProps = Object.fromEntries(
                            Object.entries(props).filter(([_, value]) => value !== null)
                        );

                        return (
                            <TouchableOpacity {...safeProps} style={styles.fabButton}>
                                <View style={styles.fabCircle}>
                                    <Ionicons name="scan" color="#000" size={32} />
                                </View>
                            </TouchableOpacity>
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="symptomselectionscreen"
                options={{
                    title: "",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book-sharp" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="insights"
                options={{
                    title: "",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="sparkles-sharp" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    fabButton: {
        top: -20,
        justifyContent: "center",
        alignItems: "center",
    },
    fabCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
});

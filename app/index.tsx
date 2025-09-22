import { Link } from "expo-router";
import { Text, View ,StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello expo</Text>
      <Link href="/symptomselectionscreen" style={styles.button}>Go to Consent Screen</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  text: {
    color: "#ffffff",
    fontSize: 20,
  },
  button: {
    fontSize: 18,
    textDecorationLine: "underline",
    color: "#1E90FF",
  }
});

import { Text, View, StyleSheet } from "react-native";

export default function IdeaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Idea</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    // alignItems: "center",
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
});

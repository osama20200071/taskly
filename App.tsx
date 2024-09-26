import { StyleSheet, View } from "react-native";
import { theme } from "./theme";
import ListItem from "./components/ListItem";

const items = ["Coffee", "Tea", "Milk"];

export default function App() {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <ListItem key={item} name={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: "flex-start",
    marginTop: 50,
  },
});

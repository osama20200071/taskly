import {
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  View,
  PixelRatio,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "../theme";
import { useState } from "react";

export default function ListItem({ name }: { name: string }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const deleteHandler = () => {
    Alert.alert(
      `Are you sure you want to delete ${name} ?`,
      "It will be gone for good",
      [
        {
          text: "yes",
          onPress: DeletingHandler,
          style: "destructive",
        },
        {
          text: "no",
          onPress: CancelHandler,
          style: "cancel",
        },
      ],
    );
  };

  const DeletingHandler = () => {
    console.log("deleting");
    setIsCompleted(true);
  };

  const CancelHandler = () => {
    setIsCompleted(false);
  };

  return (
    <View
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
    >
      <Text
        style={[
          styles.itemText,
          isCompleted ? styles.completedText : undefined,
        ]}
      >
        {PixelRatio.get()} {name}
      </Text>
      <TouchableOpacity onPress={deleteHandler} activeOpacity={0.4}>
        <AntDesign
          name="closecircle"
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorRed}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomColor: theme.colorCerulean,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
  },

  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorGrey,
    borderBottomWidth: 0.5,
  },

  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
    color: theme.colorGrey,
  },
});

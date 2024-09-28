import {
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "../theme";

type ListItemProps = {
  name: string;
  isCompleted: boolean;
  onDelete: () => void;
  onToggle: () => void;
};

export default function ListItem({
  name,
  onDelete,
  isCompleted,
  onToggle,
}: ListItemProps) {
  const deleteHandler = () => {
    Alert.alert(
      `Are you sure you want to delete ${name} ?`,
      "It will be gone for good",
      [
        {
          text: "yes",
          onPress: onDelete,
          style: "destructive",
        },
        {
          text: "no",
          onPress: () => {
            console.log("cancelled");
          },
          style: "cancel",
        },
      ],
    );
  };

  return (
    <Pressable
      onPress={onToggle}
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
    >
      <Text
        // numberOfLines={1}
        style={[
          styles.itemText,
          isCompleted ? styles.completedText : undefined,
        ]}
      >
        {name}
      </Text>
      <TouchableOpacity onPress={deleteHandler} activeOpacity={0.4}>
        <AntDesign
          name="closecircle"
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorRed}
        />
      </TouchableOpacity>
    </Pressable>
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
    flex: 1, // to make the text take up the available space
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

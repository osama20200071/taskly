import { StyleSheet, TextInput, ScrollView } from "react-native";
import { theme } from "../theme";
import ListItem from "../components/ListItem";
import { useState } from "react";

type shoppingItemType = {
  id: string;
  name: string;
  isCompleted: boolean;
};

const initialShoppingList: shoppingItemType[] = [
  { id: "1", name: "Coffee", isCompleted: false },
  { id: "2", name: "Tea", isCompleted: false },
  { id: "3", name: "Milk", isCompleted: false },
];

export default function App() {
  const [shoppingList, setShoppingList] =
    useState<shoppingItemType[]>(initialShoppingList);
  const [value, setValue] = useState("");

  const addShoppingListItemHandler = () => {
    if (value === "") return;
    const newItem = {
      id: new Date().getTime().toString(),
      name: value,
      isCompleted: false,
    };
    setShoppingList([newItem, ...shoppingList]);
    setValue("");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
    >
      <TextInput
        style={styles.textInput}
        placeholder="E.g. Coffe"
        returnKeyType="done"
        value={value}
        onChangeText={setValue}
        onSubmitEditing={addShoppingListItemHandler}
      />
      {shoppingList.map((item) => (
        <ListItem key={item.id} name={item.name} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    padding: 12,
    // justifyContent: "center",
  },
  contentContainer: {
    paddingBottom: 12,
  },

  textInput: {
    padding: 10,
    borderColor: theme.colorLightGrey,
    borderWidth: 1.4,
    marginHorizontal: 12,
    borderRadius: 50,
    marginBottom: 12,
    fontSize: 18,
    backgroundColor: theme.colorWhite,
  },
});

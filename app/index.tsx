import {
  StyleSheet,
  TextInput,
  FlatList,
  View,
  Text,
  LayoutAnimation,
} from "react-native";
import { theme } from "../theme";
import ListItem from "../components/ListItem";
import { useEffect, useState } from "react";
import { orderShoppingList, shoppingItemType } from "../utils";
import { getFromStorage, saveToStorage } from "../storage";

const storageKey = "shopping-list";

const animate = () => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

export default function App() {
  const [shoppingList, setShoppingList] = useState<shoppingItemType[]>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFromStorage(storageKey);

      if (data) {
        // animate();
        setShoppingList(data);
      }
    };

    fetchData();
  }, []);

  const submitHandler = () => {
    if (value === "") return;
    const newItem = {
      id: new Date().getTime().toString(),
      name: value,
      lastUpdatedTimestamp: Date.now(),
    };
    const newList = [newItem, ...shoppingList];
    animate();
    setShoppingList(newList);
    saveToStorage(storageKey, newList);
    setValue("");
  };

  const deleteHandler = (id: string) => {
    const updatedList = shoppingList.filter((item) => item.id !== id);
    animate();
    setShoppingList(updatedList);
    saveToStorage(storageKey, updatedList);
  };

  const toggleHandler = (id: string) => {
    const updatedList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          lastUpdatedTimestamp: Date.now(),
          completedAtTimestamp: item.completedAtTimestamp
            ? undefined
            : Date.now(),
        };
      }
      return item;
    });

    animate();
    setShoppingList(updatedList);
    saveToStorage(storageKey, updatedList);
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      data={orderShoppingList(shoppingList)}
      renderItem={({ item }) => (
        <ListItem
          name={item.name}
          isCompleted={Boolean(item.completedAtTimestamp)}
          onDelete={() => deleteHandler(item.id)}
          onToggle={() => toggleHandler(item.id)}
        />
      )}
      ListEmptyComponent={
        <View style={styles.emptyList}>
          <Text style={styles.emptyListText}>Your List is empty</Text>
        </View>
      }
      ListHeaderComponent={
        <TextInput
          style={styles.textInput}
          placeholder="E.g. Coffe"
          returnKeyType="done"
          value={value}
          onChangeText={setValue}
          onSubmitEditing={submitHandler}
        />
      }
    />
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

  emptyList: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  emptyListText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

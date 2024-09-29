import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import { getFromStorage } from "../../storage";
import { countDownStorageKey, PersistedCountDownState } from ".";
import { format } from "date-fns";
import { theme } from "../../theme";

const fullDateFormat = `LLL d yyyy, h:mm aaa`;
export default function HistoryScreen() {
  const [countDownState, setCountDownState] = useState<PersistedCountDownState>(
    { completedAtTimestamps: [], currentNotificationId: undefined },
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = (await getFromStorage(
        countDownStorageKey,
      )) as PersistedCountDownState;
      setCountDownState(result);
    };

    fetchData();
  }, []);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      data={countDownState?.completedAtTimestamps}
      renderItem={({ item }) => (
        <Pressable>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>
              {format(item, fullDateFormat)}
            </Text>
          </View>
        </Pressable>
      )}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    marginTop: 8,
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
  listItem: {
    marginHorizontal: 8,
    marginBottom: 8,
    alignItems: "center",
    backgroundColor: theme.colorLightGrey,
    padding: 12,
    borderRadius: 6,
  },
  listItemText: {
    fontSize: 16,
  },
});

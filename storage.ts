import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getFromStorage(key: string) {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    return null;
  }
}

export async function saveToStorage(key: string, data: object) {
  const stringifiedData = JSON.stringify(data);
  await AsyncStorage.setItem(key, stringifiedData);
}

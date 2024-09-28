import { Text, View, StyleSheet, Alert } from "react-native";
import Button from "../../components/Button";
import { registerForPushNotificationsAsync } from "../../registerForPushNotificationsAsync";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export default function CounterScreen() {
  const scheduleNotification = async () => {
    const result = await registerForPushNotificationsAsync();
    console.log(result);

    if (result === "granted") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Hello",
          body: "I'm a scheduled notification",
        },
        trigger: {
          seconds: 5,
        },
      });
    } else {
      if (Device.isDevice) {
        Alert.alert(
          "Permission Denied",
          "You need to enable notifications in your settings",
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button onClick={scheduleNotification}>Rqs for Permission</Button>
      <Text style={styles.text}>Counter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
});

import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      showBadge: false,
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    // only request permission it was never requested before
    if (existingStatus !== "granted") {
      // this prompt only shows up if the permission status is undetermined
      // this triggers the native alert for permission to show up
      // calling this function will do nothing if the permission is already granted or denied
      const { status } = await Notifications.requestPermissionsAsync();
      return status;
    } else {
      return existingStatus;
    }
  } else {
    return null;
  }
}

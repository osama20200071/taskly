import {
  Text,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from "react-native";
import Button from "../../components/Button";
import { registerForPushNotificationsAsync } from "../../registerForPushNotificationsAsync";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Duration, intervalToDuration, isBefore } from "date-fns";
import { TimeSegment } from "../../components/TimeSegment";
import { theme } from "../../theme";
import { getFromStorage, saveToStorage } from "../../storage";
import ConfettiItem from "react-native-confetti-cannon";

// after 10 seconds form the app starts
const frequency = 24 * 60 * 60 * 1000;
export const countDownStorageKey = "taskly-counter";

export type PersistedCountDownState = {
  currentNotificationId: string | undefined;
  completedAtTimestamps: number[];
};

type CountDownStatus = {
  isOver: boolean;
  remainingTime: Duration;
};

export default function CounterScreen() {
  const confettiRef = useRef<any>();
  const { width } = useWindowDimensions();
  const [status, setStatus] = useState<CountDownStatus>();
  const [countDownState, setCountDownState] =
    useState<PersistedCountDownState>();

  const lastCompletedTimestamp = countDownState?.completedAtTimestamps[0];

  useEffect(() => {
    const init = async () => {
      const data = await getFromStorage(countDownStorageKey);
      setCountDownState(data);
    };
    init();
  }, []);

  // so whenever we complete a task we add the timestamp to the completedAtTimestamps
  useEffect(() => {
    const interval = setInterval(() => {
      // if that was completed before we add the frequency else start from now
      const timestamp = lastCompletedTimestamp
        ? lastCompletedTimestamp + frequency
        : Date.now();

      const isOver = isBefore(timestamp, Date.now());
      const remainingTime = intervalToDuration(
        isOver
          ? { start: timestamp, end: Date.now() }
          : { start: Date.now(), end: timestamp },
      );
      setStatus({ isOver, remainingTime });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [lastCompletedTimestamp]);

  const scheduleNotification = async () => {
    let notificationId;
    confettiRef.current.start(); // show the confetti when the task is completed and scheduling a new notification
    const result = await registerForPushNotificationsAsync();
    // console.log(result);
    if (result === "granted") {
      notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Hello",
          body: "Time to wash the car!",
        },
        trigger: {
          seconds: frequency / 1000,
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

    // if there is a scheduled notification we need to cancel it
    if (countDownState?.currentNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        countDownState?.currentNotificationId,
      );
    }
    // if there is no scheduled notification before
    // then we create the new countdown state with this new scheduled notification
    const newCountDownState: PersistedCountDownState = {
      currentNotificationId: notificationId,
      completedAtTimestamps: countDownState?.completedAtTimestamps
        ? [Date.now(), ...countDownState.completedAtTimestamps]
        : [Date.now()],
    };
    setCountDownState(newCountDownState);
    await saveToStorage(countDownStorageKey, newCountDownState);
  };

  return (
    <View
      style={[
        styles.container,
        status?.isOver ? styles.lateContainer : undefined,
      ]}
    >
      {status?.isOver ? (
        <Text style={styles.text}>Car Wash overdue by</Text>
      ) : (
        <Text style={styles.text}>Next Car Wash due in ...</Text>
      )}
      <View style={styles.timerContainer}>
        <TimeSegment unit="Days" number={status?.remainingTime.days ?? 0} />
        <TimeSegment unit="Hours" number={status?.remainingTime.hours ?? 0} />
        <TimeSegment
          unit="Minutes"
          number={status?.remainingTime.minutes ?? 0}
        />
        <TimeSegment
          unit="Seconds"
          number={status?.remainingTime.seconds ?? 0}
        />
      </View>
      <Button onClick={scheduleNotification}>I've washed the Car!</Button>
      <ConfettiItem
        count={50}
        origin={{ x: width / 2, y: -20 }}
        fadeOut
        ref={confettiRef}
        autoStart={false}
      />
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

  lateContainer: {
    backgroundColor: theme.colorRed,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },

  timerContainer: {
    flexDirection: "row",
    marginVertical: 24,
  },
});

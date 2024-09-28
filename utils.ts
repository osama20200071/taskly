import { LayoutAnimation } from "react-native";
import * as Haptics from "expo-haptics";

export type shoppingItemType = {
  id: string;
  name: string;
  // isCompleted: boolean;
  completedAtTimestamp?: number;
  lastUpdatedTimestamp: number;
  // she make it the timestamp when it marked as completed
};

export const initialShoppingList: shoppingItemType[] = [
  { id: "1", name: "Coffee", lastUpdatedTimestamp: Date.now() },
  { id: "2", name: "Tea", lastUpdatedTimestamp: Date.now() },
  { id: "3", name: "Milk", lastUpdatedTimestamp: Date.now() },
];

export function orderShoppingList(shoppingList: shoppingItemType[]) {
  return shoppingList.sort((item1, item2) => {
    if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return item2.completedAtTimestamp - item1.completedAtTimestamp;
    }

    if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return 1;
    }

    if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return -1;
    }

    if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
    }

    return 0;
  });
}

export const animate = () => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

export const sHaptics = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

export const mHaptics = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

export const lHaptics = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
};

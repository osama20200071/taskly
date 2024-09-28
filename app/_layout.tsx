import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { theme } from "../theme";

export default function Layout() {
  return (
    <Tabs
      safeAreaInsets={{ bottom: 10 }}
      screenOptions={{ tabBarActiveTintColor: theme.colorCerulean }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "ShoppingList",
          tabBarIcon: ({ color }) => (
            <Feather name="shopping-bag" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          title: "Counter",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="clockcircleo" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="idea"
        options={{
          title: "Idea",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="lightbulb" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarStyle: { height: 60 },
        tabBarLabelStyle: { fontSize: 12, marginBottom: 8, marginTop: -8 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Camera",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="camera" color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gear" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}

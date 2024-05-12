import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Tabs, useNavigation, useSegments } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function AppLayout() {
  const segments = useSegments();
  const page = segments[segments.length - 1];
  const pagesToHideTabs = ["scan"];

  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarStyle: {
          height: 60,
          display: pagesToHideTabs.includes(page) ? "none" : "flex",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 8,
          marginTop: -8,
        },
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
          title: "Scan",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="camera" color={color} size={22} />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 20 }}
            >
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTransparent: true,
          headerTitle: "",
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

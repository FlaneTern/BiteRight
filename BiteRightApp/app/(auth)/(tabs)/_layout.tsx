import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import { Tabs, useRouter, useSegments } from "expo-router";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function AppLayout() {
  const segments = useSegments();
  const page = segments[segments.length - 1];
  const pagesToHideTabs = ["scan"];

  const router = useRouter();
  const scanIcon = require("@/assets/images/Scan-Icon.png");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.main,
        tabBarInactiveTintColor: Colors.c200,
        tabBarStyle: {
          height: 72,
          display: pagesToHideTabs.includes(page) ? "none" : "flex",
        },
        tabBarLabelStyle: {
          display: "none",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" color={color} size={36} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          tabBarIcon: () => (
            <View style={styles.scanButton}>
              <Image source={scanIcon} style={{ width: 36, height: 36 }} />
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 20 }}
            >
              <FontAwesome6 name="chevron-left" size={28} color="white" />
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
            <FontAwesome name="gear" color={color} size={36} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  scanButton: {
    width: 84,
    height: 84,
    backgroundColor: Colors.accent2,
    borderRadius: 42,
    borderColor: Colors.c000,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 60,
    elevation: 5,
  },
});

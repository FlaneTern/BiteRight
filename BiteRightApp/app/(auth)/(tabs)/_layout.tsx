import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Tabs, useRouter, useSegments } from "expo-router";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function AppLayout() {
  const segments = useSegments();
  const page = segments[segments.length - 1];
  const pagesToHideTabs = ["scan"];

  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          height: 60,
          display: pagesToHideTabs.includes(page) ? "none" : "flex",
        },
        tabBarLabelStyle: {
          fontSize: 12.5,
          fontWeight: "bold",
          marginBottom: 8,
          marginTop: -8,
        },
      }}
    >
      <Tabs.Screen
        name="home"
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
            <View style={styles.scanButton}>
              <MaterialCommunityIcons
                name="line-scan"
                color={color}
                size={22}
              />
              <Text style={{ fontWeight: "bold", fontSize: 12.5 }}>Scan</Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 20 }}
            >
              <AntDesign name="arrowleft" size={28} color="white" />
            </TouchableOpacity>
          ),
          headerTransparent: true,
          headerTitle: "",
          tabBarLabel: "",
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

const styles = StyleSheet.create({
  scanButton: {
    width: 70,
    height: 70,
    backgroundColor: "yellow",
    borderRadius: 35,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 40,
  },
});

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Layout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="limit"
        options={{
          title: "Daily Calorie Limit",
          headerTitleStyle: { ...defaultStyles.heading2 },
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.back()}
              style={{
                width: 30,
                height: 30,
                marginLeft: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome6 name="chevron-left" size={22} color={Colors.c300} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="diet"
        options={{
          title: "Dietary Preference",
          headerTitleStyle: { ...defaultStyles.heading2 },
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.back()}
              style={{
                width: 30,
                height: 30,
                marginLeft: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome6 name="chevron-left" size={22} color={Colors.c300} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="history"
        options={{
          title: "Intake History",
          headerTitleStyle: { ...defaultStyles.heading2 },
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.back()}
              style={{
                width: 30,
                height: 30,
                marginLeft: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome6 name="chevron-left" size={22} color={Colors.c300} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="other"
        options={{
          title: "Other",
          headerTitleStyle: { ...defaultStyles.heading2 },
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.back()}
              style={{
                width: 30,
                height: 30,
                marginLeft: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome6 name="chevron-left" size={22} color={Colors.c300} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="profile"
        options={{
          title: "Edit Profile",
          headerTitleAlign: "center",
          headerTitleStyle: { ...defaultStyles.heading2 },
          headerBackVisible: false,
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default Layout;

import { TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const Layout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="transition" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="product/search"
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="product/[id]"
        options={{
          title: "Details",
          headerTitleStyle: { ...defaultStyles.heading2 },
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerShadowVisible: false,
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
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="allset" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;

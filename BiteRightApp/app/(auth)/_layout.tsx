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
      <Stack.Screen name="(settings)" options={{ headerShown: false }} />
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
        name="article/[id]"
        options={{
          title: "Article",
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
      <Stack.Screen name="allset" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;

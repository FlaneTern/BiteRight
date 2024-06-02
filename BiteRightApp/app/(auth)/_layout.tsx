import { TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const Layout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="transition" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="product/[id]"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.navigate("(tabs)/home")}>
              <AntDesign name="arrowleft" size={24} color={Colors.c400} />
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
          headerTransparent: true,
        }}
      />
    </Stack>
  );
};

export default Layout;

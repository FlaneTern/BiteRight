import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { SQLiteProvider } from "expo-sqlite";
import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";

import { migrateDBIfNeeded } from "@/utils/Database";
import { defaultStyles } from "@/constants/Styles";
import { loginStorage } from "@/utils/Storage";

SplashScreen.preventAutoHideAsync();

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },

  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    RobotoFlex: require("../assets/fonts/RobotoFlex-Regular.ttf"),
  });
  const [profileComplete, setProfileComplete] = useState(false);

  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  const router = useRouter();
  const segments = useSegments();
  const email = user?.primaryEmailAddress?.emailAddress;
  const inAuthTabsGroup = segments[0] === "(auth)" && segments[1] === "(tabs)";

  const checkCompletion = () => {
    if (email) {
      if (loginStorage.contains(`complete_${email}`)) {
        setProfileComplete(true);
      }
    }
  };

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (email) {
      checkCompletion();
    }
  }, [email]);

  useEffect(() => {
    console.log("🚀 ~ InitialLayout ~ inAuthTabsGroup:", inAuthTabsGroup);
    console.log("🚀 ~ InitialLayout ~ isSignedIn:", isSignedIn);
    console.log("🚀 ~ InitialLayout ~ profileComplete:", profileComplete);

    if (isSignedIn && profileComplete && !inAuthTabsGroup) {
      router.replace("(auth)/(tabs)/home");
    } else if (isSignedIn && !profileComplete) {
      router.replace({
        pathname: "/(auth)/profile",
        params: { canGoBack: "false", email: email },
      });
    } else if (!isSignedIn) {
      router.replace("/login");
    }

    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, [profileComplete]);

  if (!loaded || !isLoaded) {
    return <Slot />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="otp"
        options={{
          title: "OTP Verification",
          headerBackVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: { ...defaultStyles.heading2 },
          headerTransparent: true,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SQLiteProvider databaseName="users.db" onInit={migrateDBIfNeeded}>
          <InitialLayout />
        </SQLiteProvider>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
};

export default RootLayoutNav;

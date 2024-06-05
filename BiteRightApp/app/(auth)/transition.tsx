import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";

import { defaultStyles } from "@/constants/Styles";
import { loginStorage } from "@/utils/Storage";
import { createUser } from "@/utils/Database";
import Colors from "@/constants/Colors";

const TransitionPage = () => {
  const { user } = useUser();
  const { email, password } = useLocalSearchParams<{
    email: string;
    password: string;
  }>();

  const db = useSQLiteContext();
  const router = useRouter();
  const userEmail = email || user?.primaryEmailAddress?.emailAddress;
  const userPassword = password || "OAuth";
  const isOAuth = password === "OAuth" ? 0 : 1;

  useEffect(() => {
    if (userEmail) {
      if (loginStorage.contains(`complete_${userEmail}`)) {
        router.replace("/home");
      } else {
        createUser(db, userEmail!, userPassword, isOAuth);

        router.replace({
          pathname: "/profile",
          params: { canGoBack: "false" },
        });
      }
    }
  }, [userEmail]);

  return (
    <ActivityIndicator
      size="large"
      style={defaultStyles.loadingOverlay}
      color={Colors.c000}
    />
  );
};

export default TransitionPage;

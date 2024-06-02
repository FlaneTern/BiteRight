import { ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useSQLiteContext } from "expo-sqlite";

import { createUser, isUserExist } from "@/utils/Database";
import { defaultStyles } from "@/constants/Styles";
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
      isUserExist(db, userEmail).then((isExist) => {
        if (isExist) {
          console.log("User exist");
          router.replace("/home");
        } else {
          console.log("User not exist");
          createUser(db, userEmail, userPassword, isOAuth);

          router.replace({
            pathname: "/profile",
            params: { canGoBack: "false" },
          });
        }
      });
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

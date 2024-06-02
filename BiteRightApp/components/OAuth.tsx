import React, { useCallback } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useOAuth, useUser } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";

import { defaultStyles } from "@/constants/Styles";
import WarmUpBrowser from "@/utils/WarmUpBrowser";
import Colors from "@/constants/Colors";

WebBrowser.maybeCompleteAuthSession();

type mode = "oauth_google" | "oauth_facebook" | "oauth_apple";

interface OAuthButtonProps {
  method: string;
}

const OAuthButton: React.FC<OAuthButtonProps> = ({ method }) => {
  WarmUpBrowser();

  const Icon: { [key: string]: any } = {
    google: require("@/assets/images/Logo-Google.png"),
    apple: require("@/assets/images/Logo-Apple.png"),
    facebook: require("@/assets/images/Logo-Facebook.png"),
  };

  const { startOAuthFlow } = useOAuth({
    strategy: `oauth_${method}` as mode,
    redirectUrl: "biteright-app://(auth)/transition",
  });

  const _handlePress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  const methodName = method[0].toUpperCase() + method.slice(1);

  return (
    <TouchableOpacity
      style={[defaultStyles.button, styles.button]}
      onPress={_handlePress}
    >
      <Image source={Icon[method]} style={styles.icon} />
      <Text
        style={[defaultStyles.subHeading, { color: Colors.main }]}
      >{`Continue With ${methodName}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    marginVertical: 4,
    height: 40,
    backgroundColor: Colors.c000,
    borderWidth: 1,
    borderColor: Colors.main,
    alignSelf: "center",
    justifyContent: "center",
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 10,
    alignSelf: "center",
  },
});

export default OAuthButton;

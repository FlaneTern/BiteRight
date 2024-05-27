import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import WarmUpBrowser from "../utils/WarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import { defaultStyles } from "../constants/Styles";

WebBrowser.maybeCompleteAuthSession();

const OAuthButton = () => {
  WarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handlePress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
      } else {
        console.error("OAuth error", "No session ID returned");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <TouchableOpacity style={defaultStyles.button} onPress={handlePress}>
      <Text>Continue With Google</Text>
    </TouchableOpacity>
  );
};

export default OAuthButton;

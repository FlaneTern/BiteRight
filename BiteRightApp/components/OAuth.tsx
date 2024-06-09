import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";

import WarmUpBrowser from "@/utils/WarmUpBrowser";
import Colors from "@/constants/Colors";
import Button from "./Buttons";

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
    <Button
      title={`Continue With ${methodName}`}
      image={Icon[method]}
      onPress={_handlePress}
      buttonStyle={styles.button}
      textStyle={{ color: Colors.main }}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 4,
    backgroundColor: Colors.c000,
    borderWidth: 1,
    borderColor: Colors.main,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 10,
    alignSelf: "center",
  },
});

export default OAuthButton;

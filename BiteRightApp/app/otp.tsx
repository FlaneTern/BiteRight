import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { RefObject, useRef, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import OTPInput from "@/components/OTPInput";

const OTPPage = () => {
  const OTPLogo = require("@/assets/images/OTP-Icon.png");
  const router = useRouter();

  const { email } = useLocalSearchParams<{ email: string }>();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [loading, setLoading] = useState(false);
  const [codes, setCodes] = useState<string[] | undefined>(Array(6).fill(""));
  const [errorMessages, setErrorMessages] = useState<string[]>();
  const refs: RefObject<TextInput>[] = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const onChangeCode = (text: string, index: number) => {
    if (text.length > 1) {
      setErrorMessages(undefined);

      const newCodes = text.split("");
      setCodes(newCodes);
      refs[5]!.current!.focus();
      return;
    }

    setErrorMessages(undefined);

    const newCodes = [...codes!];
    newCodes[index] = text;
    setCodes(newCodes);

    if (text !== "" && index < 5) {
      refs[index + 1]!.current!.focus();
    }
  };

  const onPressContinue = async () => {
    if (!isLoaded) return;

    setLoading(true);
    const fullCode = codes!.join("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: fullCode,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      setLoading(false);
      router.replace("(auth)/(tabs)/home");
    } catch (err: any) {
      console.log(err.errors[0].message);
    }
  };

  return (
    <View style={defaultStyles.pageContainer}>
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.c000} />
        </View>
      )}

      <Image source={OTPLogo} style={styles.logo} />
      <Text
        style={[defaultStyles.body, { textAlign: "center", marginTop: 32 }]}
      >
        Please enter the 6-digit codes we have sent to your email:
      </Text>
      <Text style={[defaultStyles.bodyBold, { textAlign: "center" }]}>
        {email}
      </Text>
      <OTPInput
        codes={codes!}
        errorMessage={errorMessages}
        onChangeCode={onChangeCode}
        refs={refs}
      />
      <TouchableOpacity
        style={[defaultStyles.button, { alignSelf: "center" }]}
        onPress={onPressContinue}
      >
        <Text style={[defaultStyles.subHeading, { color: Colors.c000 }]}>
          Continue
        </Text>
      </TouchableOpacity>

      <Link
        replace
        href={{
          pathname: "/login",
          params: { type: "signup" },
        }}
        style={{ marginTop: 32, color: Colors.c200 }}
        asChild
      >
        <Text style={{ textAlign: "center" }}>
          <Text style={[defaultStyles.bodyUnderlined, { fontSize: 12.5 }]}>
            That's not my email
          </Text>
        </Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 112,
    width: 69.89,
    height: 120,
    alignSelf: "center",
  },
  email: {
    textAlign: "center",
    fontSize: 12.5,
  },
});

export default OTPPage;

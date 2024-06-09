import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";

import { defaultStyles } from "@/constants/Styles";
import Button from "@/components/Buttons";
import Colors from "@/constants/Colors";
import OAuthButton from "@/components/OAuth";

const Login = () => {
  const [emailAdddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");

  const { type } = useLocalSearchParams<{ type: string }>();
  const { signIn, setActive, isLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();

  const [loading, setLoading] = useState(false);
  const logo = require("@/assets/images/Logo-Green.png");
  const router = useRouter();
  const isSignUp = type === "signup";

  const onSignInPress = async () => {
    if (!isLoaded) return;

    Keyboard.dismiss();
    setLoading(true);

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAdddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      Alert.alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onSignUpPress = async () => {
    if (!signUpLoaded) return;

    Keyboard.dismiss();
    setLoading(true);

    try {
      await signUp.create({
        emailAddress: emailAdddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setLoading(false);
      router.replace({
        pathname: "/otp",
        params: { email: emailAdddress, password: password },
      });
    } catch (err: any) {
      console.log(err.errors[0].message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={0}
      style={defaultStyles.pageContainer}
    >
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.c000} />
        </View>
      )}

      <Image
        source={logo}
        style={[styles.logo, isSignUp && styles.logoSignUp]}
      />
      <Text style={[defaultStyles.heading1, styles.welcome]}>
        {isSignUp ? "Create your account" : "Welcome back!"}
      </Text>

      <View>
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          placeholderTextColor={Colors.c100}
          value={emailAdddress}
          onChangeText={setEmailAddress}
          style={[defaultStyles.body, styles.inputField]}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={Colors.c100}
          value={password}
          onChangeText={setPassword}
          style={[defaultStyles.body, styles.inputField]}
          secureTextEntry
        />
        {isSignUp && (
          <TextInput
            placeholder="Re-enter Password"
            placeholderTextColor={Colors.c100}
            value={reenteredPassword}
            onChangeText={setReenteredPassword}
            style={[defaultStyles.body, styles.inputField]}
            secureTextEntry
          />
        )}
      </View>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text
          style={[defaultStyles.body, { color: Colors.main, fontSize: 12 }]}
        >
          {isSignUp ? "" : "I forgot my password"}
        </Text>
      </TouchableOpacity>

      {isSignUp ? (
        <Button title="Create Account" onPress={onSignUpPress} />
      ) : (
        <Button title="Login" onPress={onSignInPress} />
      )}

      <Text
        style={[
          defaultStyles.body,
          { color: Colors.c200, marginVertical: 20, alignSelf: "center" },
        ]}
      >
        OR
      </Text>

      <OAuthButton method="google" />
      <OAuthButton method="apple" />
      <OAuthButton method="facebook" />

      <Link
        replace
        href={{
          pathname: "/login",
          params: { type: isSignUp ? "" : "signup" },
        }}
        style={{ marginTop: 20, color: Colors.c200 }}
        asChild
      >
        <Text style={{ textAlign: "center" }}>
          <Text style={[defaultStyles.bodyUnderlined, { fontSize: 12.5 }]}>
            {isSignUp ? "Already have an account?" : "I don't have an account"}
          </Text>
          <Text
            style={[defaultStyles.body, { color: Colors.main, fontSize: 12.5 }]}
          >
            {isSignUp ? " Sign in" : ""}
          </Text>
        </Text>
      </Link>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 108,
    width: 63,
    height: 63,
    alignSelf: "center",
  },
  logoSignUp: {
    marginTop: 73,
  },
  welcome: {
    marginVertical: 36,
    textAlign: "center",
    margin: 10,
  },
  inputField: {
    width: "80%",
    marginVertical: 2,
    height: 38,
    borderBottomWidth: 1,
    borderBottomColor: Colors.c100,
    alignSelf: "center",
  },
  forgotPassword: {
    marginLeft: "10%",
    marginVertical: 10,
  },
});

export default Login;

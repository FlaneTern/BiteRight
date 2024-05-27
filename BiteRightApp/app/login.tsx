import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import { Link, useLocalSearchParams } from "expo-router";
import { defaultStyles } from "../constants/Styles";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import OAuthButton from "../components/OAuth";

const Login = () => {
  const logo = require("../assets/images/Logo_Green.png");
  const logoGoogle = require("../assets/images/Logo_Google.png");
  const logoFacebook = require("../assets/images/Logo_Facebook.png");
  const logoApple = require("../assets/images/Logo_Apple.png");

  const { type } = useLocalSearchParams<{ type: string }>();
  const { signIn, setActive, isLoaded } = useSignIn();
  const {
    signUp,
    setActive: signUpSetActive,
    isLoaded: signUpLoaded,
  } = useSignUp();

  const [emailAdddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) return;

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

    setLoading(true);

    try {
      const completeSignUp = await signUp.create({
        emailAddress: emailAdddress,
        password,
      });

      await signUpSetActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      Alert.alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={70}
      style={defaultStyles.pageContainer}
    >
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.c000} />
        </View>
      )}

      <Image source={logo} style={styles.logo} />
      <Text style={[defaultStyles.heading1, styles.welcome]}>
        {type === "signup" ? "Create your account" : "Welcome back!"}
      </Text>

      <View>
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          placeholderTextColor={Colors.c100}
          value={emailAdddress}
          onChangeText={setEmailAddress}
          style={styles.inputField}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={Colors.c100}
          value={password}
          onChangeText={setPassword}
          style={styles.inputField}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text
          style={[defaultStyles.body, { color: Colors.main, fontSize: 12 }]}
        >
          {type === "signup" ? " " : "I forgot my password"}
        </Text>
      </TouchableOpacity>

      {type === "signup" ? (
        <TouchableOpacity
          style={[defaultStyles.button, { alignSelf: "center" }]}
          onPress={onSignUpPress}
        >
          <Text style={[defaultStyles.subheading, { color: Colors.c000 }]}>
            Create Account
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[defaultStyles.button, { alignSelf: "center" }]}
          onPress={onSignInPress}
        >
          <Text style={[defaultStyles.subheading, { color: Colors.c000 }]}>
            Login
          </Text>
        </TouchableOpacity>
      )}

      <Text
        style={[
          defaultStyles.body,
          { color: Colors.c200, marginVertical: 20, alignSelf: "center" },
        ]}
      >
        OR
      </Text>

      {/* <TouchableOpacity style={[defaultStyles.button, styles.button]}>
        <Image source={logoGoogle} style={styles.company} />
        <Text style={[defaultStyles.subheading, { color: Colors.main }]}>
          Continue with Google
        </Text>
      </TouchableOpacity> */}
      <OAuthButton />
      <TouchableOpacity style={[defaultStyles.button, styles.button]}>
        <Image source={logoApple} style={styles.company} />
        <Text style={[defaultStyles.subheading, { color: Colors.main }]}>
          Continue with Apple
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[defaultStyles.button, styles.button]}>
        <Image source={logoFacebook} style={styles.company} />
        <Text style={[defaultStyles.subheading, { color: Colors.main }]}>
          Continue with Facebook
        </Text>
      </TouchableOpacity>

      <Link
        href={{
          pathname: "/login",
          params: { type: type === "signup" ? "" : "signup" },
        }}
        style={{ marginTop: 20, color: Colors.c200 }}
        asChild
      >
        <Text style={{ textAlign: "center" }}>
          <Text style={defaultStyles.bodyUnderlined}>
            {type === "signup"
              ? "Already have an account?"
              : "I don't have an account"}
          </Text>
          <Text style={[defaultStyles.body, { color: Colors.main }]}>
            {type === "signup" ? " Sign in" : ""}
          </Text>
        </Text>
      </Link>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 115,
    width: 63,
    height: 63,
    alignSelf: "center",
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
    fontFamily: "RobotoFlex",
    fontWeight: "regular",
  },
  forgotPassword: {
    marginLeft: "10%",
    marginVertical: 10,
  },
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
  haveAccount: {
    color: Colors.c200,
    marginVertical: 20,
  },
  company: {
    width: 16,
    height: 16,
    marginRight: 10,
    alignSelf: "center",
  },
});

export default Login;

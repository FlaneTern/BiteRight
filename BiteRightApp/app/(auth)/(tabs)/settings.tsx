import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/Styles";

export default function Settings() {
  const { signOut } = useAuth();

  return (
    <View style={defaultStyles.pageContainer}>
      <Text>Settings</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({});

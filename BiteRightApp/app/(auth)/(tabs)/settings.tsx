import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { defaultStyles } from "@/constants/Styles";
import { useUser } from "@clerk/clerk-expo";
import { Image } from "react-native";
import SettingBlocks from "@/components/SettingBlocks";
import { useFocusEffect } from "expo-router";

const SettingsPage = () => {
  const { user } = useUser();

  const profileImage = user?.imageUrl;
  const name = user?.firstName + " " + user?.lastName;
  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  });

  return (
    <ScrollView
      ref={scrollRef}
      style={defaultStyles.pageContainer}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <Image source={{ uri: profileImage }} style={styles.profileImage} />
      <Text style={styles.name}>{name}</Text>

      <View style={{ gap: 24, marginTop: 32 }}>
        <View>
          <Text style={styles.section}>Account</Text>
          <SettingBlocks
            name="Edit Profile"
            path="/(settings)/profile"
            params={{ canGoBack: "true" }}
            top
          />
          <SettingBlocks name="Change Email" />
          <SettingBlocks name="Change Password" bottom />
        </View>
        <View>
          <Text style={styles.section}>Diet</Text>
          <SettingBlocks name="Daily Calorie Limit" path="limit" top />
          <SettingBlocks name="Dietary Preferences" path="diet" bottom />
        </View>
        <View>
          <Text style={styles.section}>History</Text>
          <SettingBlocks name="Intake History" path="history/intake" top />
          <SettingBlocks name="Payment History" bottom />
        </View>
        <View style={{ marginBottom: 48 }}>
          <Text style={styles.section}>Others</Text>
          <SettingBlocks name="Notification" top />
          <SettingBlocks name="Privacy and Security" path="other" />
          <SettingBlocks name="Log Out" bottom logout />
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginTop: 48,
    resizeMode: "contain",
    alignSelf: "center",
  },
  name: {
    width: "70%",
    marginTop: 8,
    ...defaultStyles.heading2,
    textAlign: "center",
    alignSelf: "center",
  },
  section: {
    ...defaultStyles.bodyBold,
    marginBottom: 8,
    left: "7.5%",
  },
});

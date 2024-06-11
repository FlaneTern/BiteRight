import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import { useUser } from "@clerk/clerk-expo";
import { Image } from "react-native";
import SettingBlocks from "@/components/SettingBlocks";

const SettingsPage = () => {
  const { user } = useUser();
  const profileImage = user?.imageUrl;
  const name = user?.firstName + " " + user?.lastName;

  return (
    <ScrollView
      style={defaultStyles.pageContainer}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <Image source={{ uri: profileImage }} style={styles.profileImage} />
      <Text style={styles.name}>{name}</Text>

      <View style={{ gap: 24, marginTop: 32 }}>
        <View>
          <Text style={styles.section}>Account</Text>
          <SettingBlocks name="Edit Profile" path="/(settings)/profile" top />
          <SettingBlocks name="Change Email" path="" />
          <SettingBlocks name="Change Password" path="" bottom />
        </View>
        <View>
          <Text style={styles.section}>Diet</Text>
          <SettingBlocks name="Daily Calorie Limit" path="limit" top />
          <SettingBlocks name="Dietary Preferences" path="diet" bottom />
        </View>
        <View>
          <Text style={styles.section}>History</Text>
          <SettingBlocks name="Intake History" path="" top />
          <SettingBlocks name="Payment History" path="" bottom />
        </View>
        <View style={{ marginBottom: 40 }}>
          <Text style={styles.section}>Others</Text>
          <SettingBlocks name="Notification" path="" top />
          <SettingBlocks name="Privacy and Security" path="" />
          <SettingBlocks name="Log Out" path="" bottom />
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
    width: "50%",
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

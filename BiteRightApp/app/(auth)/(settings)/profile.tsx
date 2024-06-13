import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { useUser } from "@clerk/clerk-expo";

import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import {
  createUserDietInfo,
  createUserIntakeLimit,
  createUserProfile,
  fetchUserDietInfo,
  fetchUserProfile,
  updateUserDietInfo,
  updateUserIntakeLimit,
  updateUserProfile,
} from "@/utils/Database";
import {
  genderOptions,
  activityLevelOptions,
  goalOptions,
} from "@/constants/Options";
import { loginStorage } from "@/utils/Storage";
import {
  ActivityLevel,
  Gender,
  Goal,
  calculateCalories,
  calculateMacronutrients,
} from "@/utils/CaloriesCount";
import { dateToISO, formatDate } from "@/utils/DateFormat";
import Button from "@/components/Buttons";
import DropdownList from "@/components/DropdownList";

const ProfilePage = () => {
  const { user } = useUser();
  const { canGoBack, email } = useLocalSearchParams<{
    canGoBack: string;
    email: string;
  }>();

  const db = useSQLiteContext();
  const router = useRouter();
  const canGoBackValue = canGoBack === "false";
  const userEmail = email || user?.primaryEmailAddress?.emailAddress;

  console.log("🚀 ~ ProfilePage ~ userEmail", userEmail);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user?.fullName || "");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");

  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      console.log("🚀 ~ onCaptureImage ~ base64:", base64);

      user?.setProfileImage({
        file: base64,
      });
    }
  };

  const onCalendarPress = () => {
    Keyboard.dismiss();
    setOpen(true);
  };

  const onDateChange = (selectedDate: Date) => {
    setOpen(false);
    setDateOfBirth(selectedDate);
  };

  const onContinue = () => {
    if (
      !name ||
      !dateOfBirth ||
      !gender ||
      !height ||
      !weight ||
      !activityLevel ||
      !goal
    ) {
      alert("Please fill in all fields");
      return;
    }

    const formattedHeight = parseFloat(height);
    const formattedWeight = parseFloat(weight);
    const calories = calculateCalories({
      dateOfBirth: dateToISO(dateOfBirth),
      gender: gender as Gender,
      height: formattedHeight,
      weight: formattedWeight,
      activityLevel: activityLevel as ActivityLevel,
      healthGoal: goal as Goal,
    });

    const nutrients = calculateMacronutrients(calories);

    const firstName = name.split(" ")[0];
    const lastName = name.split(" ").slice(1).join(" ");

    user?.update({
      firstName,
      lastName,
    });

    if (canGoBackValue) {
      createUserProfile(db, email as string, {
        name,
        date_of_birth: dateToISO(dateOfBirth),
        gender,
        height: formattedHeight,
        weight: formattedWeight,
      });

      createUserDietInfo(db, email as string, {
        activity_level: activityLevel,
        health_goal: goal,
      });

      createUserIntakeLimit(db, email as string, {
        calories,
        carbohydrates: nutrients.carbohydrates,
        sugar: nutrients.sugar,
        fats: nutrients.fat,
        protein: nutrients.protein,
      });

      loginStorage.set(`complete_${email}`, true);

      router.replace({
        pathname: "/(auth)/allset",
        params: { name: name.split(" ")[0], calories: calories.toString() },
      });
    } else {
      if (userEmail) {
        updateUserProfile(db, userEmail, {
          name,
          date_of_birth: dateToISO(dateOfBirth),
          gender,
          height: formattedHeight,
          weight: formattedWeight,
        });

        updateUserDietInfo(db, userEmail, {
          activity_level: activityLevel,
          health_goal: goal,
        });

        updateUserIntakeLimit(db, userEmail, {
          calories,
          carbohydrates: nutrients.carbohydrates,
          sugar: nutrients.sugar,
          fats: nutrients.fat,
          protein: nutrients.protein,
        });

        router.back();
      }
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchUserProfile(db, userEmail).then((profile) => {
        if (profile) {
          setName(profile.name);
          setDateOfBirth(new Date(profile.date_of_birth));
          setGender(profile.gender);
          setHeight(profile.height.toString());
          setWeight(profile.weight.toString());
        }
      });

      fetchUserDietInfo(db, userEmail).then((dietInfo) => {
        if (dietInfo) {
          setActivityLevel(dietInfo.activity_level);
          setGoal(dietInfo.health_goal);
        }
      });
    }
  }, [userEmail]);

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerLeft: canGoBackValue
            ? undefined
            : () => (
                <TouchableOpacity
                  onPress={() => router.back()}
                  activeOpacity={0.8}
                  style={{
                    width: 30,
                    height: 30,
                    marginLeft: 12,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome6
                    name="chevron-left"
                    size={22}
                    color={Colors.c300}
                  />
                </TouchableOpacity>
              ),
        }}
      />

      <TouchableOpacity onPress={onCaptureImage} style={styles.captureButton}>
        {user?.imageUrl && (
          <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
        )}
        <Entypo
          name="camera"
          size={18}
          color={Colors.c000}
          style={styles.cameraIcon}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Name</Text>
      <TextInput
        placeholder="Enter your name"
        placeholderTextColor={Colors.c200}
        value={name}
        onChangeText={setName}
        style={[defaultStyles.body, styles.inputField]}
      />
      <Text style={styles.text}>Date of Birth</Text>
      <TouchableOpacity
        style={styles.calendar}
        activeOpacity={1}
        onPress={onCalendarPress}
      >
        <Ionicons
          name="calendar-outline"
          size={16}
          color={Colors.c200}
          style={styles.calendarIcon}
          onPress={onCalendarPress}
        />
        <Pressable onPress={onCalendarPress} style={{ width: "100%" }}>
          <TextInput
            placeholder="DD/MM/YYYY"
            placeholderTextColor={Colors.c200}
            value={formatDate(dateOfBirth)}
            style={[defaultStyles.body, styles.inputField, { paddingLeft: 24 }]}
            editable={false}
          />
        </Pressable>
      </TouchableOpacity>
      {open && (
        <DateTimePicker
          value={dateOfBirth || new Date()}
          mode="date"
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
          onChange={(_, selectedDate) =>
            onDateChange(selectedDate || (dateOfBirth ?? new Date()))
          }
        />
      )}

      <Text style={styles.text}>Sex</Text>
      <DropdownList
        data={genderOptions}
        value={gender}
        onChange={(item) => setGender(item.value)}
        dropdownPosition="bottom"
      />

      <Text style={styles.text}>Height</Text>
      <View style={styles.sizeIndicator}>
        <TextInput
          placeholder="Enter your height"
          placeholderTextColor={Colors.c200}
          value={height}
          onChangeText={setHeight}
          style={[defaultStyles.body, styles.inputField]}
          keyboardType="number-pad"
          inputMode="numeric"
        />
        <Text style={styles.indicator}>cm</Text>
      </View>
      <Text style={styles.text}>Weight</Text>
      <View style={styles.sizeIndicator}>
        <TextInput
          placeholder="Enter your weight"
          placeholderTextColor={Colors.c200}
          value={weight}
          onChangeText={setWeight}
          style={[defaultStyles.body, styles.inputField]}
          keyboardType="number-pad"
          inputMode="numeric"
        />
        <Text style={styles.indicator}>kg</Text>
      </View>
      <Text style={styles.text}>Activity Level</Text>
      <DropdownList
        data={activityLevelOptions}
        value={activityLevel}
        onChange={(item) => setActivityLevel(item.value)}
        dropdownPosition="top"
      />
      <Text style={styles.text}>Health Goal</Text>
      <DropdownList
        data={goalOptions}
        value={goal}
        onChange={(item) => setGoal(item.value)}
        dropdownPosition="top"
      />

      <Button
        title={canGoBackValue ? "Continue" : "Save"}
        onPress={onContinue}
        buttonStyle={{ marginTop: 32 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  captureButton: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 100,
    marginBottom: 28,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.main,
    padding: 6,
    borderRadius: 8,
  },
  inputField: {
    width: "80%",
    height: 34,
    paddingVertical: 8,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.c100,
    alignSelf: "center",
    color: Colors.c400,
  },
  text: {
    ...defaultStyles.bodyBold,
    color: Colors.c400,
    left: "10%",
  },
  calendar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  calendarIcon: {
    position: "absolute",
    left: "10%",
    top: 9,
  },
  sizeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  indicator: {
    ...defaultStyles.body,
    color: Colors.c200,
    position: "absolute",
    right: "0%",
    top: 9,
  },
});

export default ProfilePage;

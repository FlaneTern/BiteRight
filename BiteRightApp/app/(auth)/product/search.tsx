import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Branded, Common } from "@/constants/Interfaces";
import { FlashList } from "@shopify/flash-list";
import FlashListCard from "@/components/FlashListCard";
import { fetchItemsByName } from "@/api/Nutrition";

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<{
    branded: Branded[];
    common: Common[];
  }>({ branded: [], common: [] });

  const { width } = Dimensions.get("window");
  const animatedWidth = useSharedValue(width);
  const animatedY = useSharedValue(50);
  const animatedLeft = useSharedValue(0);

  useEffect(() => {
    animatedWidth.value = withTiming(width * 0.9, {
      duration: 350,
      easing: Easing.inOut(Easing.poly(4)),
    });
    animatedY.value = withTiming(0, {
      duration: 350,
      easing: Easing.inOut(Easing.quad),
    });
    animatedLeft.value = withTiming(width - width * 0.9 - 36, {
      duration: 350,
      easing: Easing.inOut(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: animatedWidth.value,
      transform: [{ translateY: animatedY.value }],
      right: animatedLeft.value,
    };
  });

  const router = useRouter();

  const onSearch = async () => {
    if (!prompt) return;

    const response = await fetchItemsByName(prompt);
    if (response) {
      setResponse(response);
    }

    setLoading(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (prompt) {
        onSearch();
        setLoading(true);
      }
    }, 1000);

    if (!prompt) {
      setResponse({ branded: [], common: [] });
    }

    return () => clearTimeout(delayDebounceFn);
  }, [prompt]);

  return (
    <View style={defaultStyles.pageContainer}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 48,
          alignItems: "center",
          flex: 1,
        }}
      >
        <Animated.View
          entering={FadeIn.duration(300).delay(200)}
          exiting={FadeOut.duration(300)}
        >
          <TouchableOpacity
            onPress={() => router.navigate("(tabs)/home")}
            style={{
              padding: 8,
              marginLeft: "4%",
              width: 52,
              height: 52,
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <FontAwesome6 name="chevron-left" size={24} color={Colors.c300} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[animatedStyle, { position: "absolute", marginBottom: 12 }]}
        >
          <SearchBar editable={true} onChangeText={setPrompt} prompt={prompt} />
        </Animated.View>
      </View>

      <View style={{ justifyContent: "center", flex: 10 }}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={Colors.c300}
            style={[
              defaultStyles.loadingOverlay,
              { backgroundColor: Colors.c000 },
            ]}
          />
        ) : (
          <FlashList
            data={[...response.branded, ...response.common]}
            estimatedItemSize={50}
            keyExtractor={(item) => item.nix_item_id || item.food_name}
            renderItem={({ item }) => <FlashListCard items={item} />}
            ItemSeparatorComponent={() => (
              <View
                style={{ borderBottomWidth: 1, borderBottomColor: Colors.c100 }}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default SearchPage;
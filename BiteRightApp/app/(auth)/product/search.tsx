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
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";

import FlashListCard from "@/components/FlashListCard";
import SearchBar from "@/components/SearchBar";
import Separator from "@/components/Separator";
import Colors from "@/constants/Colors";
import { fetchItemsByName } from "@/api/Nutrition";
import { Branded, Common } from "@/constants/Interfaces";
import { defaultStyles } from "@/constants/Styles";

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<{
    branded: Branded[];
    common: Common[];
  }>({ branded: [], common: [] });

  const { width } = Dimensions.get("window");
  const animatedWidth = useSharedValue(width);
  const animatedY = useSharedValue(28);
  const animatedLeft = useSharedValue(0);

  useEffect(() => {
    animatedWidth.value = withTiming(width * 0.9, {
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    });
    animatedY.value = withTiming(0, {
      duration: 250,
      easing: Easing.in(Easing.quad),
    });
    animatedLeft.value = withTiming(width - width * 0.9 - 32, {
      duration: 250,
      easing: Easing.inOut(Easing.bezierFn(0.57, 0.13, 0.37, 1.01)),
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
    if (!prompt) {
      setResponse({ branded: [], common: [] });
      return;
    }

    setTimeout(() => {
      setLoading(true);
      onSearch();
    }, 750);
  }, [prompt]);

  const backButton: ViewStyle = {
    padding: 8,
    marginLeft: "4%",
    width: 52,
    height: 52,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  };

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
          style={{ zIndex: 10 }}
        >
          <TouchableOpacity
            onPress={() =>
              router.replace({
                pathname: "/(tabs)/home",
                params: { type: "return" },
              })
            }
            style={backButton}
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
            color={Colors.main}
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
            ItemSeparatorComponent={() => <Separator />}
          />
        )}
      </View>
    </View>
  );
};

export default SearchPage;

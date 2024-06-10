import Animated from "react-native-reanimated";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { Link, useLocalSearchParams, useRouter } from "expo-router";

import { defaultStyles } from "@/constants/Styles";
import { useSQLiteContext } from "expo-sqlite";
import { loginStorage } from "@/utils/Storage";
import Colors from "@/constants/Colors";
import SearchBar from "@/components/SearchBar";
import Button from "@/components/Buttons";
import Statistic from "@/components/Statistic";
import { FlashList } from "@shopify/flash-list";
import { ArticleParams, Articles } from "@/constants/Articles";
import ArticleCard from "@/components/ArticleCard";

const Home = () => {
  const [renderType, setRenderType] = useState("home");
  const [articles, setArticles] = useState<ArticleParams[]>(Articles);

  const { user } = useUser();
  const { type } = useLocalSearchParams<{ type: string }>();

  const router = useRouter();
  const logo = require("@/assets/images/BiteRight-Logo-And-Text.png");
  const userAvatar = user?.imageUrl;

  useEffect(() => {
    setRenderType(type || "home");
  }, [type]);

  useEffect(() => {
    if (
      !loginStorage.contains(
        `complete_${user?.primaryEmailAddress?.emailAddress}`
      )
    ) {
      loginStorage.set(
        `complete_${user?.primaryEmailAddress?.emailAddress}`,
        true
      );
    }
  }, [user !== undefined]);

  const result = loginStorage.getBoolean(
    `complete_${user?.primaryEmailAddress?.emailAddress}`
  );
  console.log("🚀 ~ Home ~ result", result);

  return (
    <View style={defaultStyles.pageContainer}>
      <View style={{ flex: 0.25, backgroundColor: Colors.c000 }}>
        <View style={styles.imageRow}>
          <Image source={logo} style={{ width: 73.5, height: 28 }} />
          <Image source={{ uri: userAvatar }} style={styles.avatar} />
        </View>

        <Link href={"(auth)/product/search"} asChild>
          <TouchableOpacity activeOpacity={1}>
            <SearchBar editable={false} prompt="" />
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.section}>Today's stats</Text>

        <Statistic email={user?.primaryEmailAddress?.emailAddress as string} />

        <Text style={styles.section}>Health insights</Text>

        <FlashList
          horizontal
          data={articles}
          renderItem={({ item }) => <ArticleCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={5}
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.section}>Looking for a snack?</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageRow: {
    width: "85%",
    marginTop: 48,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.main,
  },
  section: {
    ...defaultStyles.bodyBold,
    marginVertical: 8,
    left: "7.5%",
  },
});

export default Home;

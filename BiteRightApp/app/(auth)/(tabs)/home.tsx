import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { useUser } from "@clerk/clerk-expo";

import { ArticleParams, Articles } from "@/constants/Articles";
import { defaultStyles } from "@/constants/Styles";
import { loginStorage } from "@/utils/Storage";
import ArticleCard from "@/components/ArticleCard";
import SearchBar from "@/components/SearchBar";
import Statistic from "@/components/Statistic";
import Colors from "@/constants/Colors";

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
    <View style={[defaultStyles.pageContainer]}>
      <View style={[styles.header]}>
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

      <ScrollView
        style={{ flex: 1, marginTop: -8 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.section}>Today's stats</Text>

        <Statistic email={user?.primaryEmailAddress?.emailAddress as string} />

        <Text style={styles.section}>Health insights</Text>

        <FlashList
          horizontal
          data={articles}
          renderItem={({ item }) => <ArticleCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={2}
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
  header: {
    height: 140,
    backgroundColor: Colors.c000,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    zIndex: 2,
  },
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

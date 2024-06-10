import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import { Image } from "react-native";
import { ArticleParams } from "@/constants/Articles";
import { LinearGradient } from "@shopify/react-native-skia";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

const ArticleCard = (params: ArticleParams) => {
  const { id, title, image, text } = params;
  const { width } = useWindowDimensions();

  return (
    <Link
      href={{
        pathname: "/(auth)/article/[id]",
        params: { id },
      }}
    >
      <View style={[styles.container, { width }]}>
        <Image
          source={image}
          style={[
            styles.image,
            { width, resizeMode: "contain", position: "absolute" },
          ]}
        />
        <View>
          <Text>ArticleCard</Text>
        </View>
      </View>
    </Link>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  container: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    justifyContent: "center",
  },
  title: {
    position: "absolute",
    bottom: 0,
  },
});

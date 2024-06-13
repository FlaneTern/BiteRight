import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";

import { Articles } from "@/constants/Articles";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

const ArticlePage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const data = Articles.find((article) => article.id === parseInt(id!));

  return (
    <ScrollView style={defaultStyles.pageContainer}>
      <Image source={data?.image} style={{ width: "100%", height: 200 }} />
      <View style={styles.article}>
        <Text style={styles.title}>{data?.title}</Text>
        {data!.text.map((item, index) => {
          switch (item.type) {
            case "paragraph":
              return (
                <Text
                  key={index}
                  style={styles.paragraph}
                  textBreakStrategy="simple"
                >
                  {item.content}
                </Text>
              );
            case "section":
              return (
                <Text key={index} style={styles.section}>
                  {item.content}
                </Text>
              );
            case "list":
              return (
                <View key={index}>
                  {(Array.isArray(item.content)
                    ? item.content
                    : [item.content]
                  ).map((content: string, i: number) => (
                    <View key={i} style={styles.list}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{content}</Text>
                    </View>
                  ))}
                </View>
              );
            default:
              return null;
          }
        })}
      </View>
    </ScrollView>
  );
};

export default ArticlePage;

const styles = StyleSheet.create({
  article: {
    flex: 1,
    width: "85%",
    alignSelf: "center",
    marginBottom: 32,
  },
  title: {
    ...defaultStyles.heading2,
    color: Colors.main,
    textAlign: "left",
    marginVertical: 12,
  },
  paragraph: {
    ...defaultStyles.body,
    textAlign: "justify",
  },
  section: {
    ...defaultStyles.bodyBold,
  },
  list: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 4,
  },
  bullet: {
    width: 10,
  },
  bulletText: {
    flex: 1,
    ...defaultStyles.body,
  },
});

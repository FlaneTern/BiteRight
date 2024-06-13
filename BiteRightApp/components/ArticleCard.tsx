import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import Colors from "@/constants/Colors";
import { ArticleParams } from "@/constants/Articles";
import { defaultStyles } from "@/constants/Styles";

const ArticleCard = (params: ArticleParams) => {
  const { id, title, image } = params;
  const { width } = useWindowDimensions();

  const router = useRouter();

  const handlePress = () => {
    router.push(`/article/${id}`);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <Image source={image} style={[styles.image, { width }]} />
      <LinearGradient
        colors={["transparent", Colors.main]}
        style={[styles.gradient, { width }]}
      >
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    height: 200,
    resizeMode: "contain",
    position: "absolute",
  },
  gradient: {
    height: 200,
    justifyContent: "flex-end",
  },
  title: {
    width: "85%",
    alignSelf: "center",
    ...defaultStyles.heading1,
    color: Colors.c000,
    marginBottom: 8,
  },
});

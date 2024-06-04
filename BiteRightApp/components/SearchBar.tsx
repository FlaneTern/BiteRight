import {
  Keyboard,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef } from "react";
import { Entypo, Foundation } from "@expo/vector-icons";

import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

interface SearchBarProps {
  editable?: boolean;
  autoFocus?: boolean;
  prompt: string;
  onChangeText?: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  editable = true,
  autoFocus = true,
  prompt,
  onChangeText,
}) => {
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (editable) inputRef.current?.focus();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [autoFocus]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchBar}>
        <Foundation
          name="magnifying-glass"
          size={20}
          color={Colors.c300}
          style={{ transform: [{ rotateY: "180deg" }], marginLeft: 12 }}
        />
        <TextInput
          ref={inputRef}
          placeholder="Search for meals"
          placeholderTextColor={Colors.c200}
          value={prompt}
          onChangeText={onChangeText}
          onBlur={() => Keyboard.dismiss()}
          style={[defaultStyles.body, styles.inputField]}
          editable={editable}
        />
        {!!prompt.length && (
          <TouchableOpacity
            style={styles.clearIcon}
            onPress={() => onChangeText!("")}
            activeOpacity={0.5}
          >
            <Entypo name="cross" size={20} color={Colors.c300} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.c100,
    height: 38,
    zIndex: 1,
  },
  inputField: {
    position: "absolute",
    left: 36,
    width: "85%",
    height: 38,
    paddingVertical: 12,
    alignSelf: "center",
    color: Colors.c400,
  },
  clearIcon: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 3,
    color: Colors.c300,
  },
});

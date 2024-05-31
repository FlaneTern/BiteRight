import { View, Text, StyleSheet } from "react-native";
import React, { RefObject, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

interface OTPInputProps {
  codes: string[];
  refs: RefObject<TextInput>[];
  errorMessage: string[] | undefined;
  onChangeCode: (text: string, index: number) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({
  codes,
  refs,
  errorMessage,
  onChangeCode,
}) => {
  const [focussedIndex, setFocussedIndex] = useState<number | null>(null);

  const handleFocus = (index: number) => setFocussedIndex(index);
  const handleBlur = () => setFocussedIndex(null);

  return (
    <View style={styles.container}>
      {codes.map((code, index) => (
        <TextInput
          key={index}
          autoComplete="one-time-code"
          enterKeyHint="next"
          inputMode="numeric"
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          maxLength={index === 0 ? codes.length : 1}
          ref={refs[index]}
          style={[
            styles.input,
            errorMessage && styles.errorInput,
            focussedIndex === index && styles.focusedInput,
          ]}
          value={code}
          onChangeText={(text) => onChangeCode(text, index)}
          onKeyPress={({ nativeEvent: { key } }) => {
            if (key === "Backspace" && index > 0) {
              onChangeCode("", index - 1);
              refs[index - 1]!.current!.focus();
            }
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: "85%",
    marginVertical: 32,
  },
  input: {
    ...defaultStyles.subHeading,
    width: 45,
    height: 64,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.c100,
    textAlign: "center",
    backgroundColor: Colors.c000,
    color: Colors.c400,
    fontSize: 24,
  },
  errorInput: {
    color: "red",
    borderColor: Colors.red1,
  },
  focusedInput: {
    borderColor: Colors.main,
  },
});

export default OTPInput;

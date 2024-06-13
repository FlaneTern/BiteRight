import { StyleSheet } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { Entypo } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

interface DropdownListProps {
  data: Array<{ label: string; value: string }>;
  value: string;
  dropdownPosition?: "top" | "bottom";
  onChange: (item: { label: string; value: string }) => void;
}

const DropdownList: React.FC<DropdownListProps> = ({
  data,
  value,
  dropdownPosition,
  onChange,
}) => {
  return (
    <Dropdown
      style={styles.picker}
      data={data}
      placeholder="Choose sex"
      placeholderStyle={{ ...defaultStyles.body, color: Colors.c200 }}
      value={value}
      selectedTextStyle={{ ...defaultStyles.body, color: Colors.c400 }}
      itemTextStyle={{ ...defaultStyles.body, color: Colors.c400 }}
      containerStyle={{ borderRadius: 8 }}
      itemContainerStyle={{ borderRadius: 8 }}
      labelField="label"
      valueField="value"
      onChange={onChange}
      dropdownPosition={dropdownPosition || "bottom"}
      renderRightIcon={() => (
        <Entypo name="chevron-thin-down" size={16} color={Colors.c200} />
      )}
    />
  );
};

export default DropdownList;

const styles = StyleSheet.create({
  picker: {
    width: "80%",
    height: 34,
    paddingVertical: 8,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.c100,
    alignSelf: "center",
  },
});

import { useCallback, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const CustomTextInput = ({
  placeholder = "Enter text",
  wordLimit = 100,
  containerStyle,
  inputStyle,
  placeholderTextColor = "#999",
  textColor = "#fff",
  value,
  onChangeText,
}) => {
  const [internalText, setInternalText] = useState("");
  const [warning, setWarning] = useState("");

  const enforceWordLimit = useCallback(
    (t) => {
      const words = t.trim().length ? t.trim().split(/\s+/) : [];
      if (words.length <= wordLimit) {
        setWarning("");
        return t;
      }
      const truncated = words.slice(0, wordLimit).join(" ");
      setWarning(`Word limit ${wordLimit} reached.`);
      return truncated;
    },
    [wordLimit]
  );

  const handleChange = (t) => {
    const limited = enforceWordLimit(t);
    if (onChangeText) {
      onChangeText(limited); // update parent state (desc)
    } else {
      setInternalText(limited); // fallback to internal state
    }
  };

  // use controlled value if passed, otherwise internal
  const textValue = value !== undefined ? value : internalText;

  const wordCount = textValue.trim().length ? textValue.trim().split(/\s+/).length : 0;
  const remaining = wordLimit - wordCount;

  return (
    <View style={[{ padding: 12, marginTop: hp(2) }, containerStyle]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={[
          styles.input,
          { height: hp("20%"), color: textColor, width: wp("75%"), marginTop: hp(2) },
          inputStyle,
        ]}
        multiline
        value={textValue}
        onChangeText={handleChange}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <Text style={{ color: remaining < 0 ? "red" : textColor }}>
          {remaining} words left
        </Text>
        {!!warning && <Text style={{ color: "red" }}>{warning}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 12,
    borderRadius: 12,
    textAlignVertical: "top",
  },
});

export default CustomTextInput;

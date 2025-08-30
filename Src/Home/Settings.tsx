import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import useThemeStore from "../Store/ThemeStore";

export default function SettingsScreen() {
  const { darkMode, setDarkMode } = useThemeStore();

  // Language state
  const [language, setLanguage] = useState("English"); // default
  // Font Size state
  const [fontSize, setFontSize] = useState("Medium");
  // Theme Color state
  const [themeColor, setThemeColor] = useState("Blue");

  return (
    <SafeAreaView
      style={[
        styles.container,
        darkMode && styles.darkContainer, // Dark container apply
      ]}
    >
      <Text style={[styles.header, darkMode && styles.darkText]}>Settings</Text>

      {/* Dark Mode */}
      <View style={styles.row}>
        <Text style={[styles.label, darkMode && styles.darkText]}>Dark Mode</Text>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            { backgroundColor: darkMode ? "#0EA5E9" : "#888" },
          ]}
          onPress={() => setDarkMode(!darkMode)}
        >
          <Text style={{ color: "#fff" }}>{darkMode ? "On" : "Off"}</Text>
        </TouchableOpacity>
      </View>

      {/* Language Selection */}
      <Text style={[styles.subHeader, darkMode && styles.darkText]}>
        Language
      </Text>
      {["English", "Urdu", "German"].map((lang) => (
        <TouchableOpacity
          key={lang}
          style={styles.languageRow}
          onPress={() => setLanguage(lang)}
        >
          <View
            style={[
              styles.radioOuter,
              language === lang && { borderColor: "#0EA5E9" },
            ]}
          >
            {language === lang && <View style={styles.radioInner} />}
          </View>
          <Text style={[styles.label, darkMode && styles.darkText]}>{lang}</Text>
        </TouchableOpacity>
      ))}

      {/* Font Size */}
      <Text style={[styles.subHeader, darkMode && styles.darkText]}>
        Font Size
      </Text>
      {["Small", "Medium", "Large"].map((size) => (
        <TouchableOpacity
          key={size}
          style={styles.languageRow}
          onPress={() => setFontSize(size)}
        >
          <View
            style={[
              styles.radioOuter,
              fontSize === size && { borderColor: "#0EA5E9" },
            ]}
          >
            {fontSize === size && <View style={styles.radioInner} />}
          </View>
          <Text style={[styles.label, darkMode && styles.darkText]}>{size}</Text>
        </TouchableOpacity>
      ))}

      {/* Theme Color */}
      <Text style={[styles.subHeader, darkMode && styles.darkText]}>
        Theme Color
      </Text>
      {["Blue", "Green", "Purple"].map((color) => (
        <TouchableOpacity
          key={color}
          style={styles.languageRow}
          onPress={() => setThemeColor(color)}
        >
          <View
            style={[
              styles.radioOuter,
              themeColor === color && { borderColor: "#0EA5E9" },
            ]}
          >
            {themeColor === color && <View style={styles.radioInner} />}
          </View>
          <Text style={[styles.label, darkMode && styles.darkText]}>{color}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
    marginTop: hp("6%"),
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: hp(3),
    marginBottom: hp(1),
    color: "#000",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: hp(2),
  },
  label: {
    fontSize: 16,
    color: "#000",
  },
  darkText: {
    color: "#fff", // Dark mode text
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(1),
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#888",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#0EA5E9",
  },
  toggleButton: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
});

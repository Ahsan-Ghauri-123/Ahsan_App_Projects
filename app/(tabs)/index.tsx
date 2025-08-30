import React from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import Navigation from "../../Src/Navigator/Navigation";
import useThemeStore from "../../Src/Store/ThemeStore";

export default function Index() {
  const { darkMode } = useThemeStore(); 

  return (
      <View
      style={[
        styles.container,
        darkMode ? styles.darkContainer : styles.lightContainer,
      ]}>
      <Navigation />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  lightContainer: { backgroundColor: "#fff" },
  darkContainer: { backgroundColor: "#121212" },
});
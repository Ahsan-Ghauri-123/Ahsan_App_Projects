import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

export default function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("MainApp");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2b4eed", "#1a2b75"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
         <View style={{ alignItems: "center" }}>
        <Animatable.Image
          animation="bounceIn"
          duration={2000}
          source={require("../assets/images/book.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Animatable.Text
          animation="fadeInUp"
          delay={100}
          duration={1500}
          style={styles.text}
        >
          ZenTasks
        </Animatable.Text>
      </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    flex: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    height: hp('80%'),
    width: wp('80%'),
  },
  text: {
    color: "#fff",
    fontSize: hp('7%'),
    fontWeight: "600", fontFamily:'../assets/fonts/Roboto-Black.ttf'
  },
});

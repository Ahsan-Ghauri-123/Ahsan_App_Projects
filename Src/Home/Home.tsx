import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import useTaskStore from "../Store/useTaskStore";

export default function Home({ navigation }) {
  const { tasks, completedTasks } = useTaskStore();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2b4eed", "#1a2b75"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Animatable.Image
          animation="fadeInDown"
          duration={1500}
          delay={300}
          source={require('../../assets/images/calendar.png')}
          style={{ height: hp('30%'), width: wp('50%'), alignSelf: "center" }}
        />
        <Animatable.Text animation="fadeInLeft" duration={1200} style={styles.incomtext}>
          Incomplete Task
        </Animatable.Text>

        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: hp(2) }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Animatable.View
              animation="fadeInUp"
              duration={1000}
              delay={index * 200} 
              style={[styles.item, index === 0 && { marginTop: hp(1) }]}
            >
              <Text style={styles.title}>{item.name}</Text>
              <Text style={{ color: "gray", marginTop: 4 }}>{item.desc}</Text>
              <View style={styles.row}>
                <Text style={styles.subtitle}>
                  {item.date} | {item.time}
                </Text>
                <TouchableOpacity>
                  <AntDesign name="arrowright" size={22} color="#0EA5E9" />
                </TouchableOpacity>
              </View>
            </Animatable.View>
          )}
        />
        <Animatable.Text animation="fadeInLeft" duration={1200} style={styles.incomtexts}>
          Completed Task
        </Animatable.Text>

        <FlatList
          data={completedTasks}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: hp(12) }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Animatable.View
              animation="zoomIn"
              duration={1000}
              delay={index * 200}
              style={[styles.item, index === 0 && { marginTop: hp(1) }]}
            >
              <View style={styles.row}>
                <View>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={{ color: "gray", marginTop: 4 }}>{item.desc}</Text>
                  <Text style={styles.subtitle}>
                    {item.date} | {item.time}
                  </Text>
                </View>
                <AntDesign name="checkcircle" size={22} color="green" />
              </View>
            </Animatable.View>
          )}
        />

      </LinearGradient>
    </View>
  );
};


const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp(1),
  },
  container: { flex: 1 },
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
  },
  incomtexts: {
    color: "#fff",
    fontSize: hp('3%'),
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    marginTop: hp(2),
  },
  incomtext: {
    color: "#fff",
    fontSize: hp('3%'),
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  item: {
    marginTop: hp(1),
    backgroundColor: "#FFFFFF",
    padding: wp(3),
    borderRadius: wp(4),
  },
  title: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    color: "black",
    fontSize: 14,
    marginTop: 4,
  },
});

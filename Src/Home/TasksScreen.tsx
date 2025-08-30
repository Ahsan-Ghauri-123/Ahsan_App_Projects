import { AntDesign } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import CustomTextInput from "../../components/TextInputs/CustomTextInput";
import useTaskStore from "../Store/useTaskStore";

export default function TasksScreen() {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const { tasks, addTask } = useTaskStore();

  // States
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleCreateTask = async () => {
    if (!title || !selectedDate || !selectedTime) {
      Toast.show({
        type: "error",
        text1: "Please fill all fields ❌",
        position: "top",
        visibilityTime: 2000,
      });
      return;
    }

    // Notification
    await Notifications.scheduleNotificationAsync({
      content: { title: "Notification Title", body: "Main body content of the notification" },
      trigger: null,
    });

    // Save task
    addTask({ name: title, desc, date: selectedDate, time: selectedTime });

    setTitle("");
    setDesc("");
    setSelectedDate(null);
    setSelectedTime(null);

    bottomSheetRef.current?.close();

    Toast.show({
      type: "success",
      text1: "Task Created Successfully ✅",
      position: "top",
      visibilityTime: 2000,
    });
  };

  const snapPoints = useMemo(() => ["67%"], []);
  const handleOpenBottomSheet = useCallback(() => bottomSheetRef.current?.expand(), []);
  const handleCloseBottomSheet = useCallback(() => bottomSheetRef.current?.close(), []);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirmDate = (date) => {
    setSelectedDate(date.toDateString());
    hideDatePicker();
  };

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);
  const handleConfirmTime = (time) => {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
    setSelectedTime(formattedTime);
    hideTimePicker();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2b4eed", "#1a2b75"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Title Animation */}
        <Animatable.Text
          animation="fadeInDown"
          duration={1200}
          style={styles.incomtext}
        >
          Tasks List
        </Animatable.Text>

        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: hp(12) }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Animatable.View
              animation="fadeInUp"
              duration={1000}
              delay={index * 200} // staggered animation
              style={[styles.item, index === 0 && { marginTop: hp(3) }]}
            >
              <Text style={styles.title}>{item.name}</Text>
              <Text style={{ color: "gray", marginTop: 4 }}>{item.desc}</Text>
              <View style={styles.row}>
                <Text style={styles.subtitle}>
                  {item.date} | {item.time}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("TasksDetails", { task: item })}
                >
                  <AntDesign name="arrowright" size={22} color="#0EA5E9" />
                </TouchableOpacity>
              </View>
            </Animatable.View>
          )}
        />

        {/* FAB with bounce animation */}
        <Animatable.View animation="bounceIn" duration={1500} style={styles.fab}>
          <TouchableOpacity onPress={handleOpenBottomSheet}>
            <AntDesign name="plus" size={28} color="white" />
          </TouchableOpacity>
        </Animatable.View>
      </LinearGradient>

      {/* BottomSheet */}
      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints} enablePanDownToClose={true}>
        <BottomSheetView style={styles.sheetContent}>
          <Animatable.Text
            animation="fadeIn"
            duration={800}
            style={styles.sheetTitle}
          >
            Add New Task
          </Animatable.Text>

          <Animatable.View animation="fadeInRight" delay={300}>
            <TextInput
              placeholder="Task"
              style={styles.input}
              placeholderTextColor="#fff"
              value={title}
              onChangeText={setTitle}
            />
          </Animatable.View>

          <Animatable.View animation="fadeInLeft" delay={500}>
            <CustomTextInput
              placeholder="Write description..."
              wordLimit={100}
              placeholderTextColor="#aaa"
              textColor="#fff"
              containerStyle={{ backgroundColor: "#222", borderRadius: 10 }}
              inputStyle={{ borderColor: "#00f" }}
              value={desc}
              onChangeText={setDesc}
            />
          </Animatable.View>

          <Animatable.View animation="zoomIn" delay={700} style={styles.dateTimeRow}>
            <TouchableOpacity onPress={showDatePicker} style={styles.dateTimeBtn}>
              <Text style={styles.dateTimeText}>
                {selectedDate ? selectedDate : "Date"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={showTimePicker} style={styles.dateTimeBtn}>
              <Text style={styles.dateTimeText}>
                {selectedTime ? selectedTime : "Time"}
              </Text>
            </TouchableOpacity>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={900} style={styles.dateTimeRow}>
            <TouchableOpacity
              onPress={handleCloseBottomSheet}
              style={{
                height: hp("5%"),
                width: wp("30%"),
                borderWidth: 1,
                borderRadius: wp(2),
                alignItems: "center",
                borderColor: "#0EA5E9",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: hp(2), fontWeight: "bold", color: "#05243E" }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCreateTask}
              style={{
                height: hp("5%"),
                width: wp("30%"),
                backgroundColor: "#0EA5E9",
                borderWidth: 1,
                borderRadius: wp(2),
                alignItems: "center",
                borderColor: "#0EA5E9",
                justifyContent: "center",
              }}
            >
              <Text style={styles.dateTimeText}>Create</Text>
            </TouchableOpacity>
          </Animatable.View>
        </BottomSheetView>
      </BottomSheet>

      {/* DateTime Pickers */}
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirmDate} onCancel={hideDatePicker} />
      <DateTimePickerModal isVisible={isTimePickerVisible} mode="time" onConfirm={handleConfirmTime} onCancel={hideTimePicker} is24Hour={false} />
    </View>
  );
}


const styles = StyleSheet.create({
  fab: {
  top:hp('85%'),
  position: "absolute",
  bottom: hp(4),
  right: wp(6),
  height: hp("7%"),
  width: hp("7%"),
  borderRadius: hp("3.5%"),
  backgroundColor: "#63D9F3",
  alignItems: "center",
  justifyContent: "center",
  elevation: 5,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
},

  container: { flex: 1, backgroundColor:"#ffff" },
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
  },
  incomtext: {
    color: "#fff",
    fontSize: hp("3%"),
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    marginTop: hp(5),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp(1),
  },
  item: {
    marginTop: hp(2),
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
  },
  sheetContent: {
    flex: 1,
    alignItems: "center",
    paddingVertical: hp(2),
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#05243E",
    width: wp("80%"),
    paddingHorizontal: wp(5),
    color: "#fff",
    borderRadius: wp(2),
    height: hp("6%"),
  },
  dateTimeRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: hp(3),
    marginTop: hp(2),
  },
  dateTimeBtn: {
    height: hp("5%"),
    width: wp("35%"),
    backgroundColor: "#05243E",
    borderWidth: 1,
    borderRadius: wp(2),
    alignItems: "center",
    justifyContent: "center",
  },
  dateTimeText: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#fff",
  },
});

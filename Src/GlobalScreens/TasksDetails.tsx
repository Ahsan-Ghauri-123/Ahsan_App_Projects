import { AntDesign } from '@expo/vector-icons';
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import useTaskStore from "../Store/useTaskStore";

export default function TasksDetails({ route, navigation }) {
    const { task } = route.params;
    const { updateTask, deleteTask, completeTask } = useTaskStore();

    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState(task.name);
    const [desc, setDesc] = useState(task.desc);
    const [selectedDate, setSelectedDate] = useState(task.date || null);
    const [selectedTime, setSelectedTime] = useState(task.time || null);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const handleSave = () => {
        updateTask(task.id, { name, desc, date: selectedDate, time: selectedTime });
        setIsEditing(false);
        navigation.goBack();
        Toast.show({
            type: "success",
            text1: "Task Updated Successfully ✅",
            position: "top",
            visibilityTime: 2000,
        });
    };

    const handleCompleteTask = () => {
        completeTask(task.id);
        navigation.goBack();
        Toast.show({
            type: "success",
            text1: "Task Completed Successfully ✅",
            position: "top",
            visibilityTime: 2000,
        });
    };

    const handleDelete = () => {
        deleteTask(task.id);
        navigation.goBack();
        Toast.show({
            type: "success",
            text1: "Task Deleted Successfully ❌",
            position: "top",
            visibilityTime: 2000,
        });
    };

    // Date handlers
    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const handleConfirmDate = (date) => {
        setSelectedDate(date.toDateString());
        hideDatePicker();
    };

    // Time handlers
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
            {isEditing ? (
                <>
                    <Animatable.View animation="fadeInLeft" duration={800}>
                        <TextInput
                            style={[styles.input, { width: wp("90%") }]}  // ✅ same width
                            value={name}
                            onChangeText={setName}
                            placeholder="Task name"
                        />
                    </Animatable.View>

                    <Animatable.View animation="fadeInRight" duration={800}>
                        <TextInput
                            style={[styles.input, { height: hp("15%"), width: wp("90%"), marginTop:hp(4) }]} // ✅ same width
                            value={desc}
                            onChangeText={setDesc}
                            placeholder="Task description"
                            multiline
                        />
                    </Animatable.View>


                    <Animatable.View
                        animation="zoomIn"
                        duration={800}
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: hp(3),
                            marginTop: hp(2),
                        }}
                    >
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

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={hideDatePicker}
                    />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmTime}
                        onCancel={hideTimePicker}
                    />

                    <Animatable.View animation="bounceIn" delay={300}>
                        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                            <Text style={{ color: "#fff", fontWeight: "bold" }}>Update</Text>
                        </TouchableOpacity>
                    </Animatable.View>

                    <Animatable.View animation="bounceIn" delay={500}>
                        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
                            <Text style={{ color: "#fff", fontWeight: "bold" }}>Delete</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                </>
            ) : (
                <>
                    <Animatable.View
                        animation="fadeInDown"
                        duration={1000}
                        style={{
                            borderWidth: 1,
                            borderRadius: wp(2),
                            paddingHorizontal: wp(10),
                            paddingTop: hp(2),
                            paddingBottom: wp(2),
                        }}
                    >
                        <Text style={styles.title}>{task.name}</Text>
                        <Text style={styles.desc}>{task.desc}</Text>
                        <Text style={styles.date}>
                            {task.date ? task.date : "No Date"} | {task.time ? task.time : "No Time"}
                        </Text>
                    </Animatable.View>

                    <Animatable.View animation="fadeInUp" delay={300}>
                        <TouchableOpacity style={styles.editBtn} onPress={() => setIsEditing(true)}>
                            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: hp(2.3) }}>Edit</Text>
                        </TouchableOpacity>
                    </Animatable.View>

                    <Animatable.View animation="fadeInUp" delay={600}>
                        <TouchableOpacity style={styles.editBtn} onPress={handleCompleteTask}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ color: "#fff", fontWeight: "bold", marginRight: 6, fontSize: hp(2) }}>
                                    Complete Task
                                </Text>
                                <AntDesign name="arrowright" size={18} color="#fff" />
                            </View>
                        </TouchableOpacity>
                    </Animatable.View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 22, fontWeight: "bold" },
    desc: { fontSize: 16, marginTop: 10, color: "gray" },
    date: { fontSize: 14, marginTop: 20, color: "#0EA5E9" },
   input: {
  backgroundColor: "#fff",
  borderRadius: 10,
  paddingHorizontal: 12,
  paddingVertical: 10,
  fontSize: 16,
  alignSelf: "center", borderWidth:0.5, 
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
    editBtn: {
        backgroundColor: "#0EA5E9",
        padding: 10,
        marginTop: 20,
        borderRadius: 8,
        width: wp('40%'), height: hp('7%'),
        alignItems: "center", justifyContent: "center"
    },
    saveBtn: {
        backgroundColor: "green",
        padding: 10,
        marginTop: hp(4),
        borderRadius: 8,
        width: wp('40%'), height: hp('5%'),
        alignItems: "center", justifyContent: "center"
    },
    deleteBtn: {
        backgroundColor: "red",
        padding: 10,
        marginTop: hp(4),
        borderRadius: 8,
        alignItems: "center", width: wp('40%'), height: hp('5%'),
    },
});

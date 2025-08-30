// import { createStackNavigator } from "@react-navigation/stack";
// import Home from "../Home/Home";
// import Splash from "../Splash";

// const Stack = createStackNavigator();

// const Navigation = () => {
//   return (
//     <Stack.Navigator initialRouteName="Splash">
//       <Stack.Screen 
//         name="Splash" 
//         component={Splash} 
//         options={{ headerShown: false }} 
//       />
//       <Stack.Screen 
//         name="Home" 
//         component={Home} 
//         options={{ headerShown: false }} 
//       />
//     </Stack.Navigator>
//   );
// };

// export default Navigation;

import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import TasksDetails from "../GlobalScreens/TasksDetails";
import Home from "../Home/Home";
import Settings from "../Home/Settings";
import TasksScreen from "../Home/TasksScreen";
import Splash from "../Splash";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#63D9F3",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 80,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "#fff",
          position: "absolute",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TasksScreen"
        component={TasksScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list-alt" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainApp"
        component={BottomTabs} 
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TasksDetails"
        component={TasksDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;

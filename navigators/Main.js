import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from 'react-native';
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import AuthGlobal from "../context/store/AuthGlobal";
import { UserCircleIcon, HomeIcon } from "react-native-heroicons/solid";
import UserNavigator from "./UserNavigator";
import HomeNavigator from "./HomeNavigator";

const Tab = createBottomTabNavigator();

const Main = () => {
  const context = useContext(AuthGlobal);

  const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    return routeName?.includes("Login") ? "none" : "flex";
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#13DAE9",
        tabBarStyle: {
          display: getTabBarVisibility(route),

        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <HomeIcon color={color} size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <UserCircleIcon color={color} size={35} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;

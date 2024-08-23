import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    NavigationContainer,
    getFocusedRouteNameFromRoute,
  } from "@react-navigation/native";
import AuthGlobal from "../context/store/AuthGlobal";
import UserNavigator from "./UserNavigator";
import {
  UserCircleIcon,
  ShoppingCartIcon,
  DocumentPlusIcon,
  HomeIcon,
  Cog8ToothIcon,
  ShoppingBagIcon,
  BellIcon,
} from "react-native-heroicons/solid";

const Tab = createBottomTabNavigator();

const Main = () => {
    const context = useContext(AuthGlobal);
  
    const getTabBarVisibility = (route) => {
      const routeName = getFocusedRouteNameFromRoute(route);
      return routeName?.includes("Login") ? "none" : "flex";
    };
  
    return (
      <Tab.Navigator
        initialRouteName="User"
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#13DAE9",
        }}
      >
        <Tab.Screen
          name="User"
          component={UserNavigator}
          options={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <UserCircleIcon
                color={color}
                size={45}
              />
            ),
            tabBarStyle: {
              display: getTabBarVisibility(route),
            },
          })}
        />
      </Tab.Navigator>
    );
  };
  
  export default Main;
  
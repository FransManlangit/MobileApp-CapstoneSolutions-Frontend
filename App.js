import React, { useState, useEffect } from "react";
import { Text, View, LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, extendTheme } from "native-base";
import Auth from "./context/store/Auth";
import store from "./redux/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import Main from "./navigators/Main";

const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};

const theme = extendTheme({ colors: newColorTheme });



const App = () => {
  return (
    <Auth>
      <Provider store={store}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer>
            <Main />
            <Toast />
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </Auth>
  );
};
export default App;

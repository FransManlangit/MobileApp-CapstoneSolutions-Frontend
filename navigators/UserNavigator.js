import React, { useContext } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Start from "../screens/user/Start";
import Login from "../screens/user/Login";
import UserProfile from "../screens/user/UserProfile";
import AuthGlobal from "../context/store/AuthGlobal"

const Stack = createStackNavigator();

const UserNavigator = () => {
    const context = useContext(AuthGlobal);
  
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { flex: 1 },
        }}
      >
        {context.stateUser.isAuthenticated ? (
          <Stack.Screen name="UserProfile" component={UserProfile} />
        ) : (
          <>
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="Login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    );
  };
  
  export default UserNavigator;
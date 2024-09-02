import React, { useContext } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Start from "../screens/user/Start";
import Login from "../screens/user/Login";
import UserProfile from "../screens/user/UserProfile";
import AuthGlobal from "../context/store/AuthGlobal";

const Stack = createStackNavigator();

const UserNavigator = (props) => {
    const context = useContext(AuthGlobal);
     console.log(context, "constext");
  
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { flex: 1 },
        }}
      >
      
      {context.stateUser.isAuthenticated ? (
        <>
          <Stack.Screen
            name="UserProfile"
            options={{ headerShown: false }}
            component={UserProfile}
          ></Stack.Screen>
         
        </>
      ) : (
        <>
          <Stack.Screen
            name="Start"
            options={{ headerShown: false }}
            component={Start}
          ></Stack.Screen>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          ></Stack.Screen>
         
        </>
      )}
        
       
      </Stack.Navigator>
    );
  };
  
  export default UserNavigator;
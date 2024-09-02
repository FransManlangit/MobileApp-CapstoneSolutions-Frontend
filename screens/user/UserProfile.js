import React, { useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AuthGlobal from "../../context/store/AuthGlobal";
import { logoutUser } from "../../context/actions/Auth.Actions";
import { useSelector, useDispatch } from "react-redux";

const UserProfile = () => {
  const navigation = useNavigation();
  const context = useContext(AuthGlobal);
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState("");
  const [image, setImage] = useState("");

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        navigation.navigate("Login");
      }

      const fetchData = async () => {
        try {
          const jwtToken = await AsyncStorage.getItem("jwt");
          const response = await axios.get(
            `${baseURL}users/${context.stateUser.user.userId}`,
            {
              headers: { Authorization: `Bearer ${jwtToken}` },
            }
          );

          setUserProfile(response.data);
          // setImage(response.data.avatar?.url || "");
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();

      return () => {
        setUserProfile("");
        setImage("");
      };
    }, [context.stateUser.isAuthenticated])
  );
  console.log(context.stateUser.isAuthenticated, "isAuthenticated");
  console.log(context.stateUser.user, "User Data");
  console.log(userProfile, "UserProfile Data");

  console.log(context, "context");
  return (
    <SafeAreaView className="bg-white h-full p-4">
      <ScrollView>
        <View className="px-5 flex-row items-center space-x-4 py-20">
          <View className="rounded-full pb-8">
            <Image
              className="rounded-full h-28 w-28"
              source={
                userProfile.avatar?.url
                  ? { uri: userProfile.avatar?.url }
                  : "https://res.cloudinary.com/dn638duad/image/upload/v1698419194/Beige_and_Charcoal_Modern_Travel_Itinerary_A4_Document_v9fz8j.png"
              }
            />
          </View>
          <View className="flex">
            <Text className="font-bold italic text-lg">
              {" "}
              {userProfile
                ? `${userProfile.firstname} ${userProfile.lastname}`
                : ""}
            </Text>
            <Text className="text-black text-s text-center">
              {userProfile ? userProfile.email : ""}
            </Text>
          </View>
        </View>
        <View className="pt-72">
          <TouchableOpacity
            className="bg-[#13DAE9] rounded-xl min-h-[62px] justify-center items-center"
            onPress={async () => {
              await AsyncStorage.removeItem("jwt");
              logoutUser(context.dispatch);
              navigation.navigate("Login");
            }}
          >
            <Text className="text-white font-semibold text-lg">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;

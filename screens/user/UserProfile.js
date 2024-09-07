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
import {
  CubeIcon,
  Cog6ToothIcon,
  SquaresPlusIcon,
  ArchiveBoxIcon,
} from "react-native-heroicons/solid";

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
    <SafeAreaView className="bg-white h-full w-full">
      <ScrollView>
        <View className="px-4 flex-row items-center space-x-4 py-8">
          <View className="rounded-full ">
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
        <View className="items-center pb-4">
          <TouchableOpacity
            className="p-2 bg-transparent rounded-full border-2 border-[#B1B6B7]"
            onPress={() =>
              navigation.navigate("UpdateProfile", { user: userProfile })
            }
          >
            <Text className="text-zinc-600 font-normal text-lg underline decoration-black">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        <View className="pl-16 flex-row space-x-6 items-center">
          <TouchableOpacity className="items-center">
            <CubeIcon color="#B1B6B7" size={35} />
            <Text className="text-xs pt-2">Orders</Text>
          </TouchableOpacity>
          <View className="h-16 w-px bg-gray-300 my-4" />
          <TouchableOpacity className="items-center"
            onPress={() => navigation.navigate("PricingPlans")}
          >
            <SquaresPlusIcon color="#B1B6B7" size={35} />
            <Text className="text-xs pt-2">Pricing Plans</Text>
          </TouchableOpacity>
          <View className="h-16 w-px bg-gray-300 my-4" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}
            className="items-center"
          >
            <Cog6ToothIcon color="#B1B6B7" size={35} />
            <Text className="text-xs pt-2">Settings</Text>
          </TouchableOpacity>
        </View>
        {/* <View className="pt-72">
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
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;

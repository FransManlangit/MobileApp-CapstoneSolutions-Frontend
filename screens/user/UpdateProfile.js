import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import AuthGlobal from "../../context/store/AuthGlobal";
import {
  ChevronLeftIcon,
  ExclamationCircleIcon,
  CameraIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, Radio } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

const UpdateProfile = (props) => {
  let navigation = useNavigation();
  const [user, setUser] = useState(props.route.params.user);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [image, setImage] = useState("");
  const [mainImage, setMainImage] = useState();
  const [token, setToken] = useState();

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFirstname(user.firstname || "");
    setLastname(user.lastname || "");
    setMainImage(user.avatar?.url || "");
    setImage(user.avatar?.url || "");

    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, [user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets);
      setMainImage(result.assets[0].uri);
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!firstname) errors.firstname = "Please enter a First Name";
    if (!lastname) errors.lastname = "Please enter a Last Name";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const updateProfile = (id) => {
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    let formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);

    if (mainImage == undefined) {
    } else if (mainImage !== image) {
      const newImageUri = "file:///" + mainImage.split("file:/").join("");

      formData.append("image", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop(),
      });
    }
    console.log(formData, "update user");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(`${baseURL}users/userProfile/${id}`, formData, config)
      .then((res) => {
        setIsLoading(false);

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Profile updated successfully!",
        });

        navigation.navigate("UserProfile");
      })
      .catch((error) => {
        setIsLoading(false);

        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response.data.message,
        });
      });
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView>
        <View className="flex-1 justify-start bg-[#ffffff]">
          <View className="flex-row justify-between items-center w-full absolute">
            <TouchableOpacity
              className="rounded ml-4 mt-4"
              onPress={() => navigation.goBack()}
            >
              <View className="bg-[#ffffff] rounded-full p-1 flex-row items-center">
                <ChevronLeftIcon size={28} color="black" />
                <Text className="text-black">Back</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="flex flex-row justify-center mt-16">
            <TouchableOpacity onPress={pickImage}>
              <View style={{ position: "relative" }}>
                <Image
                  source={
                    mainImage
                      ? { uri: mainImage }
                      : require("../../assets/images/logo.jpg")
                  }
                  style={{ width: 120, height: 120 }}
                  className="rounded-full"
                />

                <View
                  style={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    backgroundColor: "#ffffff",
                    width: 40,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 2,
                    borderColor: "#13DAE9",
                    borderRadius: 20,
                  }}
                >
                  <CameraIcon size={20} color="gray" />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View className="flex-1 bg-white mt-5">
            <View className="form space-y-4 p-5 mt-5">
              <Text className="text-2xl font-bold text-[#13DAE9]">
                Update Profile
              </Text>

              {/* First Name Input */}
              <View className="relative">
                <Text className="mb-3">First Name</Text>
                <TextInput
                  className={
                    errors.firstname
                      ? "border border-red-500 p-4 bg-gray-100 text-gray-700 rounded-full mb-1"
                      : "p-4 bg-white text-gray-700 rounded-full border mb-3"
                  }
                  placeholder="Enter First Name"
                  name={"firstname"}
                  id={"firstname"}
                  value={firstname}
                  onChangeText={(text) => setFirstname(text)}
                />
                {errors.firstname ? (
                  <View className="flex flex-row items-center space-x-1">
                    <ExclamationCircleIcon size={15} color="red" />
                    <Text className="text-sm text-red-500">
                      {errors.firstname}
                    </Text>
                  </View>
                ) : null}
              </View>

              {/* Last Name Input */}
              <View className="relative">
                <Text className="mb-3">Last Name</Text>
                <TextInput
                  className={
                    errors.lastname
                      ? "border border-red-500 p-4 bg-gray-100 text-gray-700 rounded-full mb-1"
                      : "p-4 bg-white text-gray-700 rounded-full border mb-3"
                  }
                  placeholder="Enter Last Name"
                  name={"lastname"}
                  id={"lastname"}
                  value={lastname}
                  onChangeText={(text) => setLastname(text)}
                />
                {errors.lastname ? (
                  <View className="flex flex-row items-center space-x-1">
                    <ExclamationCircleIcon size={15} color="red" />
                    <Text className="text-sm text-red-500">
                      {errors.lastname}
                    </Text>
                  </View>
                ) : null}
              </View>

              <TouchableOpacity
                className={
                  isLoading
                    ? "bg-zinc-500 py-4 rounded-2xl"
                    : "bg-[#13DAE9] py-4 rounded-2xl"
                }
                onPress={() => updateProfile(user.id)}
                disabled={isLoading ? true : false}
              >
                <View className="flex flex-row space-x-2 items-center justify-center">
                  <Text className="font-xl font-bold text-center text-white">
                    {isLoading ? "Loading..." : "Update"}
                  </Text>

                  {isLoading && (
                    <ActivityIndicator size="small" color="white" />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProfile;

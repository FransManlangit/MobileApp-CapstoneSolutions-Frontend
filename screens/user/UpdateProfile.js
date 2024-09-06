import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
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
  import { ChevronLeftIcon, PencilIcon } from "react-native-heroicons/solid";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { Stack, Radio } from "native-base";
  
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
  
      if (!firstname) errors.firstname = "First name is required";
      if (!lastname) errors.lastname = "Last name is required";
     
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
      <SafeAreaView>
<Text>EDIT PROFILE</Text>
      </SafeAreaView>
    );
  };
  
  export default UpdateProfile;
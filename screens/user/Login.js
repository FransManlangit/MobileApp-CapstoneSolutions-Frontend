import { useState, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthGlobal from "../../context/store/AuthGlobal";
import { loginUser } from "../../context/actions/Auth.Actions";
import * as Yup from "yup";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import { AntDesign } from "@expo/vector-icons";

const Login = () => {
  const navigation = useNavigation();
  const context = useContext(AuthGlobal);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    const user = {
      email: values.email.toLowerCase(),
      password: values.password,
    };

    if (!user.email || !user.password) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Warning!",
        text2: "Please fill in your credentials",
      });
    } else {
      loginUser(user, context.dispatch);
    }
  };

  useEffect(() => {
    if (context.stateUser.isAuthenticated) {
      navigation.navigate("UserProfile");
    }
  }, [context.stateUser.isAuthenticated]);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => {
            const [showPassword, setShowPassword] = useState(false);

            return (
              <View
                className="w-full flex justify-center h-full px-4 my-6"
                style={{ minHeight: Dimensions.get("window").height - 100 }}
              >
                <View className="items-center ">
                <Image
                    className="w-[150px] h-[120px]"
            resizeMode="contain"
                  source={require("../../assets/images/StartLogo.png")}
                 
                />
                </View>
                
                 <Text className="text-2xl font-semibold text-black mt-10 font-semibold">
            Log in to Capstone Solutions
          </Text>
                <View className="space-y-2 mt-7">
                  <Text className="text-base text-black font-medium">
                    Email
                  </Text>
                  <View
                    className={`w-full h-16 px-4 bg-black-100 rounded-2xl border ${
                      touched.email && errors.email
                        ? "border-red-500"
                        : "border-black-200"
                    } flex flex-row items-center`}
                  >
                    <TextInput
                      className="flex-1 text-black font-semibold text-base"
                      value={values.email}
                      placeholder="Enter your email"
                      placeholderTextColor="#7B7B8B"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      keyboardType="email-address"
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text className="text-red-500">{errors.email}</Text>
                  )}
                </View>

                <View className="space-y-2 mt-7">
                  <Text className="text-base text-black font-medium">
                    Password
                  </Text>
                  <View
                    className={`w-full h-16 px-4 bg-black-100 rounded-2xl border ${
                      touched.password && errors.password
                        ? "border-red-500"
                        : "border-black-200"
                    } flex flex-row items-center`}
                  >
                    <TextInput
                      className="flex-1 text-black font-semibold text-base"
                      value={values.password}
                      placeholder="Enter your password"
                      placeholderTextColor="#7B7B8B"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={{ paddingHorizontal: 10 }}
                    >
                      <AntDesign
                        name={showPassword ? "eye" : "eyeo"}
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text className="text-red-500">{errors.password}</Text>
                  )}
                </View>

                <View className="py-10">
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    activeOpacity={0.7}
                    className="bg-[#13DAE9] rounded-xl min-h-[62px] justify-center items-center"
                  >
                    <Text className="text-white font-semibold text-lg">
                      Guest
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

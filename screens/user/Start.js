import React from "react";

import { View, Text, Image, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Start({ navigation }) {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full items-center justify-center min-h-[85vh] px-4">
          <Image
            className="h-40"
            resizeMode="contain"
            source={require("../../assets/images/StartLogo.png")}
          />

          <Image
            className="max-w[380px] w-full h-[300px]"
            resizeMode="contain"
            source={require("../../assets/images/StartPic2.png")}
          />

          <View className="relative mt-5">
            <Text className="text-xl text-black font-bold text-center">
              Transforming ideas into achievements{" "}
              <Text className="text-2xl text-[#13DAE9]">Capstone Solution</Text>
            </Text>
            <Text className="text-sm font-regular text-black mt-7 text-center">
              Supports your path to academic excellence and elevate your
              academic journey with precision and guidance.
            </Text>
            <View className="py-10">
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                activeOpacity={0.7}
                className="bg-[#13DAE9] rounded-xl min-h-[62px] justify-center items-center"
              >
                <Text className="text-white font-semibold text-lg">Guest</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

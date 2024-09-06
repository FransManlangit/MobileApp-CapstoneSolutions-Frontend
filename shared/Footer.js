import React, { useEffect, useState, useRef } from "react";
import { Image, View, FlatList, Dimensions, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Footer = () => {
  return (
    <View className="py-8 bg-gray-100">
      <Text className="text-[#13DAE9] font-bold text-2xl mb-4 text-center">
        Meet the Developers
      </Text>
      <Text className="text-gray-700 text-sm mb-8 text-center leading-6">
        {" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit numquam
        eligendi quos.
      </Text>
      <View className="flex-row">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-3"
      >
       
      <View className="flex-row flex-wrap justify-center">
        <View className="'w-1/2 lg:w-1/4 p-4 items-center">
          <Image
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            source={require("../assets/images/lija.jpg")}
          />
          <Text className="text-base">Elija Reigne Monterona</Text>
          <Text className="text-xs text-zinc-500">Fullstack Mobile Developer</Text>
          <View className="w-4/5 h-px bg-gray-300 my-4"/>
        </View>
      </View>
      <View className="flex-row flex-wrap justify-center">
        <View className="'w-1/2 lg:w-1/4 p-4 items-center">
          <Image
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            source={require("../assets/images/frans.jpeg")}
          />
          <Text className="text-base">Frans Adryhel Manlangit</Text>
          <Text className="text-xs text-zinc-500">Fullstack Mobile Developer</Text>
          <View className="w-4/5 h-px bg-gray-300 my-4"/>
        </View>
      </View>
      <View className="flex-row flex-wrap justify-center">
        <View className="'w-1/2 lg:w-1/4 p-4 items-center">
          <Image
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            source={require("../assets/images/nov.jpg")}
          />
          <Text className="text-base">Novemger Pascua</Text>
          <Text className="text-xs text-zinc-500">Fullstack Web Developer</Text>
          <View className="w-4/5 h-px bg-gray-300 my-4"/>
        </View>
      </View>
      <View className="flex-row flex-wrap justify-center">
        <View className="'w-1/2 lg:w-1/4 p-4 items-center">
          <Image
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            source={require("../assets/images/pres.jpg")}
          />
          <Text className="text-base"> Daniel Angelo Rodriguez</Text>
          <Text className="text-xs text-zinc-500">Fullstack Web Developer</Text>
          <View className="w-4/5 h-px bg-gray-300 my-4"/>
        </View>
      </View>
      </ScrollView>
      </View>
      
    </View>
  );
};

export default Footer;

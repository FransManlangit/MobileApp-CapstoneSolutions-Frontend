import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon, ShoppingCartIcon } from "react-native-heroicons/solid";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";


const PricingPlans = () => {
const navigation = useNavigation();


  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="py-4 bg-white">
        <TouchableOpacity
            className="rounded ml-4 mt-4 w-8"
            onPress={() => navigation.goBack()}
          >
            <View className="flex-row items-center rounded-full bg-zinc-200 p-1">
              <ChevronLeftIcon size={wp(6)} color="gray" />
              
            </View>
          </TouchableOpacity>
          <Text className="text-2xl font-bold mb-4 text-center">
            Pricing Plans
          </Text>
          <Text className="text-sm text-gray-500 mb-6 text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
            numquam eligendi quos.
          </Text>

          {/* Horizontal ScrollView for Plans */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}  // Add padding to ensure spacing
          >
            <View className="flex flex-row space-x-4">
              {/* Basic Plan */}
              <View className="w-72 bg-zinc-200 shadow-md rounded-lg p-4">
                <Text className="text-base font-semibold text-black mb-2">
                  Basic
                </Text>
                <Text className="text-gray-500 text-sm">
                  Basic Functionalities
                </Text>
                <View className="my-3 border-t border-gray-300" />
                <Text className="text-base font-bold text-black">₱ 8,000</Text>
                <View className="my-3 border-t border-gray-300" />
                <View className="pb-24">
                  <Text className="mb-2">
                    <Text className="text-green-500 text-xs">✔</Text> Crud
                    (Create-Read-Update-Delete)
                  </Text>
                </View>
                <TouchableOpacity className="bg-[#13DAE9] p-3 rounded-lg mt-4">
                  <Text className="text-white text-center">Buy Now</Text>
                </TouchableOpacity>
              </View>

              {/* Premium Plan */}
              <View className="w-72 bg-zinc-200 shadow-md rounded-lg p-4">
                <Text className="text-base font-semibold text-black mb-2">
                  Premium
                </Text>
                <Text className="text-gray-500 text-sm">
                  Advanced Functionalities
                </Text>
                <View className="my-3 border-t border-gray-300" />
                <Text className="text-base font-bold text-black">₱ 12,000</Text>
                <View className="my-3 border-t border-gray-300" />
                <View className="pb-12">
                  <Text className="mb-2">
                    <Text className="text-green-500 text-xs">✔</Text> Crud
                    (Create-Read-Update-Delete)
                  </Text>
                  <Text className="mb-2">
                    <Text className="text-green-500 text-xs">✔</Text>{" "}
                    Authentication
                  </Text>
                  <Text className="mb-2">
                    <Text className="text-green-500 text-xs">✔</Text>{" "}
                    Analytics/Reports/Charts (3)
                  </Text>
                </View>
                <TouchableOpacity className="bg-[#13DAE9] p-3 rounded-lg mt-4">
                  <Text className="text-white text-center">Buy Now</Text>
                </TouchableOpacity>
              </View>

              {/* Enterprise Plan */}
              <View className="w-72 bg-zinc-200 shadow-md rounded-lg p-4">
                <Text className="text-base font-semibold text-black mb-2">
                  Enterprise
                </Text>
                <Text className="text-gray-500 text-sm">
                  Full Functionalities
                </Text>
                <View className="my-3 border-t border-gray-300" />
                <Text className="text-base font-bold text-black">₱ 15,000</Text>
                <View className="my-3 border-t border-gray-300" />
                <View className="pb-6">
                  <Text className="mb-2">
                    <Text className="text-green-500 text-xs">✔</Text> Crud
                    (Create-Read-Update-Delete)
                  </Text>
                  <Text className="mb-2">
                    <Text className="text-green-500 text-xs">✔</Text>{" "}
                    Authentication
                  </Text>
                  <Text className="mb-2">
                    <Text className="text-green-500 text-xs">✔</Text>{" "}
                    Analytics/Reports/Charts
                  </Text>
                  <Text className="mb-2">
                    <Text className="text-green-500 text-xs">✔</Text> Deployment
                  </Text>
                </View>
                <TouchableOpacity className="bg-[#13DAE9] p-3 rounded-lg mt-4">
                  <Text className="text-white text-center">Buy Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PricingPlans;

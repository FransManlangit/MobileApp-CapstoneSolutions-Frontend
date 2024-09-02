import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Swiper from "react-native-swiper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon, ShoppingCartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import * as actions from "../../redux/actions/CartActions";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";


const SingleProduct = (props) => {
  const [item] = useState(props.route.params.item);
  const dispatch = useDispatch();

  const formattedPrice = `₱${Number(item.price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

 
  const navigation = useNavigation();

  return (
  <View className="flex-1 w-full h-full bg-white">
      <ScrollView className="flex-1">
        <Swiper
          style={{ height: hp(55), backgroundColor: 'white' }}
          showsButtons={false}
          paginationStyle={{ bottom: 10 }}
          className="bg-zinc-100"
        >
          {item.images.map((image, index) => (
            <Image
              key={index}
              style={{ width: wp(100), height: hp(55) }}
              source={
                image.url
                  ? { uri: image.url }
                  : require("../../assets/images/logo.jpg")
              }
              alt={`product image ${index}`}
              resizeMode="contain"
            />
          ))}
        </Swiper>

        <SafeAreaView className="flex-row justify-between items-center w-full absolute">
          <TouchableOpacity
            className="rounded ml-4 mt-4 "
            onPress={() => navigation.goBack()}
          >
            <View className="flex-row items-center rounded-full p-1">
              <ChevronLeftIcon size={wp(6)} color="black" />
              <Text className="text-black font-bold">Back</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>

        <View className="flex-1 bg-white p-4">
          <Text className="text-[#13DAE9] font-extrabold text-2xl tracking-wider">
            {formattedPrice}
          </Text>

          <View className="flex flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-lg font-semibold">{item.projectTitle}</Text>
            </View>
          </View>

          <View className="mt-4">
            <Text className="text-zinc-600 tracking-wider">
              {item.description}
            </Text>
          </View>
          
          {/* <View className="mt-4">
            <Text className="text-red-500 text-xs tracking-wider">
              Notes: Our product warranty only covers services we perform during
              assembly on your motorcycle. Online orders or third-party
              assemblies are not included. Thank you.
            </Text>
          </View> */}

          <View className="border-b border-zinc-200 mt-3" />
        </View>
      </ScrollView>

      {item.activation ? (
        <View className="flex flex-row justify-between items-center space-x-2 p-3 px-5 bg-white shadow-lg rounded-t-3xl">
        
          <TouchableOpacity
            className="flex flex-row items-center justify-center rounded-lg p-3 bg-[#13DAE9]  space-x-3 grow"
            onPress={() => {
              dispatch(actions.addToCart({ ...item, quantity: 1 }));
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: `${item.projectTitle} added to Cart`,
                text2: "Go to your cart to complete order",
              });
            }}
          >
            <Text className="font-semibold text-white text-base">
              Add to cart
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          className="bg-gray-500 mb-3 mx-auto flex justify-center items-center rounded-full"
          style={{ height: wp(15), width: wp(55) }}
        >
          <Text className="font-bold text-white text-lg">
            Currently Unavailable
          </Text>
        </View>
      )}
    </View>
  );
};

export default SingleProduct;

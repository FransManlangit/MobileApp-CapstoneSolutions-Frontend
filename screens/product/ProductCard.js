import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { useDispatch } from "react-redux";



const ProductCard = (props) => {
  const { projectTitle, description, price, images, type, activation } = props;
  const dispatch = useDispatch();

  const formattedPrice = `₱${Number(price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <View
      style={{
        borderRadius: 10,
        padding: 0,
        marginBottom: 2,
      }}
      className="rounded-xl bg-white overflow-hidden"
    >
      <View>
        <View className="">
          <Image
            style={{
              width: "100%",
              height: 185,
              marginBottom: 8,
              opacity: activation ? 1 : 0.4,
            }}
            contentFit="cover"
            transition={1000}
            source={
              images[0]?.url
                ? { uri: images[0].url }
                : require("../../assets/images/logo.jpg")
            }
          />
        </View>
      </View>
      <View className="p-2">
        <Text style={{ fontSize: 16 }} numberOfLines={1} ellipsizeMode="tail">
          {projectTitle}
        </Text>

        <View className="my-2">
          <Text style={{ fontSize: 10 }} numberOfLines={2} ellipsizeMode="tail">
            {description}
          </Text>
        </View>
        <View className="my-2">
          <Text style={{ fontSize: 10 }} numberOfLines={2} ellipsizeMode="tail">
            {type}
          </Text>
        </View>

        <View className="flex flex-row justify-between items-center ">
          <Text className="text-base font-bold text-[#13DAE9]">
            {formattedPrice}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, Center, FlatList } from "native-base";

import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import ProductList from "./ProductList";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import SearchedProduct from "./SearchedProduct";
import { EnvelopeIcon, BellAlertIcon } from "react-native-heroicons/solid";
import Footer from "../../shared/Footer";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [focus, setFocus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [productsFiltered, setProductsFiltered] = useState([]);
  const navigation = useNavigation();

  const searchProduct = (text) => {
    setSearchText(text);
    setProductsFiltered(
      products.filter((i) => i.projectTitle.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const closeList = () => {
    setFocus(false);
    setSearchText("");
  };

  useFocusEffect(
    useCallback(() => {
      setFocus(false);

      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProducts(res.data);
          setProductsFiltered(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Api products call error!");
          console.log(error);
        });

      return () => {
        setFocus(false);
        setSearchText("");
        setProducts([]);
        setProductsFiltered([]);
      };
    }, [])
  );

  return (
    <>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <SafeAreaView>
          <ScrollView className="bg-gray-100">
            <View className="bg-[#B1B6B7] flex-1 p-4 flex-row">
              <View>
            <Text className="text-white font-bold text-base">Create the screens</Text>
            <Text className="text-white font-bold text-base">your visitors deserves to see</Text>
            </View>
            <View className="pl-16 flex-row space-x-4">
            <TouchableOpacity>
              <EnvelopeIcon color="#ffffff" size={25}/>
            </TouchableOpacity>
            <TouchableOpacity>
             <BellAlertIcon color="#ffffff" size={25}/>
            </TouchableOpacity>
            </View>
            </View>
            <View className="mt-3">
              <View className="flex-row items-center space-x-2 px-2 pb-1">
                <View
                  className={
                    focus
                      ? "flex-row flex-1 items-center p-2 rounded-lg border border-red-500 bg-white"
                      : "flex-row flex-1 items-center p-2 rounded-lg bg-white"
                  }
                >
                  <View className="p-1">
                    <MagnifyingGlassIcon
                      color="#52525b"
                      size={20}
                      strokeWidth={5}
                    />
                  </View>

                  <TextInput
                    className="flex-1 ml-2 tracking-wider"
                    placeholder="Search..."
                    onFocus={openList}
                    value={searchText}
                    onChangeText={(text) => searchProduct(text)}
                  />

                  {focus ? (
                    <TouchableOpacity onPress={closeList} className="rounded-full">
                      <View className="mr-2">
                        <XMarkIcon color="gray" size={20} strokeWidth={3} />
                      </View>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>

              {focus ? (
                <SearchedProduct productsFiltered={productsFiltered} />
              ) : (
                <View>
                  <View className="p-2">
                  
                  </View>

                  <View className="p-2 mt-2 mb-1">
                    <View className="flex-row items-center justify-between">
                      <Text className="font-bold text-xl">Products</Text>
                    </View>
                  </View>

                  <View className="flex-row flex-wrap px-1">
                    <FlatList
                      data={productsFiltered}
                      renderItem={({ item }) => <ProductList key={item._id} item={item} />}
                      keyExtractor={(item) => item._id}
                      numColumns={2}
                      contentContainerStyle={{ paddingHorizontal: 1 }}
                      ListEmptyComponent={
                        <Center flex={1}>
                          <Text>No products found</Text>
                        </Center>
                      }
                    />
                  </View>
                </View>
              )}
            </View>
            <Footer/>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default ProductContainer;

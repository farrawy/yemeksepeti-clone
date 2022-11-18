import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectBasketItems,
  selectBasketItemsWithId,
  selectBasketTotal,
} from "../features/basketSlice";
import Currency from "react-currency-formatter";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        className={`mx-5 bg-[#fa0050] p-3 rounded-lg flex-row items-center space-x-1 `}
        onPress={() => navigation.navigate("Basket")}
      >
        <Text className="text-white font-extrabold text-lg py-1 px-2">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          Sepete Git
        </Text>
        <Text className="text-lg text-white font-extrabold">
          <Currency quantity={basketTotal} currency="TRY" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;

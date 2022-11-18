import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import colors from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBasketItemsWithId,
  addToBasket,
  removeFromBasket,
} from "../features/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();

  const [imageLoaded, setImageLoaded] = useState(false);

  const imageLoading = () => {
    setTimeout(() => {
      setImageLoaded(false);
      setImageLoaded(true);
    }, 1000);
  };

  const addItemsToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemsFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 ${
          (isPressed || items.length > 0) && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">
              <Currency quantity={price} currency="TRY" />
            </Text>
          </View>

          {/* Image */}
          <View>
            <Image
              source={
                imageLoaded
                  ? { uri: urlFor(image).url() }
                  : require("../assets/image-loading.gif")
              }
              className="h-20 w-20 bg-gray-300 p-4"
              onLoad={() => imageLoading()}
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* Buttons Popup View */}
      {(isPressed || items.length > 0) && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity
              onPress={removeItemsFromBasket}
              disabled={!items.length}
            >
              <MinusCircleIcon
                size={40}
                color={items.length > 0 ? colors.primary : "gray"}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemsToBasket}>
              <PlusCircleIcon size={40} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;

import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { HeartIcon, MapPinIcon } from "react-native-heroicons/outline";
import { HeartIcon as Liked } from "react-native-heroicons/solid";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../constants/colors";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";
import { useState } from "react";

const priceRange = [
  {
    name: "low",
    value: "₺",
  },
  {
    name: "medium",
    value: "₺₺",
  },
  {
    name: "high",
    value: "₺₺₺",
  },
];

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
  minimum_order_price,
  delivery_fee,
  ratings,
  time_to_deliver,
  price_range,
}) => {
  const navigation = useNavigation();
  const _priceRange = price_range.toLowerCase();

  const [imageLoaded, setImageLoaded] = useState(false);

  const [liked, setLiked] = useState(false);

  const imageLoading = () => {
    setImageLoaded(true);
  };

  const priceRangeFilter = priceRange.find((item) => item.name === _priceRange);
  return (
    <TouchableOpacity
      className="bg-white mr-3 shadow rounded-lg w-72"
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
          minimum_order_price,
          delivery_fee,
          ratings,
          time_to_deliver,
          price_range,
        });
      }}
    >
      <Image
        source={
          imageLoaded
            ? { uri: urlFor(imgUrl).url() }
            : require("../assets/image-loading.gif")
        }
        onLoad={() => imageLoading()}
        className="h-36 w-full rounded-t-lg"
      />
      <TouchableOpacity
        onPress={() => setLiked(!liked)}
        className="absolute bg-white w-7 h-7 right-2 top-2 rounded-full items-center justify-center "
      >
        {liked ? (
          <Liked size={20} color={colors.primary} />
        ) : (
          <HeartIcon size={20} color={colors.primary} />
        )}
      </TouchableOpacity>

      <View className="px-3 pb-4">
        <View className="flex-row items-center justify-between">
          <Text className="font-bold text-lg pt-2 text-center ">{title}</Text>
          <View className="flex-row items-center justify-center mt-2">
            <StarIcon color={colors.primary} opacity={0.8} size={16} />
            <Text>{rating}</Text>
            <Text className="text-gray-500">({ratings}+)</Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-1">
          <Text>
            <Text className="text-sm" style={{ color: colors.black }}>
              {priceRangeFilter.value}
            </Text>{" "}
            • {genre}
          </Text>
        </View>

        {/* Location Marker */}
        <View className="flex-row items-center ">
          <Text className="text-gray-500">
            <Currency quantity={minimum_order_price} currency="TRY" /> min.
            sepet tutarı •{" "}
          </Text>
          <View className="flex-row ">
            <MaterialIcons name="delivery-dining" size={18} color="gray" />
            <Text className=" text-gray-500">
              <Currency quantity={delivery_fee} currency="TRY" />
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;

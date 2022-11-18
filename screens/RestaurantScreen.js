import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import colors from "../constants/colors";
import {
  ClockIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import DishRow from "../components/DishRow";
import Currency from "react-currency-formatter";
import BasketIcon from "../components/BasketIcon";
import { useSelector, useDispatch } from "react-redux";
import { selectBasketItems } from "../features/basketSlice";
import { useEffect } from "react";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageLoading = () => {
    setImageLoaded(true);
  };
  const {
    params: {
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
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
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
      })
    );
  }, [dispatch]);

  const items = useSelector(selectBasketItems);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      {items.length > 0 ? <BasketIcon /> : null}

      <ScrollView>
        <View className="relative">
          <Image
            source={
              imageLoaded
                ? { uri: urlFor(imgUrl).url() }
                : require("../assets/image-loading.gif")
            }
            className="w-full h-56 bg-gray-300 p-4 "
            onLoad={() => imageLoading()}
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <Text className="font-semibold text-gray-600 my-1">
              Minimum Teslimat tutarı{" "}
              <Currency quantity={minimum_order_price} currency={"TRY"} />
            </Text>
            <View className="flex-row space-x-2 my-1">
              <Text className="text-sm text-gray-500">
                {rating}/10{" "}
                <StarIcon size={16} color={colors.primary} opacity={0.8} />
              </Text>
              <Text className="text-gray-500 text-sm">
                {ratings}+ Değerlendirmeler
              </Text>
            </View>
          </View>
          <View className="flex-row my-2 items-center px-4">
            <View className="flex-row items-center space-x-1 flex-1">
              <ClockIcon color={colors.primary} />
              <Text className="font-bold">Teslimat {time_to_deliver} dk.</Text>
            </View>
            <Text className="text-gray-400 font-bold">Degistir</Text>
          </View>

          {/* Have an allergy Button */}
          <TouchableOpacity className="flex-row items-center space-x-1 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
            <Text className="pl-2 flex-1  font-bold">
              Gıda alerjiniz var mı?
            </Text>
            <ChevronRightIcon color={colors.primary} size={20} />
          </TouchableOpacity>
        </View>

        {/* Dishes rows */}
        <View className="pb-36">
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>

        <StatusBar style="light" />
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;

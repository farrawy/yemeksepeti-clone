import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { selectRestaurant } from "../features/restaurantSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import colors from "../constants/colors";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const total = useSelector(selectBasketTotal);
  const [restaurantId, setRestaurantId] = useState([]);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    restaurant.dishes?.map((dish) => {
      setRestaurantId(dish._id);
    });

    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      console.log(results[item.id]);
      console.log(restaurantId);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#fa0050] bg-white shadow-sm">
          <View>
            <Text className="text-lg font-bold text-center">Sepetim</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            className="rounded-full bg-gray-100 absolute top-3 left-5"
            onPress={navigation.goBack}
          >
            <XCircleIcon color={colors.primary} height={50} width={50} />
          </TouchableOpacity>
        </View>

        {/*  */}
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5 mx-4 rounded-lg shadow-md">
          <Image
            source={{
              uri: "https://scontent.fsaw3-1.fna.fbcdn.net/v/t1.6435-9/60061795_654763151654624_9155913979128709120_n.png?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0njYlH5g0bEAX94CmgF&_nc_ht=scontent.fsaw3-1.fna&oh=00_AfAI4jG9b7ZzLWZQXhqPfZtfIa-6rW64zNvHJrsSfXP6Sw&oe=639CC33E",
            }}
            className="h-16 w-16 bg-gray-300 p-4 rounded-lg"
          />
          <View className="flex-1">
            <Text>Teslimat Suresi</Text>
            <Text className="font-bold">
              Hemen ({restaurant.time_to_deliver} dk.)
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={{ color: colors.primary }} className="">
              Değiştir
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#fa0050]">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-lg"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="TRY" />
              </Text>

              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({ id: key }))}
              >
                <Text className="text-[#fa0050] text-xs">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Ara Toplam</Text>
            <Text className="text-gray-400">
              <Currency quantity={total} currency="TRY" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Teslimat ücreti</Text>
            <Text className="text-gray-400">
              <Currency quantity={7.99} currency="TRY" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Toplam</Text>
            <Text className="font-extrabold">
              <Currency quantity={total + 7.99} currency="TRY" />
            </Text>
          </View>

          <TouchableOpacity
            className="rounded-lg bg-[#fa0050] p-3"
            onPress={() => {
              navigation.navigate("PreparingOrderScreen");
            }}
            disabled={false}
          >
            <Text className="text-center text-white text-lg font-bold">
              Sepeti Onayla
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { XMarkIcon } from "react-native-heroicons/outline";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import colors from "../constants/colors";
import MapView, { Marker } from "react-native-maps";
import { urlFor } from "../sanity";
import { PhoneIcon } from "react-native-heroicons/solid";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  let lat = restaurant.lat;
  let lng = restaurant.long;

  return (
    <View className="bg-[#fa0050] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color="#FFFFFF" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Yardım</Text>
        </View>

        {/* Estimated Delivery Box */}
        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Animatable.Text
                animation="fadeInLeftBig"
                className="text-lg text-gray-400"
                easing="linear"
              >
                Tahmin Teslimat
              </Animatable.Text>
              <Animatable.Text
                animation="fadeInLeftBig"
                className="text-4xl font-bold"
                easing="linear"
              >
                {restaurant.time_to_deliver} - {restaurant.time_to_deliver + 10}{" "}
                dk.
              </Animatable.Text>
            </View>

            <Animatable.Image
              source={require("../assets/delivery.gif")}
              className="h-20 w-40"
              animation="fadeInLeftBig"
              iterationCount={1}
              useNativeDriver={true}
              easing="linear"
            />
          </View>
          <Progress.Bar
            size={30}
            color={colors.primary}
            indeterminate={true}
            useNativeDriver={true}
          />
          <Text className="mt-3 text-gray-500">
            {restaurant.title}'deki siparişiniz hazırlanıyor.
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: restaurant.lat ? restaurant.lat : 48.23412,
          longitude: restaurant.long ? restaurant.long : 12.32344,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          key={restaurant._id}
          coordinate={{
            latitude: restaurant.lat ? restaurant.lat : 48.23412,
            longitude: restaurant.long ? restaurant.long : 12.32344,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor={colors.primary}
        />
      </MapView>

      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{
            uri: "https://scontent.fsaw3-1.fna.fbcdn.net/v/t1.6435-9/60061795_654763151654624_9155913979128709120_n.png?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0njYlH5g0bEAX94CmgF&_nc_ht=scontent.fsaw3-1.fna&oh=00_AfAI4jG9b7ZzLWZQXhqPfZtfIa-6rW64zNvHJrsSfXP6Sw&oe=639CC33E",
          }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Ahmed</Text>
          <Text className="text-gray-400">Kuryenin</Text>
        </View>

        <TouchableOpacity className="flex-row items-center mr-5 space-x-1 ">
          <PhoneIcon color={colors.primary} />
          {/* <Text className="text-lg font-bold text-[#fa0050]">Ara</Text> */}
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;

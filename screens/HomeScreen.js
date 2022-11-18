import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import sanityClient from "../sanity";
import { useSelector } from "react-redux";

// icons
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
} from "react-native-heroicons/solid";
import {
  UserIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  HeartIcon,
} from "react-native-heroicons/outline";
import colors from "../constants/colors";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import { selectBasketItems } from "../features/basketSlice";

const HomeScreen = () => {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const [featuredCategories, setFeaturedCategories] = useState([]);

  // as soon as the screen mounts, do something
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured"] {
      ...,
        restaurants[]->{
          ...,
          dishes[]->,
      type->{
        ...
      }
        }
      }
    `
      )
      .then((data) => setFeaturedCategories(data));
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2 ">
        <Image
          source={{
            uri: "https://scontent.fsaw3-1.fna.fbcdn.net/v/t1.6435-9/60061795_654763151654624_9155913979128709120_n.png?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0njYlH5g0bEAX94CmgF&_nc_ht=scontent.fsaw3-1.fna&oh=00_AfAI4jG9b7ZzLWZQXhqPfZtfIa-6rW64zNvHJrsSfXP6Sw&oe=639CC33E",
          }}
          className="h-7 w-7 bg-gray-300 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Yemeksepeti</Text>
          <Text className="font-bold text-xl">
            Mevcut konum <ChevronDownIcon size={20} color={colors.primary} />
          </Text>
        </View>

        {/* User Icon */}
        <TouchableOpacity>
          <HeartIcon size={25} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Basket")}>
          {items.length > 0 ? (
            <View className="rounded-full bg-[#fa0050] absolute w-2 h-2 right-0 top-1 z-10" />
          ) : null}
          <ShoppingBagIcon size={25} color={colors.primary} />
        </TouchableOpacity>
        {/* <UserIcon size={25} color={colors.primary} /> */}
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3 rounded-xl">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Restoranlar ve mutfaklar"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color={colors.primary} />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

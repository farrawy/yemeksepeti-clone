import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { ArrowRightIcon } from "react-native-heroicons/outline";
import colors from "../constants/colors";
import RestaurantCard from "./RestaurantCard";

import sanityClient from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == "featured" && _id == $id] {
        ...,
        restaurants[] -> {
          ...,
          dishes[]->,
          type-> {
            name
          }
        },
      }[0]
    `,
        { id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      });
  }, [id]);

  

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
      </View>
      {description && (
        <Text className="text-xs text-gray-500 px-4 pb-4">{description}</Text>
      )}

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {restaurants?.map((restaurant) => {
          return (
            <RestaurantCard
              key={restaurant._id}
              id={restaurant._id}
              imgUrl={restaurant.image}
              title={restaurant.name}
              rating={restaurant.rating}
              genre={restaurant.type?.name}
              address={restaurant.address}
              short_description={restaurant.short_description}
              dishes={restaurant.dishes}
              long={restaurant.long}
              lat={restaurant.lat}
              delivery_fee={restaurant.delivery_fee}
              minimum_order_price={restaurant.minimum_order_price}
              ratings={restaurant.rating_count}
              time_to_deliver={restaurant.estimated_time_to_deliver}
              price_range={restaurant.price_range}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;

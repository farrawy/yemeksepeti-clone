import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import CachedImage from "react-native-expo-cached-image";

const defaultImg = require("../assets/sushi.webp");

const CategoryCard = ({ imgUrl, title }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageLoading = () => {
    setImageLoaded(true);
  };
  return (
    <TouchableOpacity className="relative mr-2">
      <Image
        source={
          imageLoaded ? { uri: imgUrl } : require("../assets/image-loading.gif")
        }
        className="h-20 w-20 rounded"
        onLoad={() => imageLoading()}
      />
      <Text className="text-black font-semibold mt-1">{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

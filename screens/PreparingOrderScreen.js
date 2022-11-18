import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Lottie from "lottie-react-native";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 5000);
  }, []);
  return (
    <SafeAreaView className="bg-[#fa0050] flex-1 justify-center items-center">
      {/* <Lottie
        source={require("../assets/orderLoading.json")}
        autoPlay
        loop
        className="w-96 "
      /> */}
      <Animatable.Image
        source={require("../assets/orderloading.gif")}
        className="w-96 h-96"
        animation="slideInUp"
        iterationCount={1}
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;

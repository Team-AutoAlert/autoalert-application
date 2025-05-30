import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function VehicleInfo() {
  const router = useRouter();
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [fuelType, setFuelType] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-black px-6">
      {/* Header */}
      <Text className="text-4xl text-red-500 font-mono font-bold text-center mb-8">
        Vehicle Details
      </Text>

      {/* Vehicle Type */}
      <Text className="text-white text-xl font-mono mb-1 w-full">Vehicle Type</Text>
      <TextInput
        className="border-2 border-white rounded-xl w-full mb-3 px-4 py-2 text-white bg-transparent font-mono text-lg"
        value={vehicleType}
        onChangeText={setVehicleType}
        placeholder=""
        placeholderTextColor="#aaa"
      />

      {/* Vehicle No */}
      <Text className="text-white text-xl font-mono mb-1 w-full">Vehicle No</Text>
      <TextInput
        className="border-2 border-white rounded-xl w-full mb-3 px-4 py-2 text-white bg-transparent font-mono text-lg"
        value={vehicleNo}
        onChangeText={setVehicleNo}
        placeholder=""
        placeholderTextColor="#aaa"
      />

      {/* Model */}
      <Text className="text-white text-xl font-mono mb-1 w-full">Model</Text>
      <TextInput
        className="border-2 border-white rounded-xl w-full mb-3 px-4 py-2 text-white bg-transparent font-mono text-lg"
        value={model}
        onChangeText={setModel}
        placeholder=""
        placeholderTextColor="#aaa"
      />

      {/* Brand */}
      <Text className="text-white text-xl font-mono mb-1 w-full">Brand</Text>
      <TextInput
        className="border-2 border-white rounded-xl w-full mb-3 px-4 py-2 text-white bg-transparent font-mono text-lg"
        value={brand}
        onChangeText={setBrand}
        placeholder=""
        placeholderTextColor="#aaa"
      />

      {/* Fuel Type */}
      <Text className="text-white text-xl font-mono mb-1 w-full">Fuel Type</Text>
      <TextInput
        className="border-2 border-white rounded-xl w-full mb-8 px-4 py-2 text-white bg-transparent font-mono text-lg"
        value={fuelType}
        onChangeText={setFuelType}
        placeholder=""
        placeholderTextColor="#aaa"
      />

      {/* Sign Up Button */}
      <TouchableOpacity
        onPress={() => {/* handle sign up or navigation here */}}
        className="bg-blue-300 w-full py-4 rounded-xl"
      >
        <Text className="text-white text-center text-2xl font-mono font-medium">
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

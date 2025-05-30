import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { VEHICLE_BRANDS } from "../../constants/vehicle_brands"; // Adjust path as needed

const VEHICLE_TYPES = [
  "Car",
  "Van",
  "Motor Cycle",
  "SUV",
  "Pickup",
  "Bus",
  "Lorry",
  "Three Wheel",
  "Other"
];

export default function VehicleInfo() {
  const router = useRouter();
  const [vehicleType, setVehicleType] = useState("Car");
  const [vehicleTypeDropdown, setVehicleTypeDropdown] = useState(false);

  const [make, setMake] = useState("Acura");
  const [makeDropdown, setMakeDropdown] = useState(false);

  const [vehicleNo, setVehicleNo] = useState("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-black px-6">
      {/* Header */}
      <Text className="text-4xl text-red-500 font-mono font-bold text-center mb-8">
        Vehicle Details
      </Text>

      {/* Vehicle Type Dropdown */}
      <Text className="text-white text-xl font-mono mb-1 w-full">Vehicle Type</Text>
      <View className="w-full mb-3">
        <TouchableOpacity
          className="flex-row items-center border-2 border-white rounded-xl px-4 py-2 bg-transparent"
          onPress={() => setVehicleTypeDropdown(!vehicleTypeDropdown)}
          activeOpacity={0.8}
        >
          <Text className="text-white font-mono text-lg flex-1">{vehicleType}</Text>
          <Text className="text-white text-xl ml-2">▼</Text>
        </TouchableOpacity>
        {vehicleTypeDropdown && (
          <View className="absolute top-14 left-0 w-full bg-black border-2 border-white rounded-xl z-10">
            {VEHICLE_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => {
                  setVehicleType(type);
                  setVehicleTypeDropdown(false);
                }}
                className="px-4 py-2"
              >
                <Text className="text-white font-mono text-lg">{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

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

      {/* Make Dropdown */}
      <Text className="text-white text-xl font-mono mb-1 w-full">Make</Text>
      <View className="w-full mb-3">
        <TouchableOpacity
          className="flex-row items-center border-2 border-white rounded-xl px-4 py-2 bg-transparent"
          onPress={() => setMakeDropdown(!makeDropdown)}
          activeOpacity={0.8}
        >
          <Text className="text-white font-mono text-lg flex-1">{make}</Text>
          <Text className="text-white text-xl ml-2">▼</Text>
        </TouchableOpacity>
        {makeDropdown && (
          <ScrollView className="absolute top-14 left-0 w-full max-h-60 bg-black border-2 border-white rounded-xl z-10">
            {VEHICLE_BRANDS.map((brand) => (
              <TouchableOpacity
                key={brand}
                onPress={() => {
                  setMake(brand);
                  setMakeDropdown(false);
                }}
                className="px-4 py-2"
              >
                <Text className="text-white font-mono text-lg">{brand}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

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

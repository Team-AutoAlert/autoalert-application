import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { VEHICLE_BRANDS } from "../../constants/vehicle_brands"; // Adjust path as needed
import { addVehicle } from "../../services/driver/user_service";

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

const FUEL_TYPES = [
  "Petrol",
  "Diesel",
  "Electric",
  "Hybrid",
  "Gas"
];

const MANUFACTURE_YEARS = Array.from({ length: 2025 - 1980 + 1 }, (_, i) => (1980 + i).toString());

export default function VehicleInfo() {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [vehicleType, setVehicleType] = useState("Car");
  const [vehicleTypeDropdown, setVehicleTypeDropdown] = useState(false);

  const [make, setMake] = useState("Acura");
  const [makeDropdown, setMakeDropdown] = useState(false);

  const [year, setYear] = useState(MANUFACTURE_YEARS[MANUFACTURE_YEARS.length - 1]);
  const [yearDropdown, setYearDropdown] = useState(false);

  const [vehicleNo, setVehicleNo] = useState("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState("Petrol");
  const [fuelTypeDropdown, setFuelTypeDropdown] = useState(false);

  const handleAddVehicle = async () => {
    if (!vehicleType || !make || !year || !model || !fuelType || !vehicleNo) {
      Alert.alert("Error", "Please fill in all vehicle details.");
      return;
    }

    if (typeof email !== 'string') {
      Alert.alert("Error", "User ID is missing.");
      return;
    }

    // Generate a simple vehicleId (you might want a more robust solution in a real app)
    const vehicleId = `VEH-${Date.now()}`;

    const vehicleData = {
      vehicleId: vehicleNo,
      brand: make,
      model: model,
      fuelType: fuelType,
      year: parseInt(year),
      registrationNumber: vehicleNo,
      // lastServiceDate and nextServiceDue are optional, so we don't include them if not available
    };

    const result = await addVehicle(email, vehicleData);

    if (result.success) {
      Alert.alert("Success", result.message);
      router.replace({ pathname: "/views/driver/home" });
    } else {
      Alert.alert("Error", result.message);
    }
  };

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

      {/* Manufacture Year Dropdown */}
      <Text className="text-white text-xl font-mono mb-1 w-full">Manufacture Year</Text>
      <View className="w-full mb-3">
        <TouchableOpacity
          className="flex-row items-center border-2 border-white rounded-xl px-4 py-2 bg-transparent"
          onPress={() => setYearDropdown(!yearDropdown)}
          activeOpacity={0.8}
        >
          <Text className="text-white font-mono text-lg flex-1">{year}</Text>
          <Text className="text-white text-xl ml-2">▼</Text>
        </TouchableOpacity>
        {yearDropdown && (
          <ScrollView className="absolute top-14 left-0 w-full max-h-60 bg-black border-2 border-white rounded-xl z-10">
            {MANUFACTURE_YEARS.map((y) => (
              <TouchableOpacity
                key={y}
                onPress={() => {
                  setYear(y);
                  setYearDropdown(false);
                }}
                className="px-4 py-2"
              >
                <Text className="text-white font-mono text-lg">{y}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Model */}
      <Text className="text-white text-xl font-mono mb-1 w-full">Model</Text>
      <TextInput
        className="border-2 border-white rounded-xl w-full mb-3 px-4 py-2 text-white bg-transparent font-mono text-lg"
        value={model}
        onChangeText={setModel}
        placeholder=""
        placeholderTextColor="#aaa"
      />

      {/* Fuel Type */}
      <Text className="text-white text-xl font-mono mb-1 w-full">Fuel Type</Text>
      <View className="w-full mb-3">
        <TouchableOpacity
          className="flex-row items-center border-2 border-white rounded-xl px-4 py-2 bg-transparent"
          onPress={() => setFuelTypeDropdown(!fuelTypeDropdown)}
          activeOpacity={0.8}
        >
          <Text className="text-white font-mono text-lg flex-1">{fuelType}</Text>
          <Text className="text-white text-xl ml-2">▼</Text>
        </TouchableOpacity>
        {fuelTypeDropdown && (
          <View className="absolute top-14 left-0 w-full bg-black border-2 border-white rounded-xl z-10">
            {FUEL_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => {
                  setFuelType(type);
                  setFuelTypeDropdown(false);
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
        className="border-2 border-white rounded-xl w-full mb-8 px-4 py-2 text-white bg-transparent font-mono text-lg"
        value={vehicleNo}
        onChangeText={setVehicleNo}
        placeholder=""
        placeholderTextColor="#aaa"
      />

      {/* Sign Up Button */}
      <TouchableOpacity
        onPress={handleAddVehicle}
        className="bg-blue-300 w-full py-4 rounded-xl"
      >
        <Text className="text-white text-center text-2xl font-mono font-medium">
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

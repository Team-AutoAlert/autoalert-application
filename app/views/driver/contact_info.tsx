// app/views/mechanic/sign_up_step2.tsx
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function ContactInfo() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [language, setLanguage] = useState("English");

  return (
    <View className="flex-1 justify-center items-center bg-black px-6">
      {/* Header */}
      <Text className="text-4xl text-red-500 font-mono font-bold text-center mb-8">
        Contact Details
      </Text>

      {/* Address */}
      <Text className="text-white text-xl font-mono mb-1 w-full">Address</Text>
      <TextInput
        className="border-2 border-white rounded-xl w-full mb-6 px-4 py-4 text-white bg-transparent font-mono text-lg"
        multiline
        numberOfLines={3}
        value={address}
        onChangeText={setAddress}
        placeholder=""
        placeholderTextColor="#aaa"
      />

      {/* Phone Number */}
      <Text className="text-white text-xl font-mono mb-1 w-full">Phone Number</Text>
      <TextInput
        keyboardType="phone-pad"
        className="border-2 border-white rounded-xl w-full px-4 py-2 text-white bg-transparent font-mono text-lg"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder=""
        placeholderTextColor="#aaa"
      />
      <Text className="text-red-500 font-mono text-base mb-6 w-full text-center">
        Verify Phone Number
      </Text>

      {/* Preferred Language */}
      <Text className="text-white text-xl font-mono mb-1 w-full">Prefered Language</Text>
      <View className="flex-row items-center border-2 border-white rounded-xl w-full mb-12 px-4 py-2 bg-transparent">
        <Text className="text-white font-mono text-lg flex-1">{language}</Text>
        <Text className="text-white text-xl ml-2">♡</Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        onPress={() => router.push("/views/mechanic/verify_phone")}
        className="bg-blue-300 w-full py-4 rounded-xl"
      >
        <Text className="text-white text-center text-2xl font-mono font-medium">
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}

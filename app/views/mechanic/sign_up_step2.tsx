// app/views/mechanic/sign_up_step2.tsx
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function SignUpStep2() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [language, setLanguage] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold text-blue-600 mb-4">Hi Mechanics 👋</Text>

      <TextInput
        placeholder="Address"
        className="border w-full mb-3 px-4 py-2 rounded"
        multiline
        numberOfLines={3}
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        className="border w-full mb-3 px-4 py-2 rounded"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        placeholder="Preferred Language"
        className="border w-full mb-5 px-4 py-2 rounded"
        value={language}
        onChangeText={setLanguage}
      />

      <TouchableOpacity
        onPress={() => router.push("/views/mechanic/verify_phone")}
        className="bg-blue-600 px-6 py-3 rounded-lg w-full"
      >
        <Text className="text-white text-center font-medium text-base">Next</Text>
      </TouchableOpacity>
    </View>
  );
}

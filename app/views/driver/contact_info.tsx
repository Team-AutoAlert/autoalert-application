// app/views/mechanic/sign_up_step2.tsx
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState, useRef } from "react";
import { useRouter } from "expo-router";

const LANGUAGES = ["English", "Sinhala", "Tamil"];

export default function ContactInfo() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [language, setLanguage] = useState("English");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const inputs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null)
  ];

  if (inputs[3].current) {
    inputs[3].current.focus();
  }

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
      <View className="w-full mb-12">
        <TouchableOpacity
          className="flex-row items-center border-2 border-white rounded-xl px-4 py-2 bg-transparent"
          onPress={() => setDropdownOpen(!dropdownOpen)}
          activeOpacity={0.8}
        >
          <Text className="text-white font-mono text-lg flex-1">{language}</Text>
          <Text className="text-white text-xl ml-2">▼</Text>
        </TouchableOpacity>
        {dropdownOpen && (
          <View className="absolute top-14 left-0 w-full bg-black border-2 border-white rounded-xl z-10">
            {LANGUAGES.map((lang) => (
              <TouchableOpacity
                key={lang}
                onPress={() => {
                  setLanguage(lang);
                  setDropdownOpen(false);
                }}
                className="px-4 py-2"
              >
                <Text className="text-white font-mono text-lg">{lang}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Next Button */}
      <TouchableOpacity
        onPress={() => router.push("/views/driver/mobile_verify")}
        className="bg-blue-300 w-full py-4 rounded-xl"
      >
        <Text className="text-white text-center text-2xl font-mono font-medium">
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}

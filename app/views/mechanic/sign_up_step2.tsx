import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

export default function SignUpStep2() {
  const router = useRouter();

  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [language, setLanguage] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    if (!address.trim()) newErrors.address = "Address is required.";
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid 10-digit phone number.";
    }

    if (!language.trim()) newErrors.language = "Preferred language is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateInputs()) {
      router.push("/views/mechanic/verify_phone");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 justify-center px-6 py-12">
          <Text className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Hi Mechanics 👋
          </Text>

          {/* Address */}
          <TextInput
            placeholder="Address"
            multiline
            numberOfLines={3}
            value={address}
            onChangeText={setAddress}
            className="border border-gray-300 rounded-xl px-4 py-3 mb-1 text-base"
          />
          {errors.address && <Text className="text-red-500 mb-2">{errors.address}</Text>}

          {/* Phone Number */}
          <TextInput
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            className="border border-gray-300 rounded-xl px-4 py-3 mb-1 text-base"
          />
          {errors.phoneNumber && <Text className="text-red-500 mb-2">{errors.phoneNumber}</Text>}

          {/* Preferred Language */}
          <TextInput
            placeholder="Preferred Language"
            value={language}
            onChangeText={setLanguage}
            className="border border-gray-300 rounded-xl px-4 py-3 mb-1 text-base"
          />
          {errors.language && <Text className="text-red-500 mb-4">{errors.language}</Text>}

          {/* Next Button */}
          <TouchableOpacity
            onPress={handleNext}
            className="bg-blue-600 py-4 rounded-xl mt-4 shadow-md"
          >
            <Text className="text-center text-white text-base font-semibold">Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

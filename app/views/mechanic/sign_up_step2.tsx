import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Install this if you haven't
import { useLocalSearchParams, useRouter } from "expo-router";
import { register } from "../../services/mechanic/auth_service";

export default function SignUpStep2() {
  const router = useRouter();
  const { firstName, lastName, email, password } = useLocalSearchParams();

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
    if (!language) newErrors.language = "Please select a preferred language.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleNext = async () => {
    if (!address || !phoneNumber) {
      Alert.alert("Error", "Please fill in all contact details.");
      return;
    }

    if (typeof email !== 'string' || typeof password !== 'string' || typeof firstName !== 'string' || typeof lastName !== 'string') {
      Alert.alert("Error", "User data is missing.");
      return;
    }

    const userData = {
      email: email as string,
      password: password as string,
      firstName: firstName as string,
      lastName: lastName as string,
      phoneNumber: phoneNumber,
    };

    const result = await register(userData);

    if (result.success) {
      Alert.alert("Success", result.message);
      router.replace({ pathname: "/views/mechanic/verify_phone", params: { email, phoneNumber } });
    } else {
      Alert.alert("Error", result.message);
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

          {/* Preferred Language Dropdown */}
          <View className="border border-gray-300 rounded-xl mb-1">
            <Picker
              selectedValue={language}
              onValueChange={(itemValue) => setLanguage(itemValue)}
              style={{ height: 50 }}
            >
              <Picker.Item label="Select Preferred Language" value="" enabled={false} />
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Sinhala" value="Sinhala" />
              <Picker.Item label="Tamil" value="Tamil" />
              <Picker.Item label="Hindi" value="Hindi" />
            </Picker>
          </View>
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

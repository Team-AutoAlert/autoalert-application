import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function SignUpStep1() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateInputs()) {
      router.push({
      pathname: "/views/mechanic/sign_up_step2",
      params: { firstName, lastName, email, password },
    });
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
            Mechanic Sign Up
          </Text>

          {/* First Name */}
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            className="border border-gray-300 rounded-xl px-4 py-3 mb-1 text-base"
          />
          {errors.firstName && <Text className="text-red-500 mb-2">{errors.firstName}</Text>}

          {/* Last Name */}
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            className="border border-gray-300 rounded-xl px-4 py-3 mb-1 text-base"
          />
          {errors.lastName && <Text className="text-red-500 mb-2">{errors.lastName}</Text>}

          {/* Email */}
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            className="border border-gray-300 rounded-xl px-4 py-3 mb-1 text-base"
          />
          {errors.email && <Text className="text-red-500 mb-2">{errors.email}</Text>}

          {/* Password */}
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            className="border border-gray-300 rounded-xl px-4 py-3 mb-1 text-base"
          />
          {errors.password && <Text className="text-red-500 mb-2">{errors.password}</Text>}

          {/* Confirm Password */}
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            className="border border-gray-300 rounded-xl px-4 py-3 mb-1 text-base"
          />
          {errors.confirmPassword && (
            <Text className="text-red-500 mb-4">{errors.confirmPassword}</Text>
          )}

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

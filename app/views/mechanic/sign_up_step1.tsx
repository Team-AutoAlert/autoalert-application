// app/views/mechanic/sign_up_step1.tsx
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function SignUpStep1() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold text-blue-600 mb-4">Sign Up</Text>

      <TextInput
        placeholder="First Name"
        className="border w-full mb-3 px-4 py-2 rounded"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        className="border w-full mb-3 px-4 py-2 rounded"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        className="border w-full mb-3 px-4 py-2 rounded"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="border w-full mb-3 px-4 py-2 rounded"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        className="border w-full mb-5 px-4 py-2 rounded"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        onPress={() => router.push("/views/mechanic/sign_up_step2")}
        className="bg-blue-600 px-6 py-3 rounded-lg w-full"
      >
        <Text className="text-white text-center font-medium text-base">Next</Text>
      </TouchableOpacity>
    </View>
  );
}


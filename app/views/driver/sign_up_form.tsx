// app/views/mechanic/sign_up_step1.tsx
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function SignUpForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-black px-6">
      {/* Header */}
      <Text className="text-4xl text-red-500 font-mono font-bold text-center mb-8">
        Sign Up
      </Text>

      {/* First Name */}
      <Text className="text-white text-xl font-mono mb-1 w-full">First Name</Text>
      <TextInput
        className="border-2 border-white rounded-xl w-full mb-3 px-4 py-2 text-white bg-transparent font-mono text-lg"
        value={firstName}
        onChangeText={setFirstName}
        placeholder=""
        placeholderTextColor="#aaa"
      />

      {/* Last Name */}
      <Text className="text-white text-xl font-mono mb-1 w-full">Last Name</Text>
      <TextInput
        className="border-2 border-white rounded-xl w-full mb-3 px-4 py-2 text-white bg-transparent font-mono text-lg"
        value={lastName}
        onChangeText={setLastName}
        placeholder=""
        placeholderTextColor="#aaa"
      />

      {/* Email */}
      <Text className="text-white text-xl font-mono mb-1 w-full">Email</Text>
      <TextInput
        keyboardType="email-address"
        className="border-2 border-white rounded-xl w-full mb-3 px-4 py-2 text-white bg-transparent font-mono text-lg"
        value={email}
        onChangeText={setEmail}
        placeholder=""
        placeholderTextColor="#aaa"
      />

      {/* Password */}
      <Text className="text-white text-xl font-mono mb-1 w-full">Password</Text>
      <TextInput
        secureTextEntry
        className="border-2 border-white rounded-xl w-full mb-3 px-4 py-2 text-white bg-transparent font-mono text-lg"
        value={password}
        onChangeText={setPassword}
        placeholder=""
        placeholderTextColor="#aaa"
      />

      {/* Confirm Password */}
      <Text className="text-white text-xl font-mono mb-1 w-full">Confirm Password</Text>
      <TextInput
        secureTextEntry
        className="border-2 border-white rounded-xl w-full mb-8 px-4 py-2 text-white bg-transparent font-mono text-lg"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder=""
        placeholderTextColor="#aaa"
      />

      {/* Next Button */}
      <TouchableOpacity
        onPress={() => router.push("/views/driver/contact_info")}
        className="bg-blue-300 w-full py-4 rounded-xl"
      >
        <Text className="text-white text-center text-2xl font-mono font-medium">
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}


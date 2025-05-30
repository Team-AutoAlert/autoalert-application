// app/views/mechanic/verify_phone.tsx
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function EmailVerify() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]);

  const handleKeyPress = (value: string) => {
    const nextIndex = code.findIndex((digit) => digit === "");
    if (nextIndex !== -1) {
      const newCode = [...code];
      newCode[nextIndex] = value;
      setCode(newCode);
    }
  };

  const handleClear = () => setCode(["", "", "", ""]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 justify-center items-center bg-white px-6"
    >
      <Text className="text-xl font-semibold text-blue-600 mb-6">Verify Email</Text>
      <Text className="mb-6 text-gray-700">Code has been sent to your email</Text>

      <View className="flex-row justify-center space-x-3 mb-6">
        {code.map((digit, idx) => (
          <TextInput
            key={idx}
            value={digit}
            maxLength={1}
            keyboardType="number-pad"
            className="border w-12 h-12 text-center text-lg rounded"
            editable={false}
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={() => router.push("/views/driver/driver_home")}
        className="bg-blue-600 w-full py-3 rounded-lg mb-4"
      >
        <Text className="text-white text-center font-medium text-base">Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleClear} className="mb-6">
        <Text className="text-blue-600 font-medium">Resend</Text>
      </TouchableOpacity>

      {/* Simple number pad */}
      <View className="flex-wrap w-full flex-row justify-between px-10">
        {["1","2","3","4","5","6","7","8","9","0"].map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => handleKeyPress(num)}
            className="w-[30%] bg-gray-200 m-1 py-4 rounded items-center"
          >
            <Text className="text-lg">{num}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </KeyboardAvoidingView>
  );
}

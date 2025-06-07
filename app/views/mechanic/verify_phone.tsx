import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
} from "react-native";
import { useRouter } from "expo-router";

export default function VerifyPhone() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]); // 6 digits
  const inputs = useRef<RNTextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text && index < 5) {
        inputs.current[index + 1]?.focus();
      }

      if (newCode.join("").length === 6) {
        // Trigger action after 6 digits entered
        router.push("/views/mechanic/upload_nic");
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && code[index] === "") {
      if (index > 0) inputs.current[index - 1]?.focus();
    }
  };

  const handleClear = () => {
    setCode(["", "", "", "", "", ""]);
    inputs.current[0]?.focus();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
    >
      <View className="flex-1 items-center justify-center px-6 pt-12">
        <Text className="text-2xl font-bold text-blue-600 mb-2">Verify Phone Number</Text>
        <Text className="text-gray-600 text-center mb-6">
          Enter the 6-digit code sent to your number
        </Text>

        {/* OTP Inputs */}
        <View className="flex-row space-x-2 mb-6">
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref!)}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              maxLength={1}
              keyboardType="number-pad"
              className="w-12 h-14 border border-gray-300 rounded-xl text-center text-xl font-semibold bg-gray-100"
              autoFocus={index === 0}
            />
          ))}
        </View>

        {/* Buttons */}
        <TouchableOpacity
          onPress={() => router.push("/views/mechanic/upload_nic")}
          disabled={code.join("").length !== 6}
          className={`w-full py-4 rounded-xl ${
            code.join("").length === 6 ? "bg-blue-600" : "bg-blue-300"
          }`}
        >
          <Text className="text-white text-center text-base font-semibold">Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleClear} className="mt-4">
          <Text className="text-blue-600 font-medium">Resend Code</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// app/views/mechanic/verify_phone.tsx
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useState, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { verifyPhone, resendCode } from "../../services/driver/auth_service";

export default function MobileVerify() {
  const router = useRouter();
  const { email, phoneNumber } = useLocalSearchParams();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null)
  ];

  // Handle code input via keypad
  const handleKeyPress = (value: string) => {
    const nextIndex = code.findIndex((digit) => digit === "");
    if (nextIndex !== -1) {
      const newCode = [...code];
      newCode[nextIndex] = value;
      setCode(newCode);
      if (nextIndex < 5 && inputs[nextIndex + 1].current != null) {
        inputs[nextIndex + 1].current?.focus();
      }
    }
  };

  // Handle backspace
  const handleBackspace = () => {
    const lastIndex = code.findLastIndex((digit) => digit !== "");
    if (lastIndex !== -1) {
      const newCode = [...code];
      newCode[lastIndex] = "";
      setCode(newCode);
      if (inputs[lastIndex].current != null) {
        inputs[lastIndex].current.focus();
      }
    }
  };

  // Clear code
  const handleClear = () => setCode(["", "", "", "", "", ""]);

  const handleVerify = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      Alert.alert("Error", "Please enter the 6-digit code.");
      return;
    }

    if (typeof email !== 'string') {
      Alert.alert("Error", "User ID is missing.");
      return;
    }

    const result = await verifyPhone(email, fullCode);

    if (result.success) {
      Alert.alert("Success", result.message);
      router.replace({ pathname: "/views/driver/vehicle_info", params: { email } });
    } else {
      Alert.alert("Error", result.message);
    }
  };

  const handleResend = async () => {
    if (typeof email !== 'string') {
      Alert.alert("Error", "User ID is missing. Cannot resend code.");
      return;
    }

    const result = await resendCode(email);

    if (result.success) {
      Alert.alert("Success", result.message);
      // Optionally, you might want to clear the code input here or show a timer.
      handleClear();
    } else {
      Alert.alert("Error", result.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 justify-center items-center bg-black px-6"
    >
      {/* Header */}
      <Text className="text-3xl text-red-500 font-mono font-bold text-center mb-6">
        Verify your Mobile Number
      </Text>
      {/* Subtext */}
      <Text className="text-white text-lg font-mono text-center mb-6">
        Code has been sent to{"\n"}
        {phoneNumber}
      </Text>
      {/* Code Input */}
      <View className="flex-row justify-center mb-6">
        {code.map((digit, idx) => (
          <TextInput
            key={idx}
            ref={inputs[idx]}
            value={digit}
            maxLength={1}
            keyboardType="number-pad"
            className="w-12 h-12 border-2 border-blue-500 rounded-lg mx-1 text-center text-2xl text-white font-mono bg-transparent"
            editable={false}
            placeholder=""
            placeholderTextColor="#aaa"
          />
        ))}
      </View>
      {/* Verify Button */}
      <TouchableOpacity
        onPress={handleVerify}
        className="w-full bg-blue-300 py-3 rounded-xl mb-3 border-2 border-white"
      >
        <Text className="text-white text-center text-2xl font-mono font-medium">
          Verify
        </Text>
      </TouchableOpacity>
      {/* Resend Button */}
      <TouchableOpacity
        onPress={handleResend}
        className="w-full bg-blue-300 py-3 rounded-xl mb-6 border-2 border-white"
      >
        <Text className="text-white text-center text-2xl font-mono font-medium">
          Resend
        </Text>
      </TouchableOpacity>
      {/* Keypad */}
      <View className="w-56">
        {[ ["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["", "0", "⌫"] ].map((row, rIdx) => (
          <View key={rIdx} className="flex-row justify-between mb-3">
            {row.map((num: string, cIdx: number) => {
              const key = `${rIdx}-${cIdx}`;
              if (num === "") {
                return <View key={key} className="w-14 h-14" />;
              } else if (num === "⌫") {
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={handleBackspace}
                    className="w-14 h-14 bg-gray-200 rounded-xl justify-center items-center"
                  >
                    <Text className="text-black text-2xl font-mono">⌫</Text>
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => handleKeyPress(num)}
                    className="w-14 h-14 bg-white rounded-xl justify-center items-center"
                  >
                    <Text className="text-black text-2xl font-mono">{num}</Text>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        ))}
      </View>
    </KeyboardAvoidingView>
  );
}

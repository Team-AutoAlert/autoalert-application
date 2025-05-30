// app/views/mechanic/verify_phone.tsx
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useState, useRef } from "react";
import { useRouter } from "expo-router";

export default function EmailVerify() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]);
  const inputs = [useRef(), useRef(), useRef(), useRef()];
  const email = "abc__@gmail.com";

  // Handle code input via keypad
  const handleKeyPress = (value: string) => {
    const nextIndex = code.findIndex((digit) => digit === "");
    if (nextIndex !== -1) {
      const newCode = [...code];
      newCode[nextIndex] = value;
      setCode(newCode);
      if (nextIndex < 3) {
        inputs[nextIndex + 1].current.focus();
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
      inputs[lastIndex].current.focus();
    }
  };

  // Clear code
  const handleClear = () => setCode(["", "", "", ""]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 justify-center items-center bg-black px-6"
    >
      {/* Header */}
      <Text className="text-3xl text-red-500 font-mono font-bold text-center mb-6">
        Verify your Email
      </Text>
      {/* Subtext */}
      <Text className="text-white text-lg font-mono text-center mb-6">
        Code has been sent to{"\n"}
        {email}
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
            className="w-12 h-12 border-2 border-blue-500 rounded-lg mx-2 text-center text-2xl text-white font-mono bg-transparent"
            editable={false}
            placeholder=""
            placeholderTextColor="#aaa"
          />
        ))}
      </View>
      {/* Verify Button */}
      <TouchableOpacity
        onPress={() => router.push("/views/driver/driver_home")}
        className="w-full bg-blue-300 py-3 rounded-xl mb-3 border-2 border-white"
      >
        <Text className="text-white text-center text-2xl font-mono font-medium">
          Verify
        </Text>
      </TouchableOpacity>
      {/* Resend Button */}
      <TouchableOpacity
        onPress={handleClear}
        className="w-full bg-blue-300 py-3 rounded-xl mb-6 border-2 border-white"
      >
        <Text className="text-white text-center text-2xl font-mono font-medium">
          Resend
        </Text>
      </TouchableOpacity>
      {/* Keypad */}
      <View className="w-56">
        {[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["", "0", "⌫"]].map((row, rIdx) => (
          <View key={rIdx} className="flex-row justify-between mb-3">
            {row.map((num, cIdx) => {
              if (num === "") {
                return <View key={cIdx} className="w-14 h-14" />;
              } else if (num === "⌫") {
                return (
                  <TouchableOpacity
                    key={num}
                    onPress={handleBackspace}
                    className="w-14 h-14 bg-gray-200 rounded-xl justify-center items-center"
                  >
                    <Text className="text-black text-2xl font-mono">⌫</Text>
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    key={num}
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

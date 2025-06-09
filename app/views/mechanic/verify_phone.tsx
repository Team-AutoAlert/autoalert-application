import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Pressable,
} from "react-native";
import { useState, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { verifyPhone, resendCode } from "../../services/mechanic/auth_service";

export default function MobileVerify() {
  const router = useRouter();
  const { email, phoneNumber } = useLocalSearchParams();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = Array.from({ length: 6 }, () => useRef<TextInput>(null));

  const handleKeyPress = (value: string) => {
    const nextIndex = code.findIndex((digit) => digit === "");
    if (nextIndex !== -1) {
      const newCode = [...code];
      newCode[nextIndex] = value;
      setCode(newCode);
      if (nextIndex < 5 && inputs[nextIndex + 1].current) {
        inputs[nextIndex + 1].current?.focus();
      }
    }
  };

  const handleBackspace = () => {
    const lastIndex = code.findLastIndex((digit) => digit !== "");
    if (lastIndex !== -1) {
      const newCode = [...code];
      newCode[lastIndex] = "";
      setCode(newCode);
      inputs[lastIndex].current?.focus();
    }
  };

  const handleClear = () => setCode(["", "", "", "", "", ""]);

  const handleVerify = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      Alert.alert("Error", "Please enter the 6-digit code.");
      return;
    }
    if (typeof email !== "string") {
      Alert.alert("Error", "User ID is missing.");
      return;
    }
    const result = await verifyPhone(email, fullCode);
    if (result.success) {
      Alert.alert("Success", result.message);
      router.push("/views/mechanic/upload_nic");
    } else {
      Alert.alert("Error", result.message);
    }
  };

  const handleResend = async () => {
    if (typeof email !== "string") {
      Alert.alert("Error", "User ID is missing.");
      return;
    }
    const result = await resendCode(email);
    if (result.success) {
      Alert.alert("Success", result.message);
      handleClear();
    } else {
      Alert.alert("Error", result.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-gradient-to-b from-gray-900 to-black px-6 justify-center items-center"
    >
      {/* Header */}
      <Text className="text-3xl text-blue-600 font-bold mb-4 text-center font-mono tracking-wider">
        Verify Your Number
      </Text>
      <Text className="text-gray-300 text-center text-lg mb-8 font-mono">
        Enter the 6-digit code sent to{"\n"}
        <Text className="text-gray-300">{phoneNumber}</Text>
      </Text>

      {/* OTP Inputs */}
      <View className="flex-row space-x-2 mb-8">
        {code.map((digit, idx) => (
          <Pressable
            key={idx}
            onPress={() => inputs[idx].current?.focus()}
            className="w-12 h-14 bg-white/10 border border-gray-600 rounded-lg items-center justify-center"
          >
            <TextInput
              ref={inputs[idx]}
              value={digit}
              maxLength={1}
              keyboardType="number-pad"
              className="text-white text-2xl text-center w-full"
              editable={false}
              selectionColor="white"
            />
          </Pressable>
        ))}
      </View>

      {/* Buttons */}
      <TouchableOpacity
        onPress={handleVerify}
        className="w-full bg-blue-600 py-3 rounded-xl mb-3 shadow-lg shadow-blue-500/30"
      >
        <Text className="text-white text-center text-xl font-semibold font-mono">
          Verify
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleResend}
        className="w-full py-3 rounded-xl mb-8 border border-gray-400"
      >
        <Text className="text-gray-200 text-center text-lg font-mono">
          Resend Code
        </Text>
      </TouchableOpacity>

      {/* Keypad */}
      <View className="w-60">
        {[
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"],
          ["", "0", "⌫"],
        ].map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row justify-between mb-3">
            {row.map((num, colIndex) => {
              const key = `${rowIndex}-${colIndex}`;
              if (num === "") {
                return <View key={key} className="w-14 h-14" />;
              } else if (num === "⌫") {
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={handleBackspace}
                    className="w-14 h-14 bg-gray-300 rounded-xl justify-center items-center"
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

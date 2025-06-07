// app/views/mechanic/payment_options.tsx
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Switch } from "react-native";
import { useState } from "react";

export default function PaymentOptions() {
  const router = useRouter();

  const [cash, setCash] = useState(true);
  const [bankTransfer, setBankTransfer] = useState(true);
  const [card, setCard] = useState(false);
  const [mobilePay, setMobilePay] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-5 bg-gray-800">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Payment Options</Text>
        {/* placeholder for spacing */}
        <View style={{ width: 28 }} /> 
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <View className="space-y-6">

          <Text className="text-base text-gray-600">
            Select the payment methods you accept for services.
          </Text>

          {/* Cash */}
          <View className="flex-row justify-between items-center border-b pb-3">
            <Text className="text-gray-800 font-medium">Cash</Text>
            <Switch value={cash} onValueChange={setCash} />
          </View>

          {/* Bank Transfer */}
          <View className="flex-row justify-between items-center border-b pb-3">
            <Text className="text-gray-800 font-medium">Bank Transfer</Text>
            <Switch value={bankTransfer} onValueChange={setBankTransfer} />
          </View>

          {/* Credit/Debit Card */}
          <View className="flex-row justify-between items-center border-b pb-3">
            <Text className="text-gray-800 font-medium">Credit/Debit Card</Text>
            <Switch value={card} onValueChange={setCard} />
          </View>

          {/* Mobile Payments */}
          <View className="flex-row justify-between items-center border-b pb-3">
            <Text className="text-gray-800 font-medium">Mobile Payment (e.g., eZ Cash)</Text>
            <Switch value={mobilePay} onValueChange={setMobilePay} />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-8 bg-green-600 py-3 rounded-xl items-center"
          >
            <Text className="text-white font-semibold text-base">Save Payment Options</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// app/views/mechanic/payment_options.tsx
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
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

  // Bank Details
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branch, setBranch] = useState("");

  // Card Details
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");

  // eZ Cash
  const [ezMobile, setEzMobile] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-5 bg-gray-800">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Payment Options</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        <View className="space-y-6">

          {/* Cash */}
          <View className="flex-row justify-between items-center border-b pb-3">
            <Text className="text-gray-800 font-medium">Cash</Text>
            <Switch value={cash} onValueChange={setCash} />
          </View>

          {/* Bank Transfer */}
          <View className="border-b pb-3">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-800 font-medium">Bank Transfer</Text>
              <Switch value={bankTransfer} onValueChange={setBankTransfer} />
            </View>
            {bankTransfer && (
              <View className="space-y-3">
                <TextInput
                  placeholder="Bank Name"
                  value={bankName}
                  onChangeText={setBankName}
                  className="border px-3 py-2 rounded-md"
                />
                <TextInput
                  placeholder="Account Holder Name"
                  value={accountName}
                  onChangeText={setAccountName}
                  className="border px-3 py-2 rounded-md"
                />
                <TextInput
                  placeholder="Account Number"
                  keyboardType="number-pad"
                  value={accountNumber}
                  onChangeText={setAccountNumber}
                  className="border px-3 py-2 rounded-md"
                />
                <TextInput
                  placeholder="Branch"
                  value={branch}
                  onChangeText={setBranch}
                  className="border px-3 py-2 rounded-md"
                />
              </View>
            )}
          </View>

          {/* Card */}
          <View className="border-b pb-3">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-800 font-medium">Credit / Debit Card</Text>
              <Switch value={card} onValueChange={setCard} />
            </View>
            {card && (
              <View className="space-y-3">
                <TextInput
                  placeholder="Cardholder Name"
                  value={cardHolder}
                  onChangeText={setCardHolder}
                  className="border px-3 py-2 rounded-md"
                />
                <TextInput
                  placeholder="Card Number"
                  keyboardType="number-pad"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  className="border px-3 py-2 rounded-md"
                />
                <TextInput
                  placeholder="Expiry Date (MM/YY)"
                  value={expiry}
                  onChangeText={setExpiry}
                  className="border px-3 py-2 rounded-md"
                />
              </View>
            )}
          </View>

          {/* eZ Cash */}
          <View className="border-b pb-3">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-800 font-medium">Mobile Payment (eZ Cash)</Text>
              <Switch value={mobilePay} onValueChange={setMobilePay} />
            </View>
            {mobilePay && (
              <TextInput
                placeholder="Mobile Number (07XXXXXXXX)"
                keyboardType="phone-pad"
                value={ezMobile}
                onChangeText={setEzMobile}
                className="border px-3 py-2 rounded-md"
              />
            )}
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={() => {
              // Save logic goes here
              router.back();
            }}
            className="mt-6 bg-green-600 py-3 rounded-xl items-center"
          >
            <Text className="text-white font-semibold text-base">Save Payment Options</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// app/views/mechanic/certification.tsx
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Certification() {
  const router = useRouter();

  const [certifications, setCertifications] = useState([
    { name: "", institution: "", year: "" },
  ]);

  const handleAdd = () => {
    setCertifications([...certifications, { name: "", institution: "", year: "" }]);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...certifications];
    updated[index][field] = value;
    setCertifications(updated);
  };

  const handleRemove = (index: number) => {
    const updated = certifications.filter((_, i) => i !== index);
    setCertifications(updated);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-5 bg-gray-800">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Certifications</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        {certifications.map((item, index) => (
          <View key={index} className="mb-6 border p-4 rounded-lg bg-gray-50">
            <TextInput
              placeholder="Certificate Name"
              value={item.name}
              onChangeText={(text) => handleChange(index, "name", text)}
              className="border mb-3 px-3 py-2 rounded-md"
            />
            <TextInput
              placeholder="Issuing Institution"
              value={item.institution}
              onChangeText={(text) => handleChange(index, "institution", text)}
              className="border mb-3 px-3 py-2 rounded-md"
            />
            <TextInput
              placeholder="Year"
              keyboardType="number-pad"
              value={item.year}
              onChangeText={(text) => handleChange(index, "year", text)}
              className="border px-3 py-2 rounded-md"
            />
            {certifications.length > 1 && (
              <TouchableOpacity onPress={() => handleRemove(index)} className="mt-3">
                <Text className="text-red-600">Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        <TouchableOpacity
          onPress={handleAdd}
          className="bg-blue-600 py-3 rounded-xl items-center mb-4"
        >
          <Text className="text-white font-semibold">Add Another Certification</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // Save logic
            router.back();
          }}
          className="bg-green-600 py-3 rounded-xl items-center"
        >
          <Text className="text-white font-semibold">Save Certifications</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

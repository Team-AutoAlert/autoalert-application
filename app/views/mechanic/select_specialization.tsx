// app/views/mechanic/select_specialization.tsx
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";

const SPECIALIZATIONS = [
  "Engine Repair",
  "AC Repair",
  "Oil Change",
  "Brake Service",
  "Electrical Work",
  "Suspension Repair",
];

export default function SelectSpecialization() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [certificate, setCertificate] = useState<any>(null);

  const toggleSelection = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

  const pickCertificate = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
    if (result.assets && result.assets.length > 0) {
      setCertificate(result.assets[0]);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 24 }} className="bg-white flex-1">
      <Text className="text-xl font-semibold text-blue-600 mb-6">Select Specializations</Text>

      <View className="flex flex-wrap flex-row gap-2 mb-6">
        {SPECIALIZATIONS.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => toggleSelection(item)}
            className={`px-4 py-2 rounded-full border ${
              selected.includes(item) ? "bg-blue-600 border-blue-600" : "border-gray-400"
            }`}
          >
            <Text className={`text-sm ${selected.includes(item) ? "text-white" : "text-gray-800"}`}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-base font-medium mb-2">Upload Certification Document</Text>
      <TouchableOpacity
        onPress={pickCertificate}
        className="border border-dashed border-gray-400 bg-gray-100 py-10 items-center justify-center rounded-lg mb-4"
      >
        <Text className="text-gray-600">
          {certificate ? certificate.name : "Upload File (Image or PDF)"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/views/mechanic/confirm_details")}
        className="bg-blue-600 py-3 rounded-lg disabled:opacity-50"
        disabled={selected.length === 0 || !certificate}
      >
        <Text className="text-white text-center font-medium text-base">Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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
    <ScrollView contentContainerStyle={{ paddingVertical: 32, paddingHorizontal: 20 }} className="bg-white flex-1">
      <Text className="text-3xl text-center font-bold text-blue-600 mb-2">Select Your Specializations</Text>
      <Text className="text-gray-600 text-center mb-6">Choose all the areas you're skilled in.</Text>

      <View className="flex flex-wrap flex-row gap-3 mb-8">
        {SPECIALIZATIONS.map((item) => {
          const isSelected = selected.includes(item);
          return (
            <TouchableOpacity
              key={item}
              onPress={() => toggleSelection(item)}
              className={`px-5 py-2 rounded-full border ${
                isSelected ? "bg-blue-600 border-blue-600" : "border-gray-300"
              }`}
            >
              <Text className={`text-sm font-medium ${isSelected ? "text-white" : "text-gray-700"}`}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text className="text-base font-medium mb-2">Upload Certification Document</Text>
      <TouchableOpacity
        onPress={pickCertificate}
        className="border-2 border-dashed border-gray-300 bg-gray-50 py-10 px-4 items-center justify-center rounded-xl mb-6"
      >
        {certificate ? (
          <Text className="text-blue-600 font-medium">{certificate.name}</Text>
        ) : (
          <>
            <Ionicons name="cloud-upload-outline" size={32} color="#9ca3af" />
            <Text className="text-gray-500 mt-2">Upload File (Image or PDF)</Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/views/mechanic/confirm_details")}
        className={`py-4 rounded-xl ${
          selected.length === 0 || !certificate ? "bg-blue-300" : "bg-blue-600"
        }`}
        disabled={selected.length === 0 || !certificate}
      >
        <Text className="text-white text-center text-base font-semibold">Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

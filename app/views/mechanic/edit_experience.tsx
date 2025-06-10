// app/views/mechanic/edit_experience.tsx
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function EditExperience() {
  const router = useRouter();

  const [experienceYears, setExperienceYears] = useState("5+ years");
  const [pastWorkplaces, setPastWorkplaces] = useState(
    "• AutoCare Solutions - Senior Mechanic (2020–2023)\n• QuickFix Auto Center - Mechanic (2018–2020)"
  );
  const [projects, setProjects] = useState(
    "• Full engine overhauls\n• Brake system diagnostics\n• Hybrid vehicle servicing"
  );

  const handleSave = () => {
    // Here you'd typically send data to backend
    router.back(); // Go back to Experience screen
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-5 bg-gray-800">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Edit Experience</Text>
        {/* placeholder to balance layout */}
        <View style={{ width: 28 }} /> 
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <View className="space-y-5">

          {/* Experience Duration */}
          <View>
            <Text className="text-gray-700 font-semibold mb-1">Years of Experience</Text>
            <TextInput
              value={experienceYears}
              onChangeText={setExperienceYears}
              className="border border-gray-300 rounded-xl px-4 py-2 text-gray-900"
              placeholder="e.g. 5+ years"
              multiline
            />
          </View>

          {/* Past Workplaces */}
          <View>
            <Text className="text-gray-700 font-semibold mb-1">Past Workplaces</Text>
            <TextInput
              value={pastWorkplaces}
              onChangeText={setPastWorkplaces}
              className="border border-gray-300 rounded-xl px-4 py-2 text-gray-900"
              placeholder="List previous workplaces..."
              multiline
            />
          </View>

          {/* Projects Handled */}
          <View>
            <Text className="text-gray-700 font-semibold mb-1">Projects Handled</Text>
            <TextInput
              value={projects}
              onChangeText={setProjects}
              className="border border-gray-300 rounded-xl px-4 py-2 text-gray-900"
              placeholder="e.g. Engine overhauls, diagnostics, etc."
              multiline
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            className="bg-green-600 py-3 rounded-xl items-center mt-6"
          >
            <Text className="text-white font-semibold text-base">Save Experience</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

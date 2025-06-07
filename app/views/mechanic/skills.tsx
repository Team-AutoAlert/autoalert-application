import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function SkillsScreen() {
  const router = useRouter();

  const [skills, setSkills] = useState([
    "Engine Diagnostics",
    "Transmission Repair",
    "Brake System Maintenance",
    "Electrical Systems",
    "Hybrid Vehicle Service",
  ]);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills((prev) => [...prev, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // TODO: Save skills to backend
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-5 bg-gray-800">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Skills</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Skill List & Input */}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <Text className="text-gray-700 font-semibold text-base mb-2">Your Skills</Text>

        {skills.map((skill, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center bg-gray-100 p-3 rounded-xl mb-2"
          >
            <Text className="text-gray-800">{skill}</Text>
            <TouchableOpacity onPress={() => handleRemoveSkill(index)}>
              <Ionicons name="close" size={20} color="#e74c3c" />
            </TouchableOpacity>
          </View>
        ))}

        {/* Add New Skill */}
        <View className="mt-6">
          <Text className="text-gray-700 font-semibold mb-1">Add New Skill</Text>
          <View className="flex-row items-center space-x-2">
            <TextInput
              value={newSkill}
              onChangeText={setNewSkill}
              placeholder="e.g., Air Conditioning Repair"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3"
            />
            <TouchableOpacity onPress={handleAddSkill} className="bg-green-600 p-3 rounded-xl">
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSave}
          className="bg-blue-600 mt-10 py-4 rounded-xl items-center shadow"
        >
          <Text className="text-white font-semibold text-base">Save Skills</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

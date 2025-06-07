// app/views/mechanic/experience.tsx
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Experience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const menuItems = [
    { label: "Mech Profile", path: "/views/mechanic/mech_profile" },
    { label: "Skills", path: "/views/mechanic/skills" },
    { label: "Experience", path: "/views/mechanic/experience" },
    { label: "Payment Account Option", path: "/views/mechanic/payment_options" },
    { label: "Add Certification", path: "/views/mechanic/certification" },
    { label: "Mech Rating", path: "/views/mechanic/mech_rating" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-5 bg-gray-800">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Experience</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        <View className="p-4">

          {/* Experience Summary */}
          <View className="bg-white p-4 rounded-2xl shadow mb-4">
            <Text className="text-gray-700 font-semibold mb-1">Years of Experience</Text>
            <Text className="text-gray-900 mb-3">5+ years</Text>

            <Text className="text-gray-700 font-semibold mb-1">Past Workplaces</Text>
            <Text className="text-gray-900 mb-3">
              • AutoCare Solutions - Senior Mechanic (2020–2023){"\n"}
              • QuickFix Auto Center - Mechanic (2018–2020)
            </Text>

            <Text className="text-gray-700 font-semibold mb-1">Projects Handled</Text>
            <Text className="text-gray-900 mb-3">
              • Full engine overhauls{"\n"}
              • Brake system diagnostics{"\n"}
              • Hybrid vehicle servicing
            </Text>
          </View>

          {/* Edit Experience Button */}
          <TouchableOpacity
            className="bg-blue-600 py-3 rounded-xl items-center shadow"
            onPress={() => router.push("/views/mechanic/edit_experience")}
          >
            <Text className="text-white font-semibold text-base">Edit Experience</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

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
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Experience</Text>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Ionicons name="log-out-outline" size={28} color="#fff" />
        </TouchableOpacity>
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

      {/* Slide Menu */}
      {menuOpen && (
        <>
          <TouchableOpacity
            className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-40 z-40"
            activeOpacity={1}
            onPress={toggleMenu}
          />

          <View className="absolute top-0 left-0 bottom-0 w-2/3 bg-gray-100 px-4 py-10 z-50">
            <TouchableOpacity className="mb-6 items-center" onPress={toggleMenu}>
              <FontAwesome name="user-circle" size={60} color="#444" />
            </TouchableOpacity>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.label}
                className="mb-4 border-b border-gray-400 pb-2"
                onPress={() => {
                  toggleMenu();
                  router.push(item.path);
                }}
              >
                <Text className="text-lg text-gray-800">{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-gray-900 py-3 px-6 flex-row justify-between items-center rounded-t-2xl shadow-lg">
        <View className="flex-1 items-center">
          <TouchableOpacity onPress={() => router.push("/views/mechanic/mechanic_home")}>
            <Ionicons name="home" size={26} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white text-xs text-center mt-1">MECH{"\n"}Home</Text>
        </View>

        <View className="flex-1 items-center">
          <TouchableOpacity onPress={() => router.push("/views/mechanic/account_activity")}>
            <MaterialIcons name="assignment" size={26} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white text-xs text-center mt-1">Account{"\n"}Activity</Text>
        </View>

        <View className="flex-1 items-center">
          <TouchableOpacity onPress={() => router.push("/views/mechanic/sos_alerts")}>
            <Ionicons name="alert-circle" size={26} color="#f87171" />
          </TouchableOpacity>
          <Text className="text-red-400 text-xs text-center mt-1">SOS{"\n"}Alerts</Text>
        </View>

        <View className="flex-1 items-center">
          <TouchableOpacity onPress={() => router.push("/views/mechanic/job_notifications")}>
            <Ionicons name="notifications" size={26} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white text-xs text-center mt-1">Job{"\n"}Notifications</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

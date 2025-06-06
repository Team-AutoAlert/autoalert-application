// app/views/mechanic/mech_profile.tsx
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Ionicons,MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
//import MechanicSlideMenu from "../../components/MechanicSlideMenu"; // Adjust path if needed
//import { TouchableOpacity } from "react-native-gesture-handler";

export default function MechProfile() {
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
      {/* Top Header */}
      <View className="flex-row items-center justify-between px-4 py-5 bg-gray-800">
        <TouchableOpacity onPress={toggleMenu}>
                  <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Mechanic Profile</Text>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Ionicons name="log-out-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Page Content */}
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
    <View className="p-4">
    {/* Profile Card */}
    <View className="bg-white p-4 rounded-2xl shadow-lg mb-4 items-center">
        <FontAwesome name="user-circle" size={80} color="#4b5563" className="mb-3" />
        <Text className="text-xl font-bold text-gray-800">John Doe</Text>
        <Text className="text-gray-500">Colombo</Text>
    </View>

    {/* Info Fields */}
    <View className="bg-white p-4 rounded-2xl shadow mb-4">
        <Text className="text-gray-700 font-semibold mb-1">Email</Text>
        <Text className="text-gray-900 mb-3">john@example.com</Text>

        <Text className="text-gray-700 font-semibold mb-1">Phone</Text>
        <Text className="text-gray-900 mb-3">+94 712345678</Text>

        <Text className="text-gray-700 font-semibold mb-1">Specialties</Text>
        <Text className="text-gray-900 mb-3">Engine Repair, Brake Systems, Diagnostics</Text>

        <Text className="text-gray-700 font-semibold mb-1">Years of Experience</Text>
        <Text className="text-gray-900 mb-3">5+ years</Text>

        <Text className="text-gray-700 font-semibold mb-1">Certifications</Text>
        <Text className="text-gray-900 mb-3">ASE Certified, Hybrid Vehicle Training</Text>

        <Text className="text-gray-700 font-semibold mb-1">Rating</Text>
        <Text className="text-yellow-500 text-lg">★★★★☆ (4.5)</Text>
    </View>

    {/* Edit Button */}
        <TouchableOpacity
            className="bg-blue-600 py-3 rounded-xl items-center shadow"
            onPress={() => router.push("/views/mechanic/edit_profile")}
        >
            <Text className="text-white font-semibold text-base">Edit Profile</Text>
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

          <View className="absolute top-0 left-0 bottom-0 w-2/3 bg-gray-100 px-4 py-10 z-50 ">
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
          <Text className="text-white text-xs text-center mt-1">
            MECH{'\n'}Home
          </Text>
        </View>

        <View className="flex-1 items-center">
          <TouchableOpacity onPress={() => router.push("/views/mechanic/account_activity")}>
            <MaterialIcons name="assignment" size={26} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white text-xs text-center mt-1">
            Account{'\n'}Activity
          </Text>
        </View>

        <View className="flex-1 items-center">
          <TouchableOpacity onPress={() => router.push("/views/mechanic/sos_alerts")}>
            <Ionicons name="alert-circle" size={26} color="#f87171" />
          </TouchableOpacity>
          <Text className="text-red-400 text-xs text-center mt-1">
            SOS{'\n'}Alerts
          </Text>
        </View>

        <View className="flex-1 items-center">
          <TouchableOpacity onPress={() => router.push("/views/mechanic/job_notifications")}>
            <Ionicons name="notifications" size={26} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white text-xs text-center mt-1">
            Job{'\n'}Notifications
          </Text>
        </View>
      </View>
      

    
    </SafeAreaView>
  );
}

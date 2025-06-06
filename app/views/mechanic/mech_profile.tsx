// app/views/mechanic/mech_profile.tsx
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
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
      <View className="flex-row items-center justify-between px-4 py-3 bg-blue-600">
        <TouchableOpacity onPress={toggleMenu}>
                  <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Mechanic Profile</Text>
        {/* Spacer */}
        <View className="w-8" /> 
      </View>

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
      

      {/* Page Content */}
      <View className="p-4">
        <Text className="text-lg font-bold mb-2">Profile Information</Text>
        <Text>Name: John Doe</Text>
        <Text>Email: john@example.com</Text>
        <Text>Phone: +94 712345678</Text>
        <Text>Location: Colombo</Text>
        {/* You can add more fields or edit features here */}
      </View>
    </SafeAreaView>
  );
}

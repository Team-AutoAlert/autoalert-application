// app/views/mechanic/edit_profile.tsx
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfile() {
  const router = useRouter();

  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+94 712345678");
  const [specialties, setSpecialties] = useState("Engine Repair, Brake Systems, Diagnostics");
  const [experience, setExperience] = useState("5+ years");
  const [certifications, setCertifications] = useState("ASE Certified, Hybrid Vehicle Training");

  const handleSave = () => {
    // For now, just log the data or show a message
    console.log({ name, email, phone, specialties, experience, certifications });
    Alert.alert("Success", "Profile updated successfully.");
    router.back(); // Go back to profile screen
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6 bg-gray-800">
      <Text className="text-xl font-bold text-center mb-6 text-white">Edit Profile</Text>

      <Text className="text-white mb-1">Full Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        className="border border-gray-300 rounded-lg p-3 mb-4 text-white"
      />

      <Text className="text-white mb-1">Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="border border-gray-300 rounded-lg p-3 mb-4 text-white"
      />

      <Text className="text-white mb-1">Phone</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        className="border border-gray-300 rounded-lg p-3 mb-4 text-white"
      />

      <Text className="text-white mb-1">Specialties</Text>
      <TextInput
        value={specialties}
        onChangeText={setSpecialties}
        multiline
        className="border border-gray-300 rounded-lg p-3 mb-4 text-white"
      />

      <Text className="text-white mb-1">Experience</Text>
      <TextInput
        value={experience}
        onChangeText={setExperience}
        className="border border-gray-300 rounded-lg p-3 mb-4 text-white"
      />

      <Text className="text-white mb-1">Certifications</Text>
      <TextInput
        value={certifications}
        onChangeText={setCertifications}
        multiline
        className="border border-gray-300 rounded-lg p-3 mb-6 text-white"
      />

      <TouchableOpacity
        onPress={handleSave}
        className="bg-blue-600 py-4 rounded-xl items-center shadow"
      >
        <Text className="text-white font-semibold text-base">Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        className="mt-4 items-center"
      >
        <Text className="text-blue-600">Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

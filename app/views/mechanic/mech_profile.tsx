// app/views/mechanic/mech_profile.tsx
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

type MechanicProfile = {
  userId: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string | null;
  status: string;
};

export default function MechProfile() {
  const router = useRouter();
  const { userId } = useLocalSearchParams(); // Get userId from route params
  const [profile, setProfile] = useState<MechanicProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetch(`http://192.168.8.167:3001/api/users/${userId}/profile`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch profile");
          }
          return res.json();
        })
        .then((data) => {
          setProfile(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [userId]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-5 bg-gray-800">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Mechanic Profile</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : profile ? (
          <View className="p-4">
            {/* Profile Card */}
            <View className="bg-white p-4 rounded-2xl shadow-lg mb-4 items-center">
              <FontAwesome name="user-circle" size={80} color="#4b5563" className="mb-3" />
              <Text className="text-xl font-bold text-gray-800">
                {profile.firstName} {profile.lastName}
              </Text>
              <Text className="text-gray-500">{profile.status}</Text>
            </View>

            {/* Info Fields */}
            <View className="bg-white p-4 rounded-2xl shadow mb-4">
              <Text className="text-gray-700 font-semibold mb-1">Email</Text>
              <Text className="text-gray-900 mb-3">{profile.email}</Text>

              <Text className="text-gray-700 font-semibold mb-1">Phone</Text>
              <Text className="text-gray-900 mb-3">{profile.phoneNumber}</Text>

              <Text className="text-gray-700 font-semibold mb-1">User ID</Text>
              <Text className="text-gray-900 mb-3">{profile.userId}</Text>

              <Text className="text-gray-700 font-semibold mb-1">Role</Text>
              <Text className="text-gray-900 mb-3">{profile.role}</Text>

              <Text className="text-gray-700 font-semibold mb-1">Status</Text>
              <Text className="text-gray-900 mb-3">{profile.status}</Text>
            </View>

            {/* Edit Button */}
            <TouchableOpacity
              className="bg-blue-600 py-3 rounded-xl items-center shadow"
              onPress={() => router.push("/views/mechanic/edit_profile")}
            >
              <Text className="text-white font-semibold text-base">Edit Profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text className="text-center text-red-500">Profile not found or error fetching data.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

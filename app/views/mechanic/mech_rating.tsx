import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function MechRating() {
  const router = useRouter();

  const [reviews] = useState([
    {
      id: 1,
      reviewer: "Jane Smith",
      rating: 5,
      comment: "Excellent service! Very professional and quick.",
    },
    {
      id: 2,
      reviewer: "Mark Johnson",
      rating: 4,
      comment: "Great work but arrived a bit late.",
    },
    {
      id: 3,
      reviewer: "Lisa Adams",
      rating: 5,
      comment: "Highly recommended! Very friendly and efficient.",
    },
  ]);

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-5 bg-gray-800">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">My Ratings</Text>
        {/* Placeholder for symmetry */}
        <View style={{ width: 28 }} /> 
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Average Rating */}
        <View className="bg-white p-6 rounded-2xl shadow items-center mb-6">
          <Text className="text-gray-700 text-lg font-semibold mb-2">
            Average Rating
          </Text>
          <View className="flex-row items-center mb-2">
            <Text className="text-yellow-500 text-3xl font-bold">
              {averageRating.toFixed(1)}
            </Text>
            <FontAwesome name="star" size={28} color="#facc15" className="ml-2" />
          </View>
          <Text className="text-gray-500">{reviews.length} reviews</Text>
        </View>

        {/* Individual Reviews */}
        {reviews.map((review) => (
          <View
            key={review.id}
            className="bg-gray-100 p-4 rounded-xl shadow mb-4"
          >
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-base font-semibold text-gray-800">
                {review.reviewer}
              </Text>
              <View className="flex-row items-center">
                {[...Array(5)].map((_, index) => (
                  <FontAwesome
                    key={index}
                    name="star"
                    size={16}
                    color={index < review.rating ? "#facc15" : "#d1d5db"}
                    style={{ marginLeft: 2 }}
                  />
                ))}
              </View>
            </View>
            <Text className="text-gray-600">{review.comment}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

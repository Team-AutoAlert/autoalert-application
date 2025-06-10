import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function UploadNIC() {
  const [nicImage, setNicImage] = useState<string | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return Alert.alert("Permission Required", "Please allow access to your gallery.");
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setNicImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-16">
      <Text className="text-3xl text-center font-bold text-blue-600 mb-2">Upload Your NIC</Text>
      <Text className="text-gray-600 text-center mb-6">
        Please upload a clear image of your National Identity Card (NIC) for verification.
      </Text>

      <TouchableOpacity
        onPress={pickImage}
        className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 mb-6 items-center justify-center"
      >
        {nicImage ? (
          <Image source={{ uri: nicImage }} className="w-full h-full rounded-xl" />
        ) : (
          <Text className="text-gray-400 font-medium">Tap to Upload NIC Image</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/views/mechanic/select_specialization")}
        className={`w-full py-4 rounded-xl ${
          nicImage ? "bg-blue-600" : "bg-blue-300"
        }`}
        disabled={!nicImage}
      >
        <Text className="text-white text-center text-base font-semibold">Next</Text>
      </TouchableOpacity>
    </View>
  );
}

// app/views/mechanic/upload_nic.tsx
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function UploadNIC() {
  const [nicImage, setNicImage] = useState<string | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setNicImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-xl font-semibold text-blue-600 mb-6">Upload NIC</Text>

      <TouchableOpacity
        onPress={pickImage}
        className="w-full h-48 border border-dashed border-gray-400 rounded-lg items-center justify-center bg-gray-100 mb-6"
      >
        {nicImage ? (
          <Image source={{ uri: nicImage }} className="w-full h-full rounded-lg" />
        ) : (
          <Text className="text-gray-500">Upload Image</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/views/mechanic/select_specialization")}
        className="bg-blue-600 w-full py-3 rounded-lg"
        disabled={!nicImage}
      >
        <Text className="text-white text-center font-medium text-base">Next</Text>
      </TouchableOpacity>
    </View>
  );
}

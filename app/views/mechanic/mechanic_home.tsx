// app/views/mechanic/mechanic_home.tsx
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function MechanicHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [availability, setAvailability] = useState("Busy");
  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <View className="flex-1 bg-gray-800 relative px-4 pt-8">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-8">
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">AUTO ALERT-MECH</Text>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Ionicons name="log-out-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Mechanic Info Card */}
      <View className="bg-gray-700 pt-0 pl-8 rounded-lg flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-white text-xl font-bold">Hi Saman</Text>
          <Text className="text-yellow-400 text-lg">★★★★★</Text>
          <Text className="text-gray-300 text-base">0762345656</Text>
          <Text className="text-gray-300 text-base">Kalutara</Text>
        </View>

        <Image
          source={require("../../../assets/images/mechanic.png")}
          className="w-[250px] h-[200px] rounded-full mr-0 ml-1"
        />
      </View>

      {/* Availability Dropdown */}
      <View className="mb-4 flex-row justify-between items-center">
        <Text className="text-white text-xl ml-10 font-bold">Availability:</Text>
        <View className="bg-white rounded-full px-1 py-0 w-36 mt-1 mr-4">
          <Picker
            selectedValue={availability}
            onValueChange={(itemValue) => setAvailability(itemValue)}
            style={{
              height: 55,
              width:150,
              color:
                availability === "Busy"
                  ? "#dc2626"
                  : availability === "Available"
                  ? "#16a34a"
                  : "#d97706",
              fontWeight: "bold",
            }}
            dropdownIconColor="black"
          >
            <Picker.Item label="Busy" value="Busy" />
            <Picker.Item label="Available" value="Available" />
            <Picker.Item label="On Break" value="On Break" />
          </Picker>
        </View>
      </View>

      {/* Jobs Ongoing */}
      <Text className="text-green-500 bg-white px-3 py-1 rounded-full w-40 text-center mb-6 mt-2 ml-20 font-semibold">
        ● Jobs Ongoing
      </Text>

      {/* Quick Action Buttons */}
      <View className="flex-row justify-between px-10 mb-4">
        <TouchableOpacity className="bg-gray-600 p-4 rounded-full">
          <FontAwesome name="microphone" size={78} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-green-600 p-4 rounded-full">
          <FontAwesome name="video-camera" size={78} color="white" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View className="absolute bottom-4 left-0 right-0 px-4 flex-row justify-between">
        <TouchableOpacity>
          <Ionicons name="home" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="assignment" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="alert-circle" size={26} color="red" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications" size={26} color="white" />
        </TouchableOpacity>
      </View>

      {/* Slide Menu with tap-to-close backdrop */}
      {menuOpen && (
        <>
          {/* Backdrop - tap to close */}
          <TouchableOpacity
            className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-40 z-40"
            activeOpacity={1}
            onPress={toggleMenu}
          />

          {/* Slide Menu */}
          <View className="absolute top-0 left-0 bottom-0 w-2/3 bg-gray-100 px-4 py-10 z-50">
            <TouchableOpacity className="mb-6" onPress={toggleMenu}>
              <FontAwesome name="user-circle" size={28} color="#444" />
            </TouchableOpacity>
            {[
              "Mech Profile",
              "Skills",
              "Experience",
              "Payment Account Option",
              "Add Certification",
              "Mech Rating",
            ].map((item) => (
              <TouchableOpacity
                key={item}
                className="mb-4 border-b border-gray-400 pb-2"
                onPress={toggleMenu}
              >
                <Text className="text-lg text-gray-800">{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

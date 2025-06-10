// app/(tabs)/index.tsx
//export { default } from "../mechanic_home";
// app/views/mechanic/mechanic_home.tsx
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import { useRouter , useLocalSearchParams} from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

type User = {
  displayName: string;
  role: string;
  email: string;
  userId: string;
};

export default function MechanicHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [availability, setAvailability] = useState("Busy");
  const router = useRouter();

  const params = useLocalSearchParams();
  const [user, setUser] = useState<User | null>(null);
  

  useEffect(() => {
    if (params.user) {
      try {
        const parsedUser = JSON.parse(params.user as string);
        setUser(parsedUser);
      } catch (err) {
        console.warn("Failed to parse user from params:", err);
      }
    }
  }, [params.user]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const menuItems = [
    { label: "Mech Profile", path: `/views/mechanic/mech_profile?userId=${user?.userId}` },
    { label: "Skills", path: "/views/mechanic/skills" },
    { label: "Experience", path: "/views/mechanic/experience" },
    { label: "Payment Account Option", path: "/views/mechanic/payment_options" },
    { label: "Add Certification", path: "/views/mechanic/certification" },
    { label: "Mech Rating", path: "/views/mechanic/mech_rating" },
  ];

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
      <View className="bg-gray-700 pt-0 pl-3 rounded-lg flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-white text-xl font-bold">Hi</Text>
          <Text className="text-white text-xl font-bold">{user?.displayName}</Text>
          <Text className="text-yellow-400 text-lg">★★★★★</Text>
          <Text className="text-gray-300 text-base">{user?.role}</Text>
        </View>

        <Image
          source={require("../../../../assets/images/mechanic.png")}
          className="w-[250px] h-[200px] rounded-full mr-0 ml-0"
        />
      </View>

      {/* Availability Dropdown */}
      <View className="mb-3 flex-row justify-between items-center">
        <Text className="text-white text-xl ml-10 font-bold">Availability:</Text>
        <View className="bg-white rounded-full px-1 py-0 w-36 mt-1 mr-4">
          <Picker
            selectedValue={availability}
            onValueChange={(itemValue) => setAvailability(itemValue)}
            style={{
              height: 55,
              width: 150,
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
      <Text className="text-green-500 bg-white px-3 py-1 rounded-full w-40 text-center mb-4 mt-2 ml-20 font-semibold">
        ● Jobs Ongoing
      </Text>

      {/* Quick Action Buttons */}
      <View className="flex-row justify-between px-10 mb-4">
        <TouchableOpacity className="bg-gray-600 p-4 rounded-full">
          <FontAwesome name="microphone" size={68} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-green-600 p-4 rounded-full">
          <FontAwesome name="video-camera" size={68} color="white" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation 
      <View className="absolute bottom-0 left-0 right-0 bg-gray-900 py-3 px-6 flex-row justify-between items-center rounded-t-2xl shadow-lg">
        <View className="flex-1 items-center">
          <TouchableOpacity onPress={() => router.push("/views/mechanic/mechanic_home")}>
            <Ionicons name="home" size={26} color="#facc15" />
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
      </View> */}

      {/* Slide Menu with tap-to-close backdrop */}
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
    </View>
  );
}


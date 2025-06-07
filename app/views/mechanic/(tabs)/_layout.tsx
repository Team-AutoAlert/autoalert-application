// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#111827", // dark gray
          borderTopColor: "#374151",
          height: 84,
          paddingBottom: 5,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          textAlign: "center",
          lineHeight: 12,
          flexWrap: "wrap",
        },
        tabBarItemStyle: {
          height: "100%",
          justifyContent: "center",
        },
        tabBarActiveTintColor: "#facc15",
        tabBarInactiveTintColor: "#ffffff",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: () => (
            <Text style={{ fontSize: 12, textAlign: "center", color: "#fff" }}>
              MECH{"\n"}Home
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={24}
              color={focused ? "#facc15" : "#fff"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account_activity"
        options={{
          tabBarLabel: () => (
            <Text style={{ fontSize: 12, textAlign: "center", color: "#fff" }}>
              Account{"\n"}Activity
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="assignment"
              size={24}
              color={focused ? "#facc15" : "#fff"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sos_alerts"
        options={{
          tabBarLabel: () => (
            <Text style={{ fontSize: 12, textAlign: "center", color: "#fff" }}>
              SOS{"\n"}Alerts
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="alert-circle"
              size={24}
              color={focused ? "#f87171" : "#fff"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="job_notifications"
        options={{
          tabBarLabel: () => (
            <Text style={{ fontSize: 12, textAlign: "center", color: "#fff" }}>
              Job{"\n"}Notifications
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="notifications"
              size={24}
              color={focused ? "#facc15" : "#fff"}
            />
          ),
        }}
      />
    </Tabs>
  );
}

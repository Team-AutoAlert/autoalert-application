// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1f2937", // dark gray
          borderTopColor: "#374151",
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "MECH\nHome",
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home" size={24} color={focused ? "#facc15" : "#fff"} />
          ),
        }}
      />
      <Tabs.Screen
        name="account_activity"
        options={{
          tabBarLabel: "Account\nActivity",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="assignment" size={24} color={focused ? "#facc15" : "#fff"} />
          ),
        }}
      />
      <Tabs.Screen
        name="sos_alerts"
        options={{
          tabBarLabel: "SOS\nAlerts",
          tabBarIcon: ({ focused }) => (
            <Ionicons name="alert-circle" size={24} color={focused ? "#f87171" : "#fff"} />
          ),
        }}
      />
      <Tabs.Screen
        name="job_notifications"
        options={{
          tabBarLabel: "Job\nNotifications",
          tabBarIcon: ({ focused }) => (
            <Ionicons name="notifications" size={24} color={focused ? "#facc15" : "#fff"} />
          ),
        }}
      />
    </Tabs>
  );
}

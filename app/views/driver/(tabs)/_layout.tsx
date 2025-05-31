import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="home" options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
            ),
        }} />
        <Tabs.Screen name="tutorial" options={{
            title: 'Tutorial',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="menu-book" color={color} size={size} />
            ),
        }} />
        <Tabs.Screen name="account" options={{
            title: 'Account',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="file-alt" color={color} size={size} />
            ),
        }} />
        <Tabs.Screen name="settings" options={{
            title: 'Settings',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" color={color} size={size} />
            ),
        }} />
        
    </Tabs>
  )
}

export default _layout
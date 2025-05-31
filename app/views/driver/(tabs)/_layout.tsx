import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="home" options={{
            title: 'Home',
            headerShown: false,
        }} />
        <Tabs.Screen name="account" options={{
            title: 'Account',
            headerShown: false,
        }} />
        <Tabs.Screen name="settings" options={{
            title: 'Settings',
            headerShown: false,
        }} />
        <Tabs.Screen name="tutorial" options={{
            title: 'Tutorial',
            headerShown: false,
        }} />
    </Tabs>
  )
}

export default _layout
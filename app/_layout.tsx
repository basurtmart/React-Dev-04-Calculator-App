import React from 'react'
import { Platform, View } from 'react-native'

import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { globalStyles } from '@/styles/global-styles'

import * as NavigationBar from 'expo-navigation-bar'

const isAndroid = Platform.OS === 'android'
if (isAndroid) {
  NavigationBar.setBackgroundColorAsync('#000000');
}

const RootLayout = () => {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  if (!loaded) {
    return null;
  }

  return (
    <View style={globalStyles.background}>
      <Slot />

      <StatusBar style='light' />
    </View>
  )
}

export default RootLayout
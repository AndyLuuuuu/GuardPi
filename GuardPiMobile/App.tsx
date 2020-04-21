import 'react-native-get-random-values';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Entypo, Ionicons, Feather } from '@expo/vector-icons'
import { Home } from './src/components/Home/Home'
import { Devices } from './src/components/Devices/Devices'
import { Event } from './src/components/Event/Event'
import { Camera} from './src/components/Devices/Camera'

const HomeStack = createStackNavigator()

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='Home'
        component={Home}
        options={{
          headerStyle: { height: 70 },
          headerTitleStyle: {
            color: 'rgba(0,0,0,0.8)',
            fontWeight: '100',
            fontSize: 18,
          },
        }}
      />
    </HomeStack.Navigator>
  )
}

const DeviceStack = createStackNavigator()

const DeviceStackScreen = () => {
  return (
    <DeviceStack.Navigator>
      <DeviceStack.Screen
        name='Devices'
        component={Devices}
        options={{
          headerStyle: { height: 70 },
          headerTitleStyle: {
            color: 'rgba(0,0,0,0.8)',
            fontWeight: '100',
            fontSize: 18,
          },
        }}
      />
    </DeviceStack.Navigator>
  )
}

const EventStack = createStackNavigator()

const EventStackScreen = () => {
  return (
    <EventStack.Navigator>
      <EventStack.Screen
        name='Events'
        component={Event}
        options={{
          headerStyle: { height: 70 },
          headerTitleStyle: {
            color: 'rgba(0,0,0,0.8)',
            fontWeight: '100',
            fontSize: 18,
          },
        }}
      />
    </EventStack.Navigator>
  )
}

const CameraStack = createStackNavigator()

const CameraStackScreen = () => {
  return (
    <CameraStack.Navigator>
      <CameraStack.Screen
        name='Camera'
        component={Camera}
        options={{
          headerStyle: { height: 70 },
          headerTitleStyle: {
            color: 'rgba(0,0,0,0.8)',
            fontWeight: '100',
            fontSize: 18,
          },
        }}
      />
    </CameraStack.Navigator>
  )
}


const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            console.log(color)
            switch (route.name) {
              case 'Home':
                return <Entypo name='home' size={18} color={color} />
              case 'Camera':
                return <Entypo name='camera' size={18} color={color} />
              case 'Devices':
                return <Entypo name='signal' size={18} color={color} />
              case 'Events':
                return <Feather name='activity' size={18} color={color} />
              default:
                break
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: '#ff5725',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name='Home' component={HomeStackScreen} />
        <Tab.Screen name='Devices' component={DeviceStackScreen} />
        <Tab.Screen name='Camera' component={CameraStackScreen} />
        <Tab.Screen name='Events' component={EventStackScreen} />
        
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

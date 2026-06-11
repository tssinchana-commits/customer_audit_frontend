import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import DuesScreen from './screens/DuesScreen';
import CustomerScreen from './screens/CustomerScreen';

const Tab = createBottomTabNavigator();

export default function App() {

  return (

    <NavigationContainer>

      <Tab.Navigator
        screenOptions={{

          headerShown: false,

          tabBarStyle: {
            height: 75,
            paddingBottom: 10,
            paddingTop: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },

          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 5,
            fontWeight: '600',
          },

        }}
      >

        {/* HOME */}
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="home"
                size={24}
                color={color}
              />
            ),
          }}
        />

        {/* DUES */}
        <Tab.Screen
          name="Dues"
          component={DuesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="cash"
                size={24}
                color={color}
              />
            ),
          }}
        />

        {/* CUSTOMERS */}
        <Tab.Screen
          name="Customers"
          component={CustomerScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="people"
                size={24}
                color={color}
              />
            ),
          }}
        />

      </Tab.Navigator>

    </NavigationContainer>

  );
}
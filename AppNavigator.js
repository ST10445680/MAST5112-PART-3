// src/navigation/AppNavigator.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';

// Create a stack navigator
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} options={{ title: 'Menu' }} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} options={{ title: 'Category' }} />
        <Stack.Screen name="ItemDetailsScreen" component={ItemDetailsScreen} options={{ title: 'Item Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

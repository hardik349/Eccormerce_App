import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import React from 'react';
import navigationStrings from './navigationStrings';
import HomeScreen from '../screens/home/HomeScreen';
import WishlistScreen from '../screens/wishlist/WishlistScreen';
import FilterScreen from '../screens/filters/FilterScreen';
import CartScreen from '../screens/cart/CartScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Tabs = createNativeBottomTabNavigator();

const BottomNavigator: React.FC = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#000000',
        tabBarLabel: false,
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case navigationStrings.HOME:
              return {
                type: 'sfSymbol',
                name: focused ? 'house.fill' : 'house',
              };

            case navigationStrings.WISHLIST:
              return {
                type: 'sfSymbol',
                name: focused ? 'heart.fill' : 'heart',
              };

            case navigationStrings.FILTERS:
              return {
                type: 'sfSymbol',
                name: focused ? 'menucard.fill' : 'menucard',
              };

            case navigationStrings.CART:
              return {
                type: 'sfSymbol',
                name: focused ? 'cart.fill' : 'cart',
              };

            case navigationStrings.SETTINGS:
              return {
                type: 'sfSymbol',
                name: focused ? 'person.fill' : 'person',
              };

            default:
              return {
                type: 'sfSymbol',
                name: 'circle',
              };
          }
        },
      })}
    >
      <Tabs.Screen name={navigationStrings.HOME} component={HomeScreen} />
      <Tabs.Screen
        name={navigationStrings.WISHLIST}
        component={WishlistScreen}
      />
      <Tabs.Screen name={navigationStrings.FILTERS} component={FilterScreen} />
      <Tabs.Screen name={navigationStrings.CART} component={CartScreen} />
      <Tabs.Screen
        name={navigationStrings.SETTINGS}
        component={SettingsScreen}
      />
    </Tabs.Navigator>
  );
};

export default BottomNavigator;

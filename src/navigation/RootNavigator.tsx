import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import navigationStrings from './navigationStrings';
import BottomNavigator from './BottomNavigator';
import ProductDetailScreen from '../screens/pdp/ProductDetailScreen';
import ProductListingScreen from '../screens/plp/ProductListingScreen';
import CheckoutScreen from '../screens/checkout/CheckoutScreen';

const Stack = createStackNavigator();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={navigationStrings.BOTTOMTABS}
        component={BottomNavigator}
      />

      <Stack.Screen
        name={navigationStrings.PDP}
        component={ProductDetailScreen}
      />

      <Stack.Screen
        name={navigationStrings.CHECKOUT}
        component={CheckoutScreen}
      />
      {/* <Stack.Screen
        name={navigationStrings.PLP}
        component={ProductListingScreen}
      /> */}
    </Stack.Navigator>
  );
};

export default RootNavigator;

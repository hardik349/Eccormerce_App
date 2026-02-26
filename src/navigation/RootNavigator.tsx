import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import navigationStrings from './navigationStrings';
import BottomNavigator from './BottomNavigator';
import ProductDetailScreen from '../screens/pdp/ProductDetailScreen';

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
    </Stack.Navigator>
  );
};

export default RootNavigator;

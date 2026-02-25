import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import navigationStrings from './navigationStrings';
import BottomNavigator from './BottomNavigator';

const Stack = createStackNavigator();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={navigationStrings.BOTTOMTABS}
        component={BottomNavigator}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;

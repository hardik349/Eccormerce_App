import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../styles/colors';
import CheckoutTopBar from './component/CheckoutTopBar';
import { useNavigation } from '@react-navigation/native';

const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CheckoutTopBar title={'Checkout'} goBack={() => navigation.goBack()} />
      <Text>Checkout screen</Text>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});

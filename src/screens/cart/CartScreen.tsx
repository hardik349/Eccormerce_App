import firebase from '@react-native-firebase/app';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CartScreen: React.FC = () => {
  useEffect(() => {
    const app = firebase.app();
    console.log('Firebase connected:', app.name);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Cart screen</Text>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

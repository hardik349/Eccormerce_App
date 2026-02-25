import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const WishlistScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Wishlist screen</Text>
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import imagePath from '../../../constants/imagePath';
import { Sizes } from '../../../styles/sizes';
import fonts from '../../../styles/fonts';

interface CheckoutTopBarProps {
  title: string;
  goBack: () => void;
}

const CheckoutTopBar: React.FC<CheckoutTopBarProps> = ({ goBack, title }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={goBack}>
        <Image source={imagePath.BACK} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CheckoutTopBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //paddingVertical: Sizes.size_5,
    paddingHorizontal: Sizes.size_12,
    minHeight: Sizes.size_50,
  },
  imageContainer: {
    height: Sizes.size_14,
    width: Sizes.size_16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  title: {
    position: 'absolute',
    fontSize: Sizes.size_26,
    fontFamily: fonts.style,
    fontWeight: '600',
    left: 50,
  },
});

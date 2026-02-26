import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Sizes } from '../../styles/sizes';
import imagePath from '../../constants/imagePath';
import fonts from '../../styles/fonts';

interface BackRowProps {
  onBack: () => void;
}

const BackRow: React.FC<BackRowProps> = ({ onBack }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={onBack}>
        <View style={styles.back}>
          <Image source={imagePath.BACK} style={styles.image} />
        </View>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.wishlist}>
        <Image source={imagePath.WISHLIST_SELECTED} style={styles.image} />
      </View>
    </View>
  );
};

export default BackRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //paddingVertical: Sizes.size_5,
    paddingHorizontal: Sizes.size_12,
    minHeight: Sizes.size_50,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  back: {
    height: Sizes.size_14,
    width: Sizes.size_16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: Sizes.size_14,
    fontFamily: fonts.style,
    fontWeight: '600',
    opacity: 0.7,
    marginHorizontal: Sizes.size_5,
  },
  wishlist: {
    height: Sizes.size_28,
    width: Sizes.size_22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

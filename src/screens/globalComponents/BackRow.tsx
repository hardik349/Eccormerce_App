import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Sizes } from '../../styles/sizes';
import imagePath from '../../constants/imagePath';
import fonts from '../../styles/fonts';
import navigationStrings from '../../navigation/navigationStrings';

interface BackRowProps {
  onBack: () => void;
  cartNavigate: () => void;
}

const BackRow: React.FC<BackRowProps> = ({ onBack, cartNavigate }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={onBack}>
        <View style={styles.back}>
          <Image source={imagePath.BACK} style={styles.image} />
        </View>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <View style={styles.wishlist}>
          <Image source={imagePath.WISHLIST_SELECTED} style={styles.image} />
        </View>
        <TouchableOpacity style={styles.wishlist} onPress={cartNavigate}>
          <Image source={imagePath.CART_SELECTED} style={styles.image} />
        </TouchableOpacity>
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
    height: Sizes.size_30,
    width: Sizes.size_24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

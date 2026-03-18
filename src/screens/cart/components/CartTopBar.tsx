import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Sizes } from '../../../styles/sizes';
import imagePath from '../../../constants/imagePath';
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

interface CartTopBarProps {
  goBack: () => void;
  title: string;
  totalItems: number;
}

const CartTopBar: React.FC<CartTopBarProps> = ({
  goBack,
  title,
  totalItems,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={goBack}>
        <Image source={imagePath.BACK} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Items</Text>
        <View style={styles.totalItemsContainer}>
          <Text style={styles.itemCount}>{totalItems}</Text>
        </View>
      </View>
    </View>
  );
};

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
    fontSize: Sizes.size_30,
    fontFamily: fonts.style,
    fontWeight: '600',
    left: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalItemsContainer: {
    height: Sizes.size_30,
    width: Sizes.size_30,
    borderWidth: 1,
    borderRadius: Sizes.size_15,
    borderColor: colors.backgroundLight,
    backgroundColor: colors.backgroundExtraLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: Sizes.size_14,
    fontFamily: fonts.style,
    fontWeight: '700',
    opacity: 0.6,
    padding: Sizes.size_8,
  },
  itemCount: {
    fontSize: Sizes.size_16,
    fontFamily: fonts.style,
    fontWeight: '700',
    opacity: 0.6,
  },
});

export default CartTopBar;

import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Sizes } from '../../styles/sizes';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface ProductCardProps {
  id: number;
  thumbnail: string;
  price: number;
  category: string;
  title: string;
  onPress: () => void;
}

const width = Dimensions.get('window').width;

const ProductCard: React.FC<ProductCardProps> = ({
  thumbnail,
  price,
  category,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: thumbnail }}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <Text style={styles.category}>{category.toUpperCase()}</Text>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.price}>$ {price}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    padding: Sizes.size_5,
    height: width / 1.2,
    width: width / 2.2,
  },
  imageContainer: {
    height: '75%',
    width: '98%',
    borderRadius: Sizes.size_15,
    backgroundColor: colors.backgroundLight,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: Sizes.size_15,
  },
  category: {
    fontSize: Sizes.size_15,
    fontFamily: fonts.style,
    fontWeight: '600',
    marginVertical: Sizes.size_7,
  },
  title: {
    fontSize: Sizes.size_14,
    fontFamily: fonts.style,
    fontWeight: '400',
    marginBottom: Sizes.size_5,
    opacity: 0.6,
  },
  price: {
    fontSize: Sizes.size_15,
    fontFamily: fonts.style,
    fontWeight: '600',
    marginBottom: Sizes.size_5,
  },
});

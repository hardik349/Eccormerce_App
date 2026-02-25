import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Sizes } from '../../styles/sizes';

interface ProductCardProps {
  thumbnail: string;
  price: number;
  category: string;
  title: string;
}

const width = Dimensions.get('window').width;

const ProductCard: React.FC<ProductCardProps> = ({
  thumbnail,
  price,
  category,
  title,
}) => {
  return (
    <View style={styles.container}>
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
    </View>
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
    backgroundColor: '#dbdbdb',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: Sizes.size_15,
  },

  category: {
    fontSize: Sizes.size_17,
    fontFamily: 'Cochin',
    fontWeight: '600',
    marginVertical: Sizes.size_7,
  },
  title: {
    fontSize: Sizes.size_14,
    fontFamily: 'Cochin',
    fontWeight: '200',
    marginBottom: Sizes.size_5,
    opacity: 0.6,
  },
  price: {
    fontSize: Sizes.size_15,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    marginBottom: Sizes.size_5,
  },
});

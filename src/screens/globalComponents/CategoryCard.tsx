import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageBackgroundProps,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Sizes } from '../../styles/sizes';
import fonts from '../../styles/fonts';

export interface CategoryCardProps {
  image?: ImageBackgroundProps;
  name: string;
}

const width = Dimensions.get('window').width;

const CategoryCard: React.FC<CategoryCardProps> = ({ image, name }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <Text style={styles.categoryName}>{name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    width: width / 1.2,
    height: width / 2,

    margin: Sizes.size_5,
  },
  imageBackground: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: Sizes.size_20,
    opacity: 0.7,
  },
  categoryName: {
    fontSize: Sizes.size_22,
    fontFamily: fonts.style,
    fontWeight: '500',
  },
});

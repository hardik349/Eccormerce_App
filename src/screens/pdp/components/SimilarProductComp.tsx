import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Sizes } from '../../../styles/sizes';
import ProductCard from '../../globalComponents/ProductCard';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../../../navigation/navigationStrings';
import fonts from '../../../styles/fonts';

interface SimilarProductProps {
  products: any[];
}

const SimilarProductComp: React.FC<SimilarProductProps> = ({ products }) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Similar products</Text>
      <FlatList
        data={products}
        horizontal
        renderItem={({ item }) => {
          return (
            <ProductCard
              id={item.id}
              title={item.title}
              category={item.category}
              thumbnail={item.thumbnail}
              price={item.price}
              onPress={() =>
                navigation.push(navigationStrings.PDP, {
                  productId: item.id,
                })
              }
            />
          );
        }}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default SimilarProductComp;

const styles = StyleSheet.create({
  container: {
    padding: Sizes.size_12,
  },
  title: {
    fontSize: Sizes.size_18,
    fontFamily: fonts.style,
    fontWeight: '600',
    paddingBottom: Sizes.size_10,
    paddingStart: Sizes.size_8,
  },
});

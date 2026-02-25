import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useProducts } from '../../../hooks/useProducts';
import ProductCard from '../../globalComponents/ProductCard';
import { Sizes } from '../../../styles/sizes';

const TrendingComp: React.FC = () => {
  const { data, isLoading, error, refetch } = useProducts();

  console.log('Data:', data);

  if (error) return <Text>Something went wrong!</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.categoryText}>Trending</Text>
      <FlatList
        data={data?.products || []}
        onRefresh={refetch}
        horizontal
        showsHorizontalScrollIndicator={false}
        refreshing={isLoading}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <ProductCard
              title={item.title}
              category={item.category}
              thumbnail={item.thumbnail}
              price={item.price}
            />
          );
        }}
      />
      <View style={styles.showContainer}>
        <Text>SHOW ALL</Text>
      </View>
    </View>
  );
};

export default TrendingComp;

const styles = StyleSheet.create({
  container: {
    marginVertical: Sizes.size_25,
    backgroundColor: '#f5f5f5',
    borderRadius: Sizes.size_20,
  },
  showContainer: {
    marginVertical: Sizes.size_15,
    marginHorizontal: Sizes.size_7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.size_16,
    backgroundColor: '#dbdbdb',
    paddingVertical: Sizes.size_15,
  },
  showAllText: {
    fontSize: Sizes.size_16,
    //fontFamily: 'Cochin',
    fontWeight: '800',
  },
  categoryText: {
    fontSize: Sizes.size_27,
    fontFamily: 'Cochin',
    fontWeight: '800',
    paddingVertical: Sizes.size_15,
    alignSelf: 'center',
  },
});

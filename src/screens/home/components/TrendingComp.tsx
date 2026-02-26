import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useProducts } from '../../../hooks/useProducts';
import ProductCard from '../../globalComponents/ProductCard';
import { Sizes } from '../../../styles/sizes';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../../../navigation/navigationStrings';

const TrendingComp: React.FC = () => {
  const navigation = useNavigation<any>();
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
              id={item.id}
              title={item.title}
              category={item.category}
              thumbnail={item.thumbnail}
              price={item.price}
              onPress={() =>
                navigation.navigate(navigationStrings.PDP, {
                  productId: item.id,
                })
              }
            />
          );
        }}
      />
      <TouchableOpacity style={styles.showContainer}>
        <Text style={styles.showAllText}>SHOW ALL</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrendingComp;

const styles = StyleSheet.create({
  container: {
    marginVertical: Sizes.size_25,
    backgroundColor: colors.backgroundExtraLight,
    borderRadius: Sizes.size_20,
  },
  showContainer: {
    marginVertical: Sizes.size_15,
    marginHorizontal: Sizes.size_7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.size_16,
    backgroundColor: colors.backgroundLight,
    paddingVertical: Sizes.size_15,
  },
  showAllText: {
    fontSize: Sizes.size_16,
    fontFamily: fonts.style,
    fontWeight: '400',
  },
  categoryText: {
    fontSize: Sizes.size_27,
    fontFamily: fonts.style,
    fontWeight: '500',
    paddingVertical: Sizes.size_15,
    alignSelf: 'center',
  },
});

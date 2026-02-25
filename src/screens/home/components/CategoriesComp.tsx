import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Sizes } from '../../../styles/sizes';
import { useCategories } from '../../../hooks/useCategories';
import CategoryCard from '../../globalComponents/CategoryCard';
import imagePath from '../../../constants/imagePath';

const CategoryImages = [
  { id: 1, image: imagePath.CATEGORY1 },
  { id: 2, image: imagePath.CATEGORY2 },
  { id: 3, image: imagePath.CATEGORY3 },
  { id: 4, image: imagePath.CATEGORY4 },
];

const CategoriesComp: React.FC = () => {
  const { data, isLoading, error, refetch } = useCategories();
  console.log('Error:', error);

  if (error) return <Text>Something went wrong!</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        onRefresh={refetch}
        horizontal
        showsHorizontalScrollIndicator={false}
        refreshing={isLoading}
        keyExtractor={item => item.slug}
        renderItem={({ item, index }) => {
          const imageSource =
            CategoryImages[index % CategoryImages.length].image;
          return (
            <CategoryCard image={imageSource} name={item.name.toUpperCase()} />
          );
        }}
      />
    </View>
  );
};

export default CategoriesComp;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Sizes.size_10,
  },
});

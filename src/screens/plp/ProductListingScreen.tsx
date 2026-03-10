import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProductCard from '../globalComponents/ProductCard';
import { Sizes } from '../../styles/sizes';
import colors from '../../styles/colors';
import { useProducts } from '../../hooks/useProducts';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../../navigation/navigationStrings';
import BackRow from '../globalComponents/BackRow';
import imagePath from '../../constants/imagePath';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import fonts from '../../styles/fonts';
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FiltersModal from './components/FiltersModal';

const width = Dimensions.get('window').width;

const ProductListingScreen = () => {
  const navigation = useNavigation<any>();
  const [isPriceModalVisible, setPriceModalVisible] = useState(false);
  const [isFiltersModalVisible, setFiltersModalVisible] = useState(false);
  const [categorySelected, setCategorySelected] = useState<string | null>(null);
  const [minRating, setMinRating] = useState(0);
  const [values, setValues] = useState([10, 50]);
  const [appliedPriceRange, setAppliedPriceRange] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const lastContentOffset = useSharedValue(0);
  const translateY = useSharedValue(0);

  const actionBarStyle = useAnimatedStyle(() => {
    const isHidden = translateY.value < 0;

    return {
      opacity: withTiming(isHidden ? 0 : 1, { duration: 300 }),
      marginBottom: withTiming(isHidden ? -100 : 0, { duration: 300 }),
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: 300,
            easing: Easing.out(Easing.quad),
          }),
        },
      ],
    };
  });
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const currentOffset = event.contentOffset.y;
      const diff = currentOffset - lastContentOffset.value;

      //If scrolling down and past a small threshold (50)
      if (diff > 5 && currentOffset > 50) {
        translateY.value = -100; // HIDE
      }
      //If scrolling up OR at the very top of the list
      else if (diff < -5 || currentOffset <= 0) {
        translateY.value = 0; // SHOW
      }

      lastContentOffset.value = currentOffset;
    },
  });

  const { data, isLoading, error, refetch } = useProducts();
  console.log('data:::', data);

  const filteredProducts = React.useMemo(() => {
    if (!data?.products) return [];

    return data.products.filter((product: any) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesPrice = appliedPriceRange
        ? product.price >= appliedPriceRange[0] &&
          product.price <= appliedPriceRange[1]
        : true;

      const matchesCategory = categorySelected
        ? product.category === categorySelected
        : true;

      const matchesRating = product.rating >= minRating;

      return matchesSearch && matchesPrice && matchesCategory && matchesRating;
    });
  }, [searchQuery, appliedPriceRange, data, categorySelected, minRating]);

  const availableCategories = React.useMemo(() => {
    if (!data?.products) return [];
    const cats = data.products.map((p: any) => p.category);
    return [...new Set(cats)] as string[]; // Remove duplicates
  }, [data]);

  // 2. Add a removal function for the UI chips (optional but helpful)
  const removeCategoryFilter = () => setCategorySelected(null);

  const multiSliderValuesChange = values => {
    setValues(values);
  };

  const removePriceFilter = () => {
    setAppliedPriceRange(null);
  };

  const removeRatingFilter = () => {
    setMinRating(0);
  };

  if (isLoading)
    return <ActivityIndicator size={'large'} style={{ flex: 1 }} />;

  return (
    <View style={styles.safeArea}>
      <BackRow onBack={() => navigation.goBack()} />

      {/* Filter section */}
      <View style={{ overflow: 'hidden' }}>
        <Animated.View style={[actionBarStyle]}>
          <View style={styles.filterSection}>
            <TouchableOpacity
              style={styles.priceImage}
              onPress={() => setPriceModalVisible(true)}
            >
              <Image source={imagePath.PRICE} style={styles.image} />
            </TouchableOpacity>

            <Text style={styles.verticalDivider}>|</Text>

            <TouchableOpacity
              style={styles.filterImage}
              onPress={() => setFiltersModalVisible(true)}
            >
              <Image source={imagePath.FILTER} style={styles.image} />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {!!appliedPriceRange && (
              <TouchableOpacity
                onPress={removePriceFilter}
                style={styles.removePriceContainer}
              >
                <Text style={styles.cancelText}>
                  $ {appliedPriceRange[0]} - $ {appliedPriceRange[1]}
                </Text>
              </TouchableOpacity>
            )}
            {!!minRating && (
              <TouchableOpacity
                onPress={removeRatingFilter}
                style={styles.removePriceContainer}
              >
                <Text style={styles.cancelText}>
                  <Text style={{ color: '#eacf1e' }}>★</Text> {minRating}+
                  rating
                </Text>
              </TouchableOpacity>
            )}
            {!!categorySelected && (
              <TouchableOpacity
                onPress={removeCategoryFilter}
                style={styles.removePriceContainer}
              >
                <Text style={styles.cancelText}>{categorySelected}</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </Animated.View>
      </View>

      <Animated.FlatList
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        data={filteredProducts || []}
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
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={isPriceModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPriceModalVisible(false)}
        style={{ flex: 1 }}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setPriceModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Prize</Text>

            <View style={styles.modalRow}>
              <View style={styles.modalContainer}>
                <Text style={styles.priceText}>$ {values[0]}</Text>
              </View>

              <View style={styles.modalContainer}>
                <Text style={styles.priceText}>$ {values[1]}</Text>
              </View>
            </View>

            <View style={styles.sliderContainer}>
              <MultiSlider
                values={[values[0], values[1]]}
                sliderLength={300}
                onValuesChange={multiSliderValuesChange}
                min={0}
                max={100}
                step={1}
                allowOverlap={false}
                snapped
                selectedStyle={{ backgroundColor: '#000000' }}
                unselectedStyle={{ backgroundColor: '#CECECE' }}
                markerStyle={styles.marker}
              />
            </View>
            <View style={styles.modalRow}>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => {
                  setAppliedPriceRange(values);
                  setPriceModalVisible(false);
                }}
              >
                <Text style={styles.applyText}>Apply Filter</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setPriceModalVisible(false)}
              >
                <Text style={styles.cancelText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>

      <FiltersModal
        isFilterModalVisible={isFiltersModalVisible}
        onClose={() => setFiltersModalVisible(false)}
        minRating={minRating}
        setMinRating={setMinRating}
        categories={availableCategories}
        selectedCategory={categorySelected}
        setSelectedCategory={setCategorySelected}
      />
    </View>
  );
};

export default ProductListingScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary || '#FFFFFF',
  },
  header: {
    paddingHorizontal: Sizes.size_20 || 20,
    paddingVertical: Sizes.size_15 || 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removePriceContainer: {
    borderWidth: 1,
    opacity: 0.5,
    alignItems: 'center',
    width: Sizes.size_100,
    justifyContent: 'space-between',
    marginHorizontal: Sizes.size_10,
    paddingVertical: Sizes.size_5,
    marginBottom: Sizes.size_10,
    borderRadius: Sizes.size_18,
  },

  listContent: {
    paddingHorizontal: Sizes.size_10 || 10,
    paddingBottom: 20,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: Sizes.size_10 || 10,
  },
  filterSection: {
    borderRadius: Sizes.size_18,
    paddingVertical: Sizes.size_4,
    paddingHorizontal: Sizes.size_10,
    borderWidth: 1,
    opacity: 0.5,
    maxWidth: width / 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Sizes.size_20,
    marginBottom: Sizes.size_10,
  },
  priceImage: {
    height: Sizes.size_30,
    width: Sizes.size_30,
  },
  filterImage: {
    height: Sizes.size_25,
    width: Sizes.size_25,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  verticalDivider: {
    fontSize: 20,
    marginHorizontal: Sizes.size_5,
  },

  modalOverlay: {
    flex: 1,
    position: 'relative',
    top: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: colors.primary,
    borderRadius: Sizes.size_20,
    padding: Sizes.size_12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: Sizes.size_18,
    fontFamily: fonts.style,
    fontWeight: '600',
    marginBottom: 15,
    marginHorizontal: Sizes.size_12,
    textAlign: 'left',
    color: colors.black,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  modalContainer: {
    borderRadius: Sizes.size_15,
    borderWidth: 1,
    width: '40%',
    opacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizes.size_12,
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.size_5,
    marginTop: Sizes.size_10,
    paddingHorizontal: Sizes.size_5,
    borderRadius: Sizes.size_15,
    borderWidth: 1,
    borderColor: colors.backgroundLight,
  },
  priceText: {
    fontSize: Sizes.size_14,
    fontFamily: fonts.style,
  },
  marker: {
    backgroundColor: '#000000',
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  applyButton: {
    width: '40%',
    backgroundColor: '#000',
    padding: Sizes.size_12,
    borderRadius: Sizes.size_12,
    marginTop: Sizes.size_10,
    alignItems: 'center',
  },
  cancelButton: {
    width: '40%',
    borderWidth: 1,
    padding: Sizes.size_12,
    borderRadius: Sizes.size_12,
    marginTop: Sizes.size_10,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: Sizes.size_15,
    fontFamily: fonts.style,
    fontWeight: '600',
  },

  applyText: {
    color: '#fff',
    fontSize: Sizes.size_15,
    fontFamily: fonts.style,
    fontWeight: '600',
  },
});

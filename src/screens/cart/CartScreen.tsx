import firebase from '@react-native-firebase/app';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CartTopBar from './components/CartTopBar';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import { Sizes } from '../../styles/sizes';
import fonts from '../../styles/fonts';
import CartCard from './components/CartCard';
import navigationStrings from '../../navigation/navigationStrings';
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useQueryClient } from '@tanstack/react-query';
import { fetchProductDetails } from '../../services/productServices';

const width = Dimensions.get('window').width;

const CartScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [isValidating, setIsValidating] = useState(false);
  const queryClient = useQueryClient();
  const { entities, ids, totalQuantity, totalAmount } = useSelector(
    (state: RootState) => state.cart,
  );

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

  const cartItems = ids.map(id => entities[id]);
  console.log('Cartitems:::', cartItems);

  const handleCheckout = async () => {
    setIsValidating(true);
    const issues: string[] = [];
    try {
      const validationPromises = cartItems.map(item =>
        // We use ensureQueryData or fetchQuery to get fresh data
        queryClient.fetchQuery({
          queryKey: ['productDetails', item.id],
          queryFn: () => fetchProductDetails(item.id),
          staleTime: 0,
        }),
      );
      const freshDataResults = await Promise.all(validationPromises);

      // 2. Compare Redux cart quantities vs Fresh DB stock
      freshDataResults.forEach((freshProduct, index) => {
        const cartItem = cartItems[index];

        if (freshProduct.stock === 0) {
          issues.push(`• ${freshProduct.title} is now Out of Stock.`);
        } else if (cartItem.quantity > freshProduct.stock) {
          issues.push(
            `${freshProduct.title}: Only ${freshProduct.stock} left.`,
          );
        }
      });

      if (issues.length > 0) {
        Alert.alert('Stock Update', issues.join('\n'));
      } else {
        navigation.navigate(navigationStrings.CHECKOUT);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to verify stock levels.');
    } finally {
      setIsValidating(false);
    }
  };
  return (
    <View style={styles.container}>
      <CartTopBar
        goBack={() => navigation.goBack()}
        title={'Cart'}
        totalItems={totalQuantity}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        ) : (
          cartItems.map(item => (
            <CartCard
              key={item.id}
              id={item.id}
              quantity={item.quantity}
              thumbnail={item.thumbnail}
              addToWishlist={false}
              item={item}
              title={item.title}
              category={item.category.toUpperCase()}
              price={item.price}
              stock={item.stock}
              pdpNavigate={() =>
                navigation.navigate(navigationStrings.PDP, {
                  productId: item.id,
                })
              }
            />
          ))
        )}
      </Animated.ScrollView>

      {cartItems.length > 0 && (
        <Animated.View style={[styles.checkoutContainer, actionBarStyle]}>
          <View style={styles.checkoutRow}>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.itemsText}>{totalQuantity} items</Text>
            </View>
            <Text style={styles.totalText}>$ {totalAmount.toFixed(2)} </Text>
          </View>
          <TouchableOpacity
            style={[styles.checkoutButton, isValidating && { opacity: 0.7 }]}
            onPress={handleCheckout}
            disabled={isValidating}
          >
            {isValidating ? (
              <ActivityIndicator color={colors.black} />
            ) : (
              <Text style={styles.checkoutText}>Make an order</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: Sizes.size_16,
    fontWeight: '600',
    opacity: 0.4,
    fontFamily: fonts.style,
    textAlign: 'center',
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: Sizes.size_90,
    left: 0,
    right: 0,
    //width: width,
    marginHorizontal: Sizes.size_16,
    borderRadius: Sizes.size_25,
    backgroundColor: colors.black,
    paddingHorizontal: Sizes.size_9,
    paddingVertical: Sizes.size_10,
  },
  checkoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Sizes.size_7,
    marginVertical: Sizes.size_3,
  },
  totalRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'baseline',
  },
  totalText: {
    fontSize: Sizes.size_16,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: fonts.style,
  },
  itemsText: {
    fontSize: Sizes.size_14,
    fontWeight: '500',
    color: colors.primary,
    opacity: 0.7,
    fontFamily: fonts.style,
  },
  checkoutButton: {
    borderRadius: Sizes.size_20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Sizes.size_16,
    paddingVertical: Sizes.size_17,
    marginHorizontal: Sizes.size_5,
    marginBottom: Sizes.size_5,
  },
  checkoutText: {
    fontSize: Sizes.size_16,
    fontWeight: '700',
    color: colors.black,
    fontFamily: fonts.style,
  },
});

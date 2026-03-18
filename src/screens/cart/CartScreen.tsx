import firebase from '@react-native-firebase/app';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CartTopBar from './components/CartTopBar';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import { Sizes } from '../../styles/sizes';
import fonts from '../../styles/fonts';
import CartCard from './components/CartCard';
import navigationStrings from '../../navigation/navigationStrings';

const CartScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { entities, ids, totalQuantity, totalAmount } = useSelector(
    (state: RootState) => state.cart,
  );

  const cartItems = ids.map(id => entities[id]);
  console.log('Cartirems:::', cartItems);
  return (
    <View style={styles.container}>
      <CartTopBar
        goBack={() => navigation.goBack()}
        title={'Cart'}
        totalItems={totalQuantity}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
      </ScrollView>
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
});

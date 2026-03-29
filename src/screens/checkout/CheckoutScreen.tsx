import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../styles/colors';
import { Sizes } from '../../styles/sizes';
import fonts from '../../styles/fonts';
import imagePath from '../../constants/imagePath';
import { RootState } from '../../redux/store';

import CheckoutTopBar from './component/CheckoutTopBar';
import CustomToggle from './component/CustomToggle';
import ShippingForm from './component/ShippingForm';
import BillingForm from './component/BillingForm';
import FormFooter from './component/FormFooter';
import navigationStrings from '../../navigation/navigationStrings';
import ProductCard from '../globalComponents/ProductCard';

const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { billingAddress, shippingAddress, isBillingSameAsShipping } =
    useSelector((state: RootState) => state.checkout);
  const { entities, ids, totalQuantity, totalAmount } = useSelector(
    (state: RootState) => state.cart,
  );
  const cartItems = ids.map(id => entities[id]);

  const [showShippingForm, setShowShippingForm] = useState(false);
  const [isEditingBilling, setIsEditingBilling] = useState(false);
  const [isDelivery, setIsDelivery] = useState(true);

  const handleNextOrConfirm = () => {
    if (isBillingSameAsShipping) {
      setShowShippingForm(false);
      setIsEditingBilling(false);
    } else {
      if (!isEditingBilling) {
        setIsEditingBilling(true);
      } else {
        setShowShippingForm(false);
        setIsEditingBilling(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CheckoutTopBar
        title={'Placing an order'}
        goBack={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomToggle enabled={isDelivery} onValueChange={setIsDelivery} />

        <View style={styles.deliveryContainner}>
          {isDelivery ? (
            <View>
              <View style={styles.row}>
                <Text style={styles.delivery}>Delivery</Text>
                <TouchableOpacity
                  style={styles.editContainer}
                  onPress={() => setShowShippingForm(!showShippingForm)}
                >
                  <Image source={imagePath.EDIT} style={styles.image} />
                </TouchableOpacity>
              </View>

              {showShippingForm ? (
                <View>
                  {!isEditingBilling ? (
                    <ShippingForm
                      address={shippingAddress}
                      isBillingSameAsShipping={isBillingSameAsShipping}
                    />
                  ) : (
                    <BillingForm address={billingAddress} />
                  )}

                  <FormFooter
                    isEditingBilling={isEditingBilling}
                    isBillingSameAsShipping={isBillingSameAsShipping}
                    onBack={() => setIsEditingBilling(false)}
                    onNext={handleNextOrConfirm}
                  />
                </View>
              ) : (
                <Text style={styles.shipngTxt}>
                  {shippingAddress.address || 'No address set yet'}
                </Text>
              )}
            </View>
          ) : (
            <Text style={styles.shipngTxt}>Pickup selected</Text>
          )}
        </View>

        {billingAddress && (
          <View style={styles.billingContainer}>
            <View style={[styles.row, { marginBottom: Sizes.size_8 }]}>
              <Text style={styles.delivery}>Billing details</Text>
            </View>
            <Text style={styles.billngTxt}>{billingAddress.fullname}</Text>
            <Text style={styles.billngTxt}>{billingAddress.address}</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Text style={styles.billngTxt}>{billingAddress.city}</Text>
              <Text style={styles.billngTxt}>{billingAddress.zipCode}</Text>
            </View>
          </View>
        )}

        <View style={styles.ordersContainer}>
          <View
            style={[
              styles.row,
              { marginBottom: Sizes.size_8, marginHorizontal: Sizes.size_8 },
            ]}
          >
            <Text style={styles.delivery}>Your order</Text>
            <TouchableOpacity
              style={styles.editContainer}
              onPress={() =>
                navigation.navigate(navigationStrings.BOTTOMTABS, {
                  screen: navigationStrings.CART,
                })
              }
            >
              <Image source={imagePath.EDIT} style={styles.image} />
            </TouchableOpacity>
          </View>
          {cartItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Your cart is empty</Text>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContent}
            >
              {cartItems.map(item => (
                <View key={item.id} style={styles.cardWrapper}>
                  <ProductCard
                    id={item.id}
                    thumbnail={item.thumbnail}
                    price={item.price}
                    category={item.category}
                    title={item.title}
                    onPress={() =>
                      navigation.navigate(navigationStrings.PDP, {
                        productId: item.id,
                      })
                    }
                  />
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  deliveryContainner: {
    marginHorizontal: Sizes.size_15,
    marginVertical: Sizes.size_17,
    paddingHorizontal: Sizes.size_18,
    paddingVertical: Sizes.size_6,
    borderRadius: Sizes.size_17,
    borderColor: colors.backgroundLight,
    borderWidth: 2,
  },
  billingContainer: {
    marginHorizontal: Sizes.size_15,
    marginBottom: Sizes.size_12,
    paddingHorizontal: Sizes.size_18,
    paddingVertical: Sizes.size_6,
    borderRadius: Sizes.size_17,
    borderColor: colors.backgroundLight,
    borderWidth: 2,
  },
  ordersContainer: {
    marginHorizontal: Sizes.size_15,
    marginBottom: Sizes.size_12,
    paddingHorizontal: Sizes.size_8,
    paddingVertical: Sizes.size_6,
    borderRadius: Sizes.size_17,
    borderColor: colors.backgroundLight,
    borderWidth: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  delivery: {
    fontSize: Sizes.size_12,
    fontFamily: fonts.style,
    fontWeight: '700',
    opacity: 0.6,
  },
  editContainer: {
    height: Sizes.size_14,
    width: Sizes.size_17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { height: '100%', width: '100%' },
  shipngTxt: {
    fontSize: Sizes.size_14,
    fontWeight: '500',
    fontFamily: fonts.style,
    marginVertical: Sizes.size_8,
  },
  billngTxt: {
    fontSize: Sizes.size_14,
    fontWeight: '500',
    fontFamily: fonts.style,
    marginVertical: Sizes.size_3,
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
  horizontalScrollContent: {
    // paddingHorizontal: Sizes.size_15, // Aligns first item with screen edge
    // gap: Sizes.size_8, // Space between cards (React Native 0.71+)
  },
  cardWrapper: {
    // width: '40%', // Set a fixed width so cards don't stretch to full screen
  },
});

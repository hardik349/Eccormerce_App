import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Sizes } from '../../../styles/sizes';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';
import imagePath from '../../../constants/imagePath';
import { useDispatch } from 'react-redux';
import {
  addItemToCart,
  removeItemFromCart,
} from '../../../redux/slices/CartSlice';

interface CartCardProps {
  id: number;
  thumbnail?: string;
  title: string;
  category: string;
  quantity: number;
  price: number;
  addToWishlist?: boolean;
  item?: any;
  stock: number;
  pdpNavigate: () => void;
}

const width = Dimensions.get('window').width;

const CartCard: React.FC<CartCardProps> = ({
  id,
  thumbnail,
  title,
  category,
  price,
  quantity,
  addToWishlist = false,
  item,
  stock = 0,
  pdpNavigate,
}) => {
  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(addToWishlist);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pdpNavigate}>
        <ImageBackground
          source={{ uri: thumbnail }}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.imageRow}>
            <View style={styles.newTag}>
              <Text style={styles.newText}>NEW</Text>
            </View>
            <TouchableOpacity
              style={styles.wishlistContainer}
              onPress={() => setIsWishlisted(!isWishlisted)}
            >
              <Image
                source={
                  addToWishlist
                    ? imagePath.WISHLIST_SELECTED
                    : imagePath.WISHLIST
                }
                style={[
                  styles.image,
                  {
                    tintColor: isWishlisted ? colors.black : colors.primary,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      {/* Details component */}
      <View style={styles.descComponent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>{category}</Text>

        <View style={styles.availableContainer}>
          {stock === 0 ? (
            <Text style={styles.availableText}>Not available</Text>
          ) : (
            <Text style={styles.availableText}>In stock</Text>
          )}
        </View>
        <View style={styles.qtyContainer}>
          <TouchableOpacity
            onPress={() => dispatch(removeItemFromCart(id))}
            style={styles.qtyBtn}
          >
            <Text style={styles.qtyBtnTextRemove}>-</Text>
          </TouchableOpacity>
          <View style={styles.qtyTextContainer}>
            <Text style={styles.qtyText}>{quantity}</Text>
          </View>
          <TouchableOpacity
            onPress={() => dispatch(addItemToCart(item))}
            style={styles.qtyBtn}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: Sizes.size_10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.size_20,
  },
  imageBackground: {
    width: width / 2.2,
    height: width / 1.5,
    borderRadius: Sizes.size_22,
    backgroundColor: colors.backgroundLight,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: Sizes.size_22,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Sizes.size_10,
    marginHorizontal: Sizes.size_12,
  },
  newTag: {
    borderRadius: Sizes.size_10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Sizes.size_10,
    paddingVertical: Sizes.size_5,
  },
  newText: {
    fontSize: Sizes.size_10,
    fontFamily: fonts.style,
    fontWeight: '500',
  },
  wishlistContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Sizes.size_25,
    width: Sizes.size_25,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  descComponent: {
    marginStart: 15,
    //paddingHorizontal: Sizes.size_7,
    width: width / 2.3,
    //borderWidth: 1,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: Sizes.size_16,
    fontWeight: '600',
    fontFamily: fonts.style,
  },
  category: {
    marginTop: Sizes.size_7,
    fontSize: Sizes.size_13,
    fontWeight: '700',
    fontFamily: fonts.style,
    opacity: 0.4,
  },
  availableContainer: {
    borderWidth: 1,
    borderRadius: Sizes.size_12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Sizes.size_5,
    paddingVertical: Sizes.size_7,
    paddingHorizontal: Sizes.size_20,
  },
  availableText: {
    fontSize: Sizes.size_13,
    fontWeight: '600',
    fontFamily: fonts.style,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    marginTop: Sizes.size_8,
    paddingHorizontal: Sizes.size_3,
  },
  qtyBtn: {
    height: Sizes.size_35,
    width: Sizes.size_35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.size_20,
    // backgroundColor: colors.backgroundLight,
    opacity: 0.4,
    borderWidth: 1,
  },

  qtyBtnText: {
    fontSize: Sizes.size_28,
    fontFamily: fonts.style,
    fontWeight: '400',
    //paddingVertical: Sizes.size_3,
  },
  qtyBtnTextRemove: {
    fontSize: Sizes.size_35,
    fontFamily: fonts.style,
    fontWeight: '400',
    opacity: 0.6,
    paddingBottom: Sizes.size_48,
  },
  qtyTextContainer: {
    paddingHorizontal: Sizes.size_30,
    paddingVertical: Sizes.size_10,
    borderWidth: 1,
    //backgroundColor: colors.backgroundExtraLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.backgroundOff,
    borderRadius: 15,
  },
  qtyText: {
    fontSize: Sizes.size_15,
    fontFamily: fonts.style,
    fontWeight: '600',
  },
});

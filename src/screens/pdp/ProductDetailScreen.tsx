import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../styles/colors';
import BackRow from '../globalComponents/BackRow';
import { useNavigation } from '@react-navigation/native';
import { useProductDetails } from '../../hooks/useProductDetails';
import { Sizes } from '../../styles/sizes';
import fonts from '../../styles/fonts';
import imagePath from '../../constants/imagePath';
import { ScrollView } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;

const ProductDetailScreen: React.FC<any> = ({ route }) => {
  const { productId } = route.params;
  const { data, isLoading, error, refetch } = useProductDetails(productId);
  console.log('PDP::', data);
  const navigation = useNavigation<any>();

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <BackRow onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{ uri: data?.thumbnail }}
            style={styles.image}
            imageStyle={styles.imageStyle}
          >
            <View style={styles.new}>
              <Text style={styles.newText}>NEW</Text>
            </View>
          </ImageBackground>
        </View>

        <View
          style={{
            marginHorizontal: 20,
            //alignItems: 'center',
            marginTop: Sizes.size_14,
          }}
        >
          <Text style={styles.category}>{data?.category.toUpperCase()}</Text>

          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {data?.title}
            </Text>
            <Text style={styles.price} numberOfLines={1}>
              $ {data?.price}
            </Text>
          </View>
        </View>

        <View style={styles.cartContainer}>
          <TouchableOpacity style={styles.cart}>
            <Image source={imagePath.CART} style={{ height: 25, width: 25 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNow}>
            <Text style={styles.buyNowText}>Buy now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  imageContainer: {
    height: width * 1.3,
    //width: width,
    marginHorizontal: Sizes.size_14,
    marginVertical: Sizes.size_12,
    borderRadius: Sizes.size_20,

    backgroundColor: colors.backgroundLight,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    elevation: 12,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageStyle: {
    borderRadius: Sizes.size_20,
  },
  new: {
    position: 'absolute',
    left: Sizes.size_15,
    top: Sizes.size_18,
    height: Sizes.size_25,
    width: Sizes.size_55,
    backgroundColor: colors.primary,
    borderRadius: Sizes.size_18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newText: {
    fontSize: Sizes.size_10,
    fontFamily: fonts.style,
    fontWeight: '800',
    opacity: 0.7,
    padding: 5,
  },
  nameRow: {
    marginHorizontal: Sizes.size_20,
    //alignItems: 'center',
    marginTop: Sizes.size_14,
  },
  category: {
    fontSize: Sizes.size_15,
    fontFamily: fonts.style,
    fontWeight: '600',
    //marginTop: Sizes.size_14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Sizes.size_5,
  },
  title: {
    fontSize: Sizes.size_14,
    fontFamily: fonts.style,
    fontWeight: '400',
    opacity: 0.6,
  },
  price: {
    fontSize: Sizes.size_17,
    fontFamily: fonts.style,
    fontWeight: '700',
    opacity: 0.6,
    color: colors.red,
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Sizes.size_15,
  },
  cart: {
    height: Sizes.size_55,
    width: Sizes.size_55,
    borderRadius: 30,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNow: {
    height: Sizes.size_55,
    // width: Sizes.size_55,
    width: width / 1.3,
    borderRadius: 20,
    backgroundColor: colors.backgroundNormal,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Sizes.size_10,
  },
  buyNowText: {
    fontSize: Sizes.size_15,
    fontFamily: fonts.style,
    fontWeight: '700',
    opacity: 0.8,
  },
});

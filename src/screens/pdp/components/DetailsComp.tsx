import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackgroundProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Sizes } from '../../../styles/sizes';
import imagePath from '../../../constants/imagePath';
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

interface DetailsCompTypes {
  brand?: string;
  warranty?: string;
  shipping?: string;
  availability?: string;
  returnPolicy?: string;
  images?: string;
}

const width = Dimensions.get('window').width;

const DetailsComp: React.FC<DetailsCompTypes> = ({
  brand,
  warranty,
  shipping,
  availability,
  returnPolicy,
  images,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.detailsRow}
        onPress={() => setShowDetails(!showDetails)}
      >
        <Text style={styles.detailsText}> Details</Text>
        <View style={styles.arrowContainer}>
          <Image
            source={imagePath.BACK}
            style={[
              styles.arrow,
              { transform: [{ rotate: showDetails ? '-90deg' : '180deg' }] },
            ]}
          />
        </View>
      </TouchableOpacity>

      {/* Hide column */}
      {showDetails && (
        <View style={styles.detailContainer}>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Brand</Text>
            <Text style={styles.title}>{brand}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Warranty</Text>
            <Text style={styles.title}>{warranty}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Shipping</Text>
            <Text style={styles.title}>{shipping}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Availability</Text>
            <Text style={styles.title}>{availability}</Text>
          </View>
        </View>
      )}
      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.detailsRow}
        onPress={() => setShowReturn(!showReturn)}
      >
        <Text style={styles.detailsText}> Return</Text>
        <View style={styles.arrowContainer}>
          <Image
            source={imagePath.BACK}
            style={[
              styles.arrow,
              { transform: [{ rotate: showReturn ? '-90deg' : '180deg' }] },
            ]}
          />
        </View>
      </TouchableOpacity>

      {showReturn && (
        <View style={styles.detailContainer}>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Return policy</Text>
            <Text style={styles.title}>{returnPolicy}</Text>
          </View>
        </View>
      )}
      <View style={styles.divider} />

      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      />
    </View>
  );
};

export default DetailsComp;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Sizes.size_12,
    marginVertical: Sizes.size_18,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  arrowContainer: {
    height: Sizes.size_15,
    width: Sizes.size_15,
  },
  arrow: {
    height: '100%',
    width: '100%',
  },
  detailsText: {
    fontSize: Sizes.size_14,
    fontFamily: fonts.style,
    fontWeight: '600',
  },
  detailContainer: {
    marginVertical: Sizes.size_10,
    marginHorizontal: Sizes.size_10,
  },
  label: {
    fontSize: Sizes.size_13,
    fontFamily: fonts.style,
    fontWeight: '600',
    opacity: 0.3,
  },
  title: {
    fontSize: Sizes.size_13,
    fontFamily: fonts.style,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    //width: width,
    marginHorizontal: Sizes.size_7,
    marginVertical: Sizes.size_10,
    backgroundColor: colors.backgroundLight,
  },
  image: {
    width: width,
    height: 300,
  },
});

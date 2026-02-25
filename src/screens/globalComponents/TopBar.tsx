import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Sizes } from '../../styles/sizes';
import imagePath from '../../constants/imagePath';

const TopBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Image source={imagePath.CARD} style={styles.image} />
      </View>
      <View style={styles.logo}>
        <Image source={imagePath.LOGO} style={styles.image} />
      </View>

      <View style={styles.notify}>
        <Image source={imagePath.NOTIFY} style={styles.image} />
      </View>
      <View style={styles.searchContainer}>
        <Image source={imagePath.SEARCH} style={styles.searchImage} />
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //paddingVertical: Sizes.size_5,
    paddingHorizontal: Sizes.size_12,
    minHeight: Sizes.size_50,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  menu: {
    height: Sizes.size_30,
    width: Sizes.size_34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notify: {
    position: 'absolute',
    left: 300,
    alignSelf: 'center',
    height: Sizes.size_28,
    width: Sizes.size_22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: Sizes.size_55,
    width: Sizes.size_55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    height: Sizes.size_35,
    width: Sizes.size_35,
    borderRadius: 20,
    backgroundColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchImage: {
    height: '70%',
    width: '70%',
  },
});

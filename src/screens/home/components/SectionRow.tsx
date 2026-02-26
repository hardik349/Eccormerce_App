import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Sizes } from '../../../styles/sizes';
import imagePath from '../../../constants/imagePath';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import colors from '../../../styles/colors';

const Sections = [
  { id: 1, image: imagePath.BANNER1 },
  { id: 2, image: imagePath.BANNER2 },
  { id: 3, image: imagePath.BANNER3 },
  { id: 4, image: imagePath.BANNER4 },
  { id: 5, image: imagePath.BANNER5 },
];

const width = Dimensions.get('window').width;

const SectionRow: React.FC = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        width={width}
        height={width * 1.6}
        data={Sections}
        //autoPlay
        onProgressChange={progress}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.94,
          parallaxScrollingOffset: 60,
          parallaxAdjacentItemScale: 0.82,
        }}
        onConfigurePanGesture={gesture => {
          gesture.activeOffsetX([-10, 10]).failOffsetY([-10, 10]);
        }}
        renderItem={({ item }) => (
          <View style={styles.shadowWrapper}>
            <View style={styles.sectionContainer}>
              <Image source={item.image} style={styles.sectionImage} />
            </View>
          </View>
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={Sections}
        dotStyle={{
          backgroundColor: 'rgba(149, 149, 149, 0.6)',
          borderRadius: 40,
        }}
        containerStyle={{ gap: 5 }}
        onPress={onPressPagination}
      />
    </View>
  );
};

export default SectionRow;

const styles = StyleSheet.create({
  container: {
    //borderWidth: 1,
  },
  shadowWrapper: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 20,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    elevation: 12,
  },
  sectionImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'cover',
  },
});

import React, { useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Sizes } from '../../../styles/sizes';
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

interface CustomToggleTypes {
  enabled: boolean;
  onValueChange: (value: boolean) => void;
}

const CustomToggle: React.FC<CustomToggleTypes> = ({
  enabled,
  onValueChange,
}) => {
  const [isEnabled, setIsEnabled] = useState(enabled);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const toggleSwitch = () => {
    const toValue = isEnabled ? 0 : 178;
    Animated.timing(animatedValue, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsEnabled(!isEnabled);
    onValueChange(!isEnabled);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} onPress={toggleSwitch}>
        <View style={styles.track}>
          <Animated.View
            style={[
              styles.thumb,
              { transform: [{ translateX: animatedValue }] },
            ]}
          />
          <View style={styles.row}>
            <Text style={styles.title}>Pickup</Text>
            <Text style={styles.title}>Delivery</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomToggle;

const styles = StyleSheet.create({
  container: { marginTop: Sizes.size_17 },
  track: {
    marginHorizontal: Sizes.size_20,
    borderRadius: Sizes.size_25,
    padding: 2,
    justifyContent: 'center',
    backgroundColor: colors.backgroundLight,
  },
  thumb: {
    width: '50%',
    height: Sizes.size_47,
    borderRadius: Sizes.size_22,
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  row: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.size_50,
  },
  title: {
    fontSize: Sizes.size_14,
    fontWeight: '600',
    fontFamily: fonts.style,
    opacity: 0.7,
  },
});

import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateBilling } from '../../../redux/slices/CheckoutSlice';
import { Sizes } from '../../../styles/sizes';
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

interface Props {
  address: any;
}

const BillingForm: React.FC<Props> = ({ address }) => {
  const dispatch = useDispatch();

  const update = (field: string, val: string) => {
    dispatch(updateBilling({ [field]: val }));
  };

  return (
    <View>
      <Text style={styles.title}>Edit Billing Address</Text>

      <Text style={styles.inputTitle}>Billing Name</Text>
      <TextInput
        placeholder="Name on Card"
        value={address.fullname}
        onChangeText={val => update('fullname', val)}
        style={styles.input}
      />

      <Text style={styles.inputTitle}>Billing Address</Text>
      <TextInput
        placeholder="Street Address"
        value={address.address}
        onChangeText={val => update('address', val)}
        style={styles.input}
      />

      <View style={styles.rowGap}>
        <View style={{ flex: 1 }}>
          <Text style={styles.inputTitle}>Billing City</Text>
          <TextInput
            placeholder="City"
            value={address.city}
            onChangeText={val => update('city', val)}
            style={styles.input}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.inputTitle}>Billing Zip Code</Text>
          <TextInput
            placeholder="Zip"
            value={address.zipCode}
            onChangeText={val => update('zipCode', val)}
            style={styles.input}
          />
        </View>
      </View>
    </View>
  );
};

export default BillingForm;

const styles = StyleSheet.create({
  title: {
    marginTop: Sizes.size_18,
    marginBottom: Sizes.size_4,
    fontSize: Sizes.size_17,
    fontFamily: fonts.style,
    fontWeight: '700',
  },
  inputTitle: {
    fontSize: Sizes.size_12,
    fontFamily: fonts.style,
    fontWeight: '700',
    opacity: 0.6,
    marginBottom: Sizes.size_3,
    marginTop: Sizes.size_7,
  },
  input: {
    fontSize: Sizes.size_15,
    fontFamily: fonts.style,
    borderRadius: Sizes.size_14,
    borderWidth: 2,
    borderColor: colors.backgroundNormal,
    paddingHorizontal: Sizes.size_7,
    paddingVertical: Sizes.size_10,
  },
  rowGap: { flexDirection: 'row', gap: Sizes.size_10 },
});

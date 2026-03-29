import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Sizes } from '../../../styles/sizes';
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

interface Props {
  isEditingBilling: boolean;
  isBillingSameAsShipping: boolean;
  onBack: () => void;
  onNext: () => void;
}

const FormFooter: React.FC<Props> = ({
  isEditingBilling,
  isBillingSameAsShipping,
  onBack,
  onNext,
}) => {
  return (
    <View style={styles.buttonRow}>
      {isEditingBilling && (
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.buttonView} onPress={onNext}>
        <Text style={styles.buttonText}>
          {isBillingSameAsShipping
            ? 'Update Address'
            : isEditingBilling
            ? 'Confirm Billing'
            : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormFooter;

const styles = StyleSheet.create({
  buttonRow: {
    marginTop: Sizes.size_13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.size_12,
    marginBottom: Sizes.size_15,
  },
  buttonView: {
    flex: 1,
    borderRadius: Sizes.size_14,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.size_12,
  },
  buttonText: {
    fontSize: Sizes.size_13,
    fontFamily: fonts.style,
    fontWeight: '600',
    color: colors.primary,
  },
  backBtn: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: Sizes.size_12,
    borderRadius: Sizes.size_14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: Sizes.size_13,
    fontFamily: fonts.style,
    fontWeight: '600',
    color: colors.black,
  },
});

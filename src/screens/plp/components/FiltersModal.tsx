import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Sizes } from '../../../styles/sizes';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

interface FiltersModalProps {
  isFilterModalVisible: boolean;
  onClose: () => void;
  categories: any[];
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  isFilterModalVisible,
  onClose,
  categories = [],
  selectedCategory,
  setSelectedCategory,
  minRating,
  setMinRating,
}) => {
  const ratings = [1, 2, 3, 4, 5];

  const renderCategoryChip = ({ item }: { item: any }) => {
    const isActive = selectedCategory === item;

    return (
      <TouchableOpacity
        style={[styles.chip, isActive && styles.activeChip]}
        onPress={() => setSelectedCategory(isActive ? null : item)}
      >
        <Text style={[styles.chipText, isActive && styles.activeChipText]}>
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={isFilterModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      style={{ flex: 1 }}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filters</Text>

          <Text style={styles.sectionLabel}>Minimum Rating</Text>
          <View style={styles.ratingRow}>
            {ratings.map(star => (
              <TouchableOpacity
                key={star}
                onPress={() => setMinRating(star)}
                style={styles.starButton}
              >
                <Text
                  style={[
                    styles.starText,
                    minRating >= star
                      ? { color: '#FFD700' }
                      : { color: '#CECECE' },
                  ]}
                >
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionLabel}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryChip}
            keyExtractor={item => item}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipContainer}
            initialNumToRender={10}
          />

          <View style={styles.modalRow}>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                setMinRating(minRating);
                onClose();
              }}
            >
              <Text style={styles.applyText}>Apply Filter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                setMinRating(0);
                onClose();
              }}
            >
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default FiltersModal;

const styles = StyleSheet.create({
  container: {
    padding: Sizes.size_12,
  },
  modalOverlay: {
    flex: 1,
    position: 'relative',
    top: 210,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: colors.primary,
    borderRadius: Sizes.size_20,
    padding: Sizes.size_12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    paddingHorizontal: Sizes.size_22,
  },
  modalTitle: {
    fontSize: Sizes.size_18,
    fontFamily: fonts.style,
    fontWeight: '600',
    marginBottom: 5,

    textAlign: 'left',
    color: colors.black,
  },

  sectionLabel: {
    fontSize: Sizes.size_12,
    fontFamily: fonts.style,
    fontWeight: '600',
    opacity: 0.7,
    marginTop: Sizes.size_5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.size_5,
  },
  starButton: {
    padding: Sizes.size_5,
  },
  starText: {
    fontSize: Sizes.size_25,
  },

  chipContainer: {
    borderRadius: Sizes.size_18,
    borderWidth: 1,
    paddingVertical: Sizes.size_8,
    paddingHorizontal: Sizes.size_5,
    marginVertical: Sizes.size_10,
  },
  chip: {
    paddingHorizontal: Sizes.size_16,
    marginHorizontal: Sizes.size_3,
    paddingVertical: Sizes.size_8,
    borderRadius: Sizes.size_12,
    borderWidth: 1,
    borderColor: '#a6a6a6',
    backgroundColor: '#F9F9F9',
  },
  activeChip: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  chipText: {
    fontSize: Sizes.size_13,
    color: '#666',
    fontFamily: fonts.style,
    fontWeight: '600',
  },
  activeChipText: {
    color: '#FFF',
  },

  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  applyButton: {
    width: '40%',
    backgroundColor: '#000',
    padding: Sizes.size_12,
    borderRadius: Sizes.size_12,
    marginTop: Sizes.size_10,
    alignItems: 'center',
  },
  resetButton: {
    width: '40%',
    borderWidth: 1,
    padding: Sizes.size_12,
    borderRadius: Sizes.size_12,
    marginTop: Sizes.size_10,
    alignItems: 'center',
  },
  resetText: {
    fontSize: Sizes.size_15,
    fontFamily: fonts.style,
    fontWeight: '600',
  },

  applyText: {
    color: '#fff',
    fontSize: Sizes.size_15,
    fontFamily: fonts.style,
    fontWeight: '600',
  },
});

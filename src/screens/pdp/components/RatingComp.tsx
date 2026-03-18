import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Sizes } from '../../../styles/sizes';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail?: string;
}

interface RatingCompProps {
  rating: any;
  reviews: Review[];
}

const RatingComp: React.FC<RatingCompProps> = ({ rating, reviews }) => {
  const renderReviewItem = ({ item }: { item: Review }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewerName}>{item.reviewerName}</Text>
        <Text style={styles.reviewStars}>{'★'.repeat(item.rating)}</Text>
      </View>
      <Text style={styles.comment}>{item.comment}</Text>
      <Text style={styles.date}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Reviews ({reviews?.length || 0})</Text>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>★ {rating?.toFixed(1)}</Text>
        </View>
      </View>

      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: Sizes.size_10 }}
      />
    </View>
  );
};

export default RatingComp;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Sizes.size_20,
    marginTop: Sizes.size_20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizes.size_15,
  },
  title: {
    fontSize: Sizes.size_18,
    fontFamily: fonts.style,
    fontWeight: '600',
  },
  ratingBadge: {
    backgroundColor: colors.backgroundNormal,
    paddingHorizontal: Sizes.size_12,
    paddingVertical: Sizes.size_4,
    borderRadius: Sizes.size_12,
  },
  ratingText: {
    fontSize: Sizes.size_14,
    fontFamily: fonts.style,
    fontWeight: '600',
  },
  reviewCard: {
    padding: Sizes.size_12,
    borderRadius: Sizes.size_15,
    marginBottom: Sizes.size_12,
    borderWidth: 1,
    borderColor: colors.backgroundNormal,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Sizes.size_5,
  },
  reviewerName: {
    fontWeight: '600',
    fontFamily: fonts.style,
    opacity: 0.8,
    fontSize: Sizes.size_14,
  },
  reviewStars: {
    color: '#FFD700',
  },
  comment: {
    fontSize: Sizes.size_13,
    opacity: 0.7,
    fontFamily: fonts.style,
    marginTop: Sizes.size_2,
  },
  date: {
    fontSize: Sizes.size_10,
    opacity: 0.4,
    marginTop: 6,
    textAlign: 'right',
  },
});

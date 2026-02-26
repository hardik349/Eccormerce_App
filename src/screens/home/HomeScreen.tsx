import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TopBar from '../globalComponents/TopBar';
import SectionRow from './components/SectionRow';
import { ScrollView } from 'react-native-gesture-handler';
import CategoriesComp from './components/CategoriesComp';
import { Sizes } from '../../styles/sizes';
import TrendingComp from './components/TrendingComp';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <TopBar />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <SectionRow />
        <Text style={styles.categoryText}>Category</Text>

        <CategoriesComp />

        <TrendingComp />
        <Text style={styles.categoryText}>Category</Text>

        <CategoriesComp />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  categoryText: {
    fontSize: Sizes.size_27,
    fontFamily: fonts.style,
    fontWeight: '500',
    paddingVertical: Sizes.size_15,
    alignSelf: 'center',
  },
});

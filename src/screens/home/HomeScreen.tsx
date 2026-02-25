import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TopBar from '../globalComponents/TopBar';
import SectionRow from './components/SectionRow';
import { ScrollView } from 'react-native-gesture-handler';
import CategoriesComp from './components/CategoriesComp';
import { Sizes } from '../../styles/sizes';
import TrendingComp from './components/TrendingComp';

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
    backgroundColor: '#FFF',
  },
  categoryText: {
    fontSize: Sizes.size_27,
    fontFamily: 'Cochin',
    fontWeight: '800',
    paddingVertical: Sizes.size_15,
    alignSelf: 'center',
  },
});

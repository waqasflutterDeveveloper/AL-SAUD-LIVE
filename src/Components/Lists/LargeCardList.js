import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../../consts/colors';
import font from '../../consts/font';
import NewHomeCard from '../Cards/NewHomeCard';
import {setHomeDetailedData} from '../../Store/HomeData/HomeSlice';
import {useReviewsApi} from '../../apis/Home';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../Helpers/LanguageContext';
import {arTranslations} from '../../translations/ar';
import {enTranslations} from '../../translations/en';
const LargeCadList = ({
  data,
  headText,
  viewAll = false,
  onPressViewAll,
  horizontal = true,
  isFav,
  spaceDown = false,
  ListFooterComponent,
  ListHeaderComponent,
}) => {
  const dispatch = useDispatch();
  const {mutate: useReviews} = useReviewsApi();
  const navigation = useNavigation();
  const handleHomeClick = house => {
    dispatch(setHomeDetailedData(house));
    // useReviews(house);
    navigation.navigate('Details_Screen', {id: house?.id});
  };
  const {isDark} = useSelector(state => state.Home);
  const {language, switchLanguage} = useLanguage();

  const translations = language === 'ar' ? arTranslations : enTranslations;
  const Item = ({item}) => (
    <NewHomeCard
      data={item}
      horizontal={horizontal}
      isFav={isFav}
      onPress={() => handleHomeClick(item)}
    />
  );
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {headText && (
        <TouchableOpacity onPress={onPressViewAll} style={styles.container}>
          <Text style={[styles.headText, {color: COLORS(isDark).WhiteForDark}]}>
            {headText}
          </Text>
          {viewAll && (
            <Text style={styles.moreView}>{translations['View All']} </Text>
          )}
        </TouchableOpacity>
      )}

      <FlatList
        data={data}
        horizontal={horizontal}
        ItemSeparatorComponent={() => (
          <View style={{marginTop: horizontal ? 0 : 10}} />
        )}
        ListHeaderComponent={ListHeaderComponent}
        showsHorizontalScrollIndicator={false}
        renderItem={Item}
        ListFooterComponent={ListFooterComponent}
        keyExtractor={item => item.id}
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={2} // Reduce initial render amount
        maxToRenderPerBatch={1} // Reduce number in each render batch
        updateCellsBatchingPeriod={100} // Increase time between renders
      />
      {spaceDown && <View style={styles.down} />}
    </View>
  );
};

export default LargeCadList;

const styles = StyleSheet.create({
  headText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS().black,
    marginVertical: font.xl,
    marginHorizontal: font.xl,
  },
  top: {width: 10},
  moreView: {
    color: COLORS().blue,
    fontSize: 12,
    marginHorizontal: 15,
  },
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  down: {height: font.height * 0.18},
});

import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import MediumTwoCardH from '../Cards/MediumTwoCardH';
import {COLORS} from '../../consts/colors';
import font from '../../consts/font';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useLanguage} from '../../Helpers/LanguageContext';
import {arTranslations} from '../../translations/ar';
import {enTranslations} from '../../translations/en';

const MediumTwoCardHList = ({data, onPressViewAll, headText, viewAll}) => {
  const navigation = useNavigation();
  const {language, switchLanguage} = useLanguage();

  const translations = language === 'ar' ? arTranslations : enTranslations;
  const HandleSubmit = async id => {
    // propertybytypeCall();
    navigation.navigate('houses', {type: 'property_by_project', id});
  };
  const Item = ({item}) => (
    <MediumTwoCardH data={item} onPress={() => HandleSubmit(item.id)} />
  );
  const {isDark} = useSelector(state => state.Home);

  return (
    <>
      {data?.length > 0 && (
        <View>
          <TouchableOpacity onPress={onPressViewAll} style={styles.container}>
            <Text
              style={[styles.headText, {color: COLORS(isDark).WhiteForDark}]}>
              {headText}
            </Text>
            {viewAll && (
              <Text style={styles.moreView}>{translations['View All']} </Text>
            )}
          </TouchableOpacity>
          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={Item}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </>
  );
};

export default MediumTwoCardHList;

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
  },
});

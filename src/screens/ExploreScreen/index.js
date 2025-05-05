import {SafeAreaView, View, ScrollView, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import LargeCadList from '../../Components/Lists/LargeCardList';
import NewNavDesign from '../../Components/Navigation/NewNavDesign';
import {COLORS} from '../../consts/colors';
import Header from '../../Components/Header';
import MediumTwoCardHList from '../../Components/Lists/MediumTwoCardHList';
import {popular_propertiesApi, BestsellingPropertiesApi} from '../../apis/Home';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {setHomeData} from '../../Store/HomeData/HomeSlice';
import Skeleton from '../../Components/Skeleton';
import {useLanguage} from '../../Helpers/LanguageContext';
import {arTranslations} from '../../translations/ar';
import {enTranslations} from '../../translations/en';
const ExploreScreen = ({navigation}) => {
  const {mutate: popular_propertiesCall, isLoading} = popular_propertiesApi();
  const {mutate: BestsellingPropertiesCall, isLoading: isloadinbest} =
    BestsellingPropertiesApi();

  useEffect(() => {
    popular_propertiesCall({});
    BestsellingPropertiesCall({});
  }, []);
  const {popular_properties, bestselling_properties} = useSelector(
    state => state.Home,
  );
  const {language, switchLanguage} = useLanguage();

  const translations = language === 'ar' ? arTranslations : enTranslations;
  const dispatch = useDispatch();
  const onPressViewAll = () => {
    dispatch(setHomeData(popular_properties));
    navigation.navigate('houses', {type: 'not'});
  };
  const {isDark} = useSelector(state => state.Home);

  return (
    <SafeAreaView
      style={{
        marginTop: StatusBar.currentHeight,
        backgroundColor: COLORS(isDark).white,
        flex: 1,
        height: '100%',
      }}>
      {isloadinbest && isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        <ScrollView style={{height: '100%'}}>
          <Header title={`${translations['Explore']}`} />

          <LargeCadList
            data={popular_properties}
            headText={`${translations['Popular Properties']}`}
            viewAll
            onPressViewAll={onPressViewAll}
          />
          <MediumTwoCardHList
            data={bestselling_properties}
            headText={`${translations['Best Selling']}`}
            viewAll={false}
          />
          <LargeCadList
            data={popular_properties}
            headText={`${translations['Good Deals']}`}
            viewAll
            onPressViewAll={onPressViewAll}
          />
          <View style={styles.down} />
        </ScrollView>
      )}

      {/* <NewNavDesign navigation={navigation} index={1} /> */}
    </SafeAreaView>
  );
};

export default ExploreScreen;

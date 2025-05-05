import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import CommonCard from '../../Components/Cards/DocumentsCards/commonCard';
import PropertyCard from '../../Components/Cards/PropertyCard';
import {COLORS} from '../../consts/colors';
import Header from '../../Components/Header';
import {useSelector} from 'react-redux';
import DocumentCard from '../../Components/Cards/DocumentCard';
import {useNavigation} from '@react-navigation/native';
import { useLanguage } from '../../Helpers/LanguageContext';
import { arTranslations } from '../../translations/ar';
import { enTranslations } from '../../translations/en';

const Index = ({route}) => {
  const selectedProp = useSelector(state => state.MyProperties.selectedProp);
  const main = route.params.main;
  const navigation = useNavigation();
  const {isDark} = useSelector(state => state.Home);
  const {language, switchLanguage} = useLanguage();
  const translations = language === 'ar' ? arTranslations : enTranslations;
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS(isDark).white,
        flex: 1,
        // flexDirection: 'row',
        justifyContent: 'flex-start',
      }}>
      <StatusBar
        translucent={true}
        backgroundColor={COLORS().white}
        barStyle="dark-content"
      />
      <ScrollView>
        <Header back title={translations['Property Details']} />
        <PropertyCard item={selectedProp} />
        <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
              marginVertical: 5,
              width: '100%',
            }}>
            {selectedProp?.contract?.name}
          </Text>
          <Text
            style={{fontSize: 14, color: COLORS().lightGrey, marginBottom: 5}}>
            {selectedProp?.contract?.date_from} - {translations['To']} -{' '}
            {selectedProp?.contract?.date_to}
          </Text>
        </View>
        <CommonCard item={selectedProp?.contract} />
        <View
          style={{
            width: '90%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginHorizontal: '5%',
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <View
            style={{
              height: 20,
              width: 2.5,
              backgroundColor: COLORS().red,
            }}
          />

          <Text
            style={{
              color: COLORS().red,
              fontWeight: '700',
              marginHorizontal: 5,
              fontSize: 16,
            }}>
            pdf
          </Text>
        </View>
        <View
          style={{
            marginBottom: 20,
          }}>
          <Pressable onPress={() => navigation.navigate('PdfView', main)}>
            <DocumentCard item={main} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

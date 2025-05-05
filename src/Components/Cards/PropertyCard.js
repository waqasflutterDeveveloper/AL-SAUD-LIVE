import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import house from '../../consts/houses';
import {COLORS} from '../../consts/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {setselectedProp} from '../../Store/MyProperty/MyPropertySlice';
import {useDispatch} from 'react-redux';
import font from '../../consts/font';
import {color} from 'react-native-reanimated';
import {useEffect, useState} from 'react';
import {useLanguage} from '../../Helpers/LanguageContext';
import {arTranslations} from '../../translations/ar';
import {enTranslations} from '../../translations/en';
import {useSelector} from 'react-redux';
import SCREEN from '../../../Layout';

const PropertyCard = ({parent, item, navigate}) => {
  const navigation = useNavigation();
  const {isDark} = useSelector(state => state.Home);
  const dispatch = useDispatch();
  const Diff = () => {
    const currentDate = new Date();
    const futureDate = new Date(item?.date_to);
    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear();
    // let currentDate = `${year}-${month}-${day}`;
    const diffTime = Math.abs(futureDate - currentDate);

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const {language, switchLanguage} = useLanguage();

  const translations = language === 'ar' ? arTranslations : enTranslations;
  return (
    <TouchableOpacity
      onPress={() => {
        if (navigate) {
          dispatch(setselectedProp(item));
          navigation.navigate('PropertyInfo', {
            item,
          });
        }
      }}>
      <View
        style={{
          height: 'auto',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          borderRadius: 15,
          marginTop: 10,
          paddingHorizontal: 10,
          backgroundColor: COLORS(isDark).New,
          paddingVertical: 5,
          marginHorizontal: 15,
          borderWidth: 1,
          borderColor: COLORS(isDark).greyForDark,
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            marginTop: 5,
          }}>
          <Text
            style={{
              textAlign: 'right',
              paddingHorizontal: 5,
              paddingVertical: 3,
              color: COLORS().white,
              backgroundColor: COLORS().red,
              borderRadius: 5,
            }}>
            {item?.state_name}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: COLORS(isDark).New,
            borderRadius: 12,
            marginVertical: 5,
            width: '100%',
            borderWidth: 1,
            borderColor: COLORS(isDark).blue,
            height: 120,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Image
              style={{
                height: 70,
                width: 70,
                backgroundColor: COLORS(isDark).cardForDark,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 3,
              }}
              source={
                item?.image_128
                  ? {uri: `data:image/jpeg;base64,${item?.image_128}`}
                  : require('../../assets/unknown.jpg')
              }
              resizeMode="contain"
            />
            <View
              style={{
                marginHorizontal: 5,
                width: font.width * 0.47,
                paddingBlock: 10,
              }}>
              <Text
                style={{
                  color: COLORS().blue,
                  fontWeight: '500',
                  fontSize: 12,
                }}
                numberOfLines={1}>
                {' '}
                {item?.name}
              </Text>
              <Text style={{color: COLORS().grey, fontSize: 12}}>
                {' '}
                {item?.project_id?.[1]}
              </Text>
              {/* <Text
                style={{
                  color: COLORS().blue,
                  fontSize: 12,
                  fontWeight: '700',
                }}>
                {translations['Ref']} : {item?.code}
              </Text> */}
              <Text
                style={[
                  {
                    marginTop: 5,
                    backgroundColor: COLORS(isDark).greyForDark,
                    color: SCREEN.BLUE,
                    fontSize: 10,
                    backgroundColor: SCREEN.GREY,
                    paddingHorizontal: 6,
                    paddingVertical: 3,
                    borderRadius: 6,
                    width: '50%',
                  },
                ]}>
                {item?.type}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 5,
              backgroundColor: COLORS().blue,
              padding: 6,
              borderRadius: 40,
            }}>
            <MaterialIcons
              name="arrow-forward-ios"
              size={13}
              color={COLORS().white}
              // onPress={navigation.goBack}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  line: {
    // borderBottomColor: COLORS().grey,
    // borderColor: 'white',
    width: '90%',
    height: 1,
    borderWidth: 0.5,
    // opacity: 0.4,
    marginVertical: 20,
    marginHorizontal: '5%',
    // height: 10,
  },
  divided: {
    borderBottomColor: COLORS().bottomBorder,
    borderBottomWidth: 1,
    width: '95%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  subTitle: {
    color: COLORS().lightGrey,
    fontWeight: '500',
    fontSize: 12,
  },
  boldText: {
    color: COLORS().dark,
    fontWeight: '700',
  },
});
export default PropertyCard;

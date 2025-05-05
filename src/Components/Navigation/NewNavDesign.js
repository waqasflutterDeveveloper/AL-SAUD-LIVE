import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SCREEN from '../../../Layout';
import {tintColor} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import {arTranslations} from '../../translations/ar';
import {enTranslations} from '../../translations/en';
import {useLanguage} from '../../Helpers/LanguageContext';
import {setbottomNavIndex} from '../../Store/HomeData/HomeSlice';
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import {COLORS} from '../../consts/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

const NewNavDesign = ({navigation, index}) => {
  const {userInfo} = useSelector(state => state.userinfo);
  const {bottomNavIndex} = useSelector(state => state.Home);
  const {isDark} = useSelector(state => state.Home);

  const {language, switchLanguage} = useLanguage();

  const dispatch = useDispatch();
  const translations = language === 'ar' ? arTranslations : enTranslations;
  const route = useRoute();
  const routeName = useNavigationState(state => {
    const route = state.routes[state.index];

    // If the current route has nested routes, get the route name from the nested state
    if (route.state) {
      return route.state.routes[route.state.index].name;
    }

    // Otherwise, return the name of the current route
    return route.name;
  });
  return (
    <>
      <View
        style={[
          styles.container,
          {backgroundColor: 'transparent', opacity: 1},
        ]}>
        <ImageBackground
          style={[styles.ImageBackground]}
          source={
            isDark
              ? require('../../assets/backNav_blue.png')
              : require('../../assets/backnav.png')
          }>
          <View style={styles.AllItems}>
            {routeName != 'CreateRequestScreen' && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MyProperties');

                  dispatch(setbottomNavIndex(10));
                }}
                style={styles.itemSearch}>
                <Image source={require('../../assets/Search.png')} />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                navigation.navigate('Main');
                dispatch(setbottomNavIndex(0));
              }}>
              {/* <Image source={require('../../assets/home.png')} /> */}

              {bottomNavIndex == 0 ? (
                <Image source={require('../../assets/png/home2.png')} />
              ) : (
                <Image source={require('../../assets/png/home.png')} />
              )}
              <Text style={bottomNavIndex == 0 ? styles.text : styles.textgrey}>
                {translations['Home']}
              </Text>
              {bottomNavIndex == 0 && <View style={{...styles.dot}}></View>}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Explore');
                dispatch(setbottomNavIndex(1));
              }}
              style={[styles.item]}>
              {/* <Image source={require('../../assets/campass.png')} /> */}
              {bottomNavIndex == 1 ? (
                <FontAwesome5 name="bandcamp" color={COLORS().red} size={28} />
              ) : (
                <FontAwesome5 name="bandcamp" color={COLORS().gray} size={28} />
                // <Image source={require('../../assets/png/compass.png')} />
              )}
              <Text style={bottomNavIndex == 1 ? styles.text : styles.textgrey}>
                {translations['Explore']}
              </Text>
              {bottomNavIndex == 1 && <View style={{...styles.dot}}></View>}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Fav');
                dispatch(setbottomNavIndex(3));
              }}
              style={styles.item}>
              <AntDesign
                name="hearto"
                style={{
                  color:
                    bottomNavIndex == 3 ? COLORS().red : COLORS().lightGrey,
                  fontSize: 25,
                }}
              />
              {/* <Image source={require('../../assets/Heart.png')} /> */}
              <Text style={bottomNavIndex == 3 ? styles.text : styles.textgrey}>
                {translations['Favourite']}
              </Text>
              {bottomNavIndex == 3 && <View style={{...styles.dot}}></View>}
              {/* <View style={{...styles.dot}}></View> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(setbottomNavIndex(4));

                userInfo?.partner_id
                  ? navigation.navigate('Settings')
                  : navigation.navigate('login');
              }}
              style={styles.item}>
              {bottomNavIndex == 4 ? (
                <Image source={require('../../assets/png/more2.png')} />
              ) : (
                <Image source={require('../../assets/png/more.png')} />
              )}
              <Text style={bottomNavIndex == 4 ? styles.text : styles.textgrey}>
                {translations['More']}
              </Text>
              {bottomNavIndex == 4 && <View style={{...styles.dot}}></View>}
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100,
    width: SCREEN.WIDTH,

    bottom: 0,
    position: 'absolute',
  },
  text: {color: SCREEN.OREANGE},
  ImageBackground: {
    position: 'absolute',
    bottom: -30,
    left: 0,
    right: 0,
    height: 120,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  AllItems: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    maxWidth: 100,
    width: 80,
  },
  itemSearch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 35,
    left: '36%',
  },
  dot: {
    padding: 2,
    backgroundColor: SCREEN.OREANGE,
    borderRadius: 50,
  },
  textgrey: {
    color: SCREEN.DARKGREY,
    fontSize: 12,
  },
});
export default NewNavDesign;

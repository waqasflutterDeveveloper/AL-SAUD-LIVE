import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import React from 'react';
import SCREEN from '../../../Layout';
import {ImageBackground} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native';
import FirstInput from '../Inputs/FirstInput';
import SearchInput from '../Inputs/SearchInput';
import {COLORS} from '../../consts/colors';
import {useLanguage} from '../../Helpers/LanguageContext';
import {arTranslations} from '../../translations/ar';
import {enTranslations} from '../../translations/en';
const TopCard = ({user}) => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');
  const {language, switchLanguage} = useLanguage();

  const translations = language === 'ar' ? arTranslations : enTranslations;
  const navigation = useNavigation();
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={require('../../assets/logo2.jpeg')}>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#18212C',
          opacity: 0.1,
          zIndex: 1,
          position: 'absolute',
        }}></View>
      <View style={styles.outerbox}>
        <View style={styles.box}>
          <View style={styles.innerbox}>
            <Text style={styles.textGrey}>{translations['Welcome back']},</Text>
            <Text style={styles.text}>{user ? user?.name : 'Guest'}</Text>
          </View>
          {/* onPress={() => navigation.navigate('Navigation')} */}
          <TouchableOpacity
            style={styles.noty}
            onPress={() => navigation.navigate('Notification')}>
            <Image
              style={styles.image}
              source={require('../../assets/noty.png')}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '80%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginLeft: -50,
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              // backgroundColor: 'red',
            }}>
            <View
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexDirection: 'row',
                // backgroundColor: 'red',
              }}>
              <Text
                style={{
                  marginRight: 15,
                  color: SCREEN.OREANGE,
                  fontSize: 26,
                  textAlign: 'left',
                  marginRight: 5,
                  fontWeight: 'bold',
                }}>
                {translations['Find']}
              </Text>
              <Text
                style={{
                  marginRight: 15,
                  color: SCREEN.OREANGE,
                  ...styles.fontlarge,
                }}>
                {translations['Your Perfect']}
              </Text>
            </View>

            <Text style={styles.fontlarge}> {translations['Place']}</Text>
          </View>
        </View>
        <View style={styles.searchbox}>
          <SearchInput
            styleInputContainer={{backgroundColor: COLORS().bgInput}}
            title={`${translations['Search by Name or Ref No.']}`}
            editable={false}
            styleInput={{height: 40}}
            navigation={navigation}
            onPress={() => navigation.navigate('Search')}
          />
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: SCREEN.WIDTH * 0.81,
    width: SCREEN.WIDTH,
    backgroundColor: 'blue',
    position: 'relative',
    marginBottom: 50,
    marginTop: StatusBar.currentHeight,
  },
  outerbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 60,
    width: '90%',
    zIndex: 55,
    height: SCREEN.WIDTH * 0.81,
    // backgroundColor: 'red',
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 60,
    width: '100%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: SCREEN.WHITE,
    color: SCREEN.DARKGREY,
  },
  innerbox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    // backgroundColor: 'red',
  },
  image: {
    width: 50,
    height: 50,
    tintColor: COLORS().blue,
  },

  text: {
    color: SCREEN.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 3,
  },
  textminy: {
    color: SCREEN.BLUE,
    fontSize: 10,
    backgroundColor: SCREEN.GREY,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  orangebox: {
    height: 45,
    width: 45,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orangeboxmain: {
    // width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  fontlarge: {
    fontSize: 26,
    color: SCREEN.WHITE,
    textAlign: 'left',
    // marginLeft: -25,
    fontWeight: 'bold',
  },
  fontextralarge: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textGrey: {
    color: SCREEN.MIDDLEGREY,
    fontSize: 15,
    marginHorizontal: 2,
    marginVertical: 2,
  },
  searchbox: {
    position: 'absolute',
    bottom: -20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: '100%',
  },
  noty: {
    position: 'absolute',
    top: -100,
    right: 10,
  },
});
export default TopCard;

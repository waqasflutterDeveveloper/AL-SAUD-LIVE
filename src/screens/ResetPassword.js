import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';

import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import Toast from 'react-native-toast-message';
// import Toast from 'react-native-simple-toast';
import {api} from '../axios';
import {TextInput} from '@react-native-material/core';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useValidation} from 'react-native-form-validator';
import {COLORS} from '../consts/colors';
import FirstInput from '../Components/Inputs/FirstInput';
import BasicButton from '../Components/Buttons/BasicButton';
const {width} = Dimensions.get('screen');
import {useLoginApi} from '../apis/Auth/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {setEnabled} from 'react-native/libraries/performance/systrace';
import {arTranslations} from '../translations/ar';
import {enTranslations} from '../translations/en';
import {useLanguage} from '../Helpers/LanguageContext';

const ResetPassword = ({
  navigation,
  route,
  setIsAuth,
  isAuth,
  setisRegister,
}) => {
  const [email, setResetPassword] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const isFocused = useIsFocused();

  const [error, setError] = useState(false);

  const {validate, isFieldInError, getErrorsInField, getErrorMessages} =
    useValidation({
      state: {email},
    });
  // const showToast = () => {
  //   Toast.show({
  //     type: 'success',
  //     text1: 'Hello',
  //     text2: 'This is some something 👋',
  //   });
  // };
  const [login, setLogin] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const {userInfo} = useSelector(state => state.userinfo);

  const HandleLogin = async event => {
    //
  };
  const HandleReset = async () => {
    setisLoading(true);
    validate({
      email: {required: true, minlength: 2},
    });
    try {
      const res = await api.post('/api/reset_password', {
        params: {
          login: email,
        },
      });

      if (res) {
        setisLoading(false);

        // Toast.show('Email sent Succefully.', Toast.LONG, {
        //   backgroundColor: 'orange',
        // });
      }
      // setTimeout(() => {
      //   setisLoading(false);
      // }, 500);
      navigation.navigate('login');
    } catch (error) {}
  };
  useEffect(() => {}, []);
  const {language, switchLanguage} = useLanguage();

  const translations = language === 'ar' ? arTranslations : enTranslations;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS().white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* House image */}
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />

        <View style={style.backgroundImageContainer}>
          <ImageBackground
            style={style.backgroundImage}
            source={require('../assets/city.png')}></ImageBackground>
        </View>
        <View style={style.detailsContainer}>
          {/* <Image
            style={{marginVertical: 10}}
            source={require('../assets/logo.png')}
          /> */}
          <Text style={style.text}>Reset Password </Text>
          <TextInput
            variant="outlined"
            label={`${translations['Email address']}`}
            placeholderTextColor={COLORS().blue}
            style={{borderRadius: 15, width: '100%', marginVertical: 10}}
            color={COLORS().blue}
            borderRadius={10}
            value={email}
            onChangeText={e => setResetPassword(e)}
          />

          {/* <FirstInput
            text="Email address"
            value={resetPassword}
            fun={e => setResetPassword(e)}
            Icon={
              <Ionicons
                name="at"
                size={25}
                style={{marginHorizontal: 7}}
                color={COLORS().red}
              />
            }
          /> */}
          {isFieldInError('email') &&
            getErrorsInField('email').map(errorMessage => (
              <Text key={errorMessage} style={{color: 'red'}}>
                {errorMessage}
              </Text>
            ))}
          {error && (
            <Text style={{color: 'red'}}>Please Enter Your Email!</Text>
          )}

          <BasicButton
            text={
              isLoading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                'Reset'
              )
            }
            style={{backgroundColor: COLORS().blue}}
            disable={!email}
            onPress={() => HandleReset()}
          />

          <View>
            <Pressable onPress={() => navigation.navigate('login')}>
              <Text
                style={{
                  color: COLORS().blue,
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginVertical: 5,
                  textDecorationLine: 'underline',
                }}>
                Signin?
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  backgroundImageContainer: {
    elevation: 20,
    // marginHorizontal: 20,
    // marginTop: 20,
    alignItems: 'center',
    height: 250,
    zIndex: 1,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS().white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  ratingTag: {
    height: 30,
    width: 35,
    backgroundColor: COLORS().blue,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  virtualTag: {
    top: -20,
    width: 120,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS().dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  footer: {
    height: 70,
    backgroundColor: COLORS().light,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  bookNowBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS().dark,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  detailsContainer: {
    // flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
    margin: 'auto',
    //  position: 'absolute',
    // marginHorizontal:10,
    backgroundColor: COLORS().white,
    zIndex: 5,
    paddingTop: 20,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },

  text: {
    color: COLORS().blue,
    fontWeight: 'bold',
    fontSize: 18,
    // width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  bluebox: {
    width: '90%',
    backgroundColor: COLORS().backgroundblue,
    borderRadius: 10,
    marginVertical: 8,
    paddingVertical: 3,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
  },
  blueboxtext: {
    color: COLORS().blue,
    fontSize: 14,
    marginHorizontal: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  callSupport: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  callSupportIcon: {
    backgroundColor: COLORS().red,
    padding: 8,
    borderRadius: 50,
  },
  container: {
    // ...StyleSheet.absoluteFillObject,
    //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 200,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  margin: {
    marginHorizontal: 5,
    color: COLORS().blue,
  },
});

export default ResetPassword;

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {I18nManager} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from '../consts/colors';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Pressable} from 'react-native';
import {useNavigation, useNavigationBuilder} from '@react-navigation/native';
import {setLogout} from '../Store/Message/MessageSlice';
import {useDispatch} from 'react-redux';
import RNRestart from 'react-native-restart';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native';
import SettingCard from '../Components/Cards/SettingCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native';

import {useHelpCenterApi, useSaveFCMWhenlogoutApi} from '../apis/Home/index';
import Header from '../Components/Header';
import ArrowIcon from '../Components/ArrowIcon';
import NewNavDesign from '../Components/Navigation/NewNavDesign';
import font from '../consts/font';
import {setDarkState} from '../Store/HomeData/HomeSlice';
import {getRTL} from '../Helpers/RTLUtil';
import {arTranslations} from '../translations/ar';
import {enTranslations} from '../translations/en';
import {useLanguage} from '../Helpers/LanguageContext';

const Setting = () => {
  const {language, switchLanguage} = useLanguage();

  const translations = language === 'ar' ? arTranslations : enTranslations;

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const {mutate: HelpCenterApi, isLoading} = useHelpCenterApi();
  const {userInfo} = useSelector(state => state.userinfo);
  const {isDark} = useSelector(state => state.Home);
  const [isRTL, setIsRTL] = useState(getRTL());
  const {mutate} = useSaveFCMWhenlogoutApi();

  const toggleRTL = () => {
    setIsRTL(!getRTL());
    I18nManager.forceRTL(!getRTL());
    I18nManager.allowRTL(!getRTL());
    RNRestart.Restart();
  };
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const logout = async () => {
    const res = await AsyncStorage.removeItem('User');
    //
    mutate();

    dispatch(setLogout(true));
    setTimeout(() => {
      RNRestart.Restart();
    }, 1000);
  };
  useEffect(() => {
    //
    HelpCenterApi();

    return () => {};
  }, []);

  const toggleDarkModeHandler = async () => {
    // Toggle the dark mode state in Redux
    dispatch(setDarkState(!isDark));

    // Save the dark mode preference to AsyncStorage
    try {
      await AsyncStorage.setItem('darkMode', String(!isDark));
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS(isDark).dark,
        height: '100%',
      }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Header title={translations['More']} />
      <ScrollView>
        <SettingCard
          title={`${translations['Account']}`}
          container={
            <View>
              <ArrowIcon
                title={translations['Personal Information']}
                onPress={() => navigation.navigate('PersonalInformation')}
                icon={
                  <AntDesign
                    name="user"
                    style={{fontSize: 25, color: isDark ? 'white' : 'gray'}}
                  />
                }
              />
              <ArrowIcon
                title={translations['Recovery Password']}
                onPress={() => navigation.navigate('CreateNewPassword')}
                icon={
                  <AntDesign
                    name="lock"
                    style={{fontSize: 25, color: isDark ? 'white' : 'gray'}}
                  />
                }
              />
              <ArrowIcon
                title={translations['My Properties']}
                onPress={() => navigation.navigate('MyProperties')}
                icon={
                  <AntDesign
                    name="home"
                    style={{fontSize: 25, color: isDark ? 'white' : 'gray'}}
                  />
                }
              />
              <ArrowIcon
                title={translations['My Visits']}
                onPress={() => navigation.navigate('myVisits')}
                icon={
                  <AntDesign
                    name="calendar"
                    style={{fontSize: 25, color: isDark ? 'white' : 'gray'}}
                  />
                }
              />
              <ArrowIcon
                title={translations['My Favourits']}
                onPress={() => navigation.navigate('Fav')}
                icon={
                  <AntDesign
                    name="heart"
                    style={{fontSize: 25, color: isDark ? 'white' : 'gray'}}
                  />
                }
              />
            </View>
          }
        />

        <SettingCard
          title={`${translations['General']}`}
          container={
            <View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 15,
                }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Entypo
                    name="moon"
                    style={{fontSize: 25, color: isDark ? 'white' : 'gray'}}
                  />
                  <Text
                    style={{
                      color: COLORS(isDark).WhiteForDark,
                      marginHorizontal: 10,
                    }}>
                    {translations.Dark_Mode}
                  </Text>
                </View>
                <View style={{marginLeft: 20}}>
                  <Switch
                    trackColor={{false: '#767577', true: COLORS().red}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleDarkModeHandler}
                    value={isDark}
                  />
                </View>
              </View>
              {/* <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 15,
                }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Entypo
                    name="language"
                    style={{fontSize: 25, color: isDark ? 'white' : 'gray'}}
                  />

                  <Text
                    style={{
                      color: COLORS(isDark).WhiteForDark,
                      marginHorizontal: 10,
                    }}>
                    {translations['arabic']}
                  </Text>
                </View>
                <View style={{marginLeft: 20}}>
                  <Switch
                    trackColor={{false: '#767577', true: COLORS().red}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleRTL}
                    value={isRTL}
                  />
                </View>
              </View> */}
              {/* <ArrowIcon
                title={'Language'}
                // onPress={() => navigation.navigate('RecoveryPassword')}
                icon={<Image source={require('../assets/png/language.png')} />}
              /> */}
              <ArrowIcon
                title={translations['Help Center']}
                onPress={() => navigation.navigate('HelpCenterScreen')}
                icon={
                  <Entypo
                    name="help"
                    style={{fontSize: 25, color: isDark ? 'white' : 'gray'}}
                  />
                }
              />
            </View>
          }
        />

        <SettingCard
          title={translations['About']}
          container={
            <View>
              <ArrowIcon
                title={translations['Privacy & Policy']}
                onPress={() => navigation.navigate('Policy')}
                icon={
                  <Entypo
                    name="key"
                    style={{fontSize: 25, color: isDark ? 'white' : 'gray'}}
                  />
                }
              />

              <ArrowIcon
                title={translations['Terms of Services']}
                onPress={() => navigation.navigate('TermsOfService')}
                icon={
                  <Entypo
                    name="key"
                    style={{fontSize: 25, color: isDark ? 'white' : 'gray'}}
                  />
                }
              />
              <ArrowIcon
                title={translations['About us']}
                onPress={() => navigation.navigate('AboutUs')}
                icon={
                  <Entypo
                    name="help"
                    style={{fontSize: 25, color: isDark ? 'white' : 'gray'}}
                  />
                }
              />
            </View>
          }
        />

        <Pressable onPress={() => logout()}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignContent: 'center',
              flexDirection: 'row',
              padding: 15,
            }}>
            <Ionicons
              style={{paddingRight: 20, paddingLeft: 10}}
              name="log-out-outline"
              color={COLORS().red}
              size={25}
            />
            <Text style={{fontSize: 15, color: COLORS().red}}>
              {translations['Logout']}
            </Text>
          </View>
        </Pressable>
        <View style={styles.down} />
      </ScrollView>

      {/* <NewNavDesign navigation={navigation} index={4} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 75,
    height: 75,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 50,
  },
  text: {
    color: 'white',
    fontSize: 30,
    lineHeight: 80,
    fontWeight: 'bold',
  },
  down: {height: font.height * 0.18},
});

export default Setting;

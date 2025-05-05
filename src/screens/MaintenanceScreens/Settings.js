import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';

import {COLORS} from '../../consts/colors';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {setLogout} from '../../Store/Message/MessageSlice';
import {useDispatch} from 'react-redux';
import RNRestart from 'react-native-restart';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native';
import SettingCard from '../../Components/Cards/SettingCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native';

import {useHelpCenterApi} from '../../apis/Home/index';
import Header from '../../Components/Header';
import ArrowIcon from '../../Components/ArrowIcon';
import font from '../../consts/font';
import MaintenanceNavDesign from '../../Components/Navigation/MaintenanceNavDesign';

const Setting = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const {mutate: HelpCenterApi, isLoading} = useHelpCenterApi();
  const {userInfo} = useSelector(state => state.userinfo);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const logout = async () => {
    const res = await AsyncStorage.removeItem('User');
    //

    dispatch(setLogout(true));
    RNRestart.Restart();
  };
  useEffect(() => {
    //
    HelpCenterApi();

    return () => {};
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: COLORS().white, height: '100%'}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Header title={'More'} />
      <ScrollView>
        <SettingCard
          title={'Account'}
          container={
            <View>
              <ArrowIcon
                title={'Personal Information'}
                onPress={() => navigation.navigate('PersonalInformation')}
                icon={
                  <Image source={require('../../assets/png/profile.png')} />
                }
              />
              <ArrowIcon
                title={'Recovery Password'}
                onPress={() => navigation.navigate('CreateNewPassword')}
                icon={<Image source={require('../../assets/png/lock.png')} />}
              />
            </View>
          }
        />

        <SettingCard
          title={'General'}
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
                  <Image source={require('../../assets/png/bell.png')} />

                  <Text style={{color: 'black', marginHorizontal: 10}}>
                    Notification
                  </Text>
                </View>
                <View style={{marginLeft: 20}}>
                  <Switch
                    trackColor={{false: '#767577', true: COLORS().red}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>

              <ArrowIcon
                title={'Language'}
                // onPress={() => navigation.navigate('RecoveryPassword')}
                icon={
                  <Image source={require('../../assets/png/language.png')} />
                }
              />
              <ArrowIcon
                title={'Help Center'}
                onPress={() => navigation.navigate('HelpCenterScreen')}
                icon={<Image source={require('../../assets/png/help.png')} />}
              />
            </View>
          }
        />

        <SettingCard
          title={'About'}
          container={
            <View>
              <ArrowIcon
                title={'Privacy & Policy'}
                onPress={() => navigation.navigate('Policy')}
                icon={<Image source={require('../../assets/png/key.png')} />}
              />

              <ArrowIcon
                title={'Terms of Services'}
                onPress={() => navigation.navigate('TermsOfService')}
                icon={<Image source={require('../../assets/png/key.png')} />}
              />
              <ArrowIcon
                title={'About us'}
                onPress={() => navigation.navigate('AboutUs')}
                icon={<Image source={require('../../assets/png/help.png')} />}
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
            <Text style={{fontSize: 15, color: COLORS().red}}>Logout</Text>
          </View>
        </Pressable>
        <View style={styles.down} />
      </ScrollView>

      <MaintenanceNavDesign navigation={navigation} index={4} />
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

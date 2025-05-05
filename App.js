import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';

import 'react-native-gesture-handler';
import moment from 'moment-timezone';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid, ToastAndroid, View} from 'react-native';
import {setuserInfo} from './src/Store/Message/MessageSlice';
import {useSelector, useDispatch} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {Appearance} from 'react-native';
import {LanguageProvider} from './src/Helpers/LanguageContext';
import {Alert, Modal, StyleSheet, Text, Pressable} from 'react-native';

import MainStack from './src/Components/Navigation/MainNav';
import MentainanceStack from './src/Components/Navigation/MentainanceStack';

import {NotificationListner, requestUserPermission} from './src/Notifications';
import {useSaveFCMApi, UseGetNotificationsApi} from './src/apis/Home';
import {setDarkState} from './src/Store/HomeData/HomeSlice';
import ParentStack from './src/Components/Navigation/ParentStack';
import TopNotification from './src/Components/Notification/TopNotification';
import {UtcConvert} from './src/Helpers/UtcConvertor';
import DeviceInfo from 'react-native-device-info';
import GetLocation from 'react-native-get-location';
import axios from 'axios';
import ToastNotification from './src/Helpers/Toast';
// import Toast from 'react-native-simple-toast';

function App({setNavigateTo, navigateTo}) {
  const {isDark} = useSelector(state => state.Home);
  const {show} = useSelector(state => state.ToastMessage);

  const [popup, setpopup] = useState(false);
  const {navigate} = useNavigation();

  const handlePopupBtn = route => {
    navigate('MainStack');
    setTimeout(() => {
      navigate('Settings');
    }, 1000);
    setpopup(false);
  };
  const {userInfo, isAuth, logout} = useSelector(state => state.userinfo);
  const {mutate: SaveToken} = useSaveFCMApi();
  const {mutate: GetNotificationsApi} = UseGetNotificationsApi();
  const {Notifications} = useSelector(state => state.Home);
  const MakeNoty = async () => {
    if (userInfo?.partner_id) {
      const FCMToken = await requestUserPermission();
      console.log(FCMToken, 'FCMToken');
      SaveToken({FCM: FCMToken, id: userInfo?.partner_id});
    }
    NotificationListner(setpopup);
  };
  const RecordPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        // console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          // console.log('Permissions granted');
        } else {
          // console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };
  const getDark = async () => {
    try {
      const res = await AsyncStorage.setItem('darkMode', String(!isDark));
      dispatch(setDarkState(res));
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };
  useEffect(() => {
    console.log(show, 'show');
    UtcConvert();
    getDark();
    MakeNoty();
    if (userInfo?.partner_id) {
      GetNotificationsApi({
        id: userInfo?.partner_id,
        model: 'property.contract',
      });
    }
  }, [userInfo]);

  const dispatch = useDispatch();

  const getAuth = async () => {
    const res = await AsyncStorage.getItem('User');
    const parsedUser = JSON.parse(res);
    if (parsedUser) {
      dispatch(setuserInfo(parsedUser));
    }
    return parsedUser;
  };
  useEffect(() => {
    RecordPermission();

    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);

    return () => {};
  }, []);

  useEffect(() => {
    getAuth();
  }, [logout]);
  const HandleDeepLinking = () => {
    const {navigate} = useNavigation();
    const handleDynamicLinks = async link => {
      console.log('Foreground link handling:', link);
      let productId = link.url.split('=').pop();
      console.log('productId:', productId);
      navigate('Details_Screen', {productId: productId});
    };
    useEffect(() => {
      const unsubscribe = dynamicLinks().onLink(handleDynamicLinks);
      return () => unsubscribe();
    }, []);

    return null;
  };
  //Contracts MainStack
  // useEffect(() => {
  //   setInterval(() => {
  //     ToastAndroid.show('Request Created Succefully.', Toast.LONG, {
  //       backgroundColor: 'orange',
  //     });
  //   }, 1000);
  // }, []);
  return (
    <LanguageProvider>
      <HandleDeepLinking />
      <TopNotification />
      {show && <ToastNotification />}

      {popup && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={popup}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            // setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handlePopupBtn()}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
      {userInfo?.partner?.[0]?.is_maintenance && <MentainanceStack />}
      {!userInfo?.partner?.[0]?.is_maintenance && <ParentStack />}
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default App;

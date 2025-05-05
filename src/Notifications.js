import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {PermissionsAndroid} from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Authorization status:', authStatus);
    return getToken();
  } else {
    // console.log('User declined or has not enabled push notifications');
  }
}

export async function getToken() {
  try {
    const token = await messaging().getToken();
    // console.log('FCM token:', token);
    return token;
  } catch (error) {
    // console.log('Error getting FCM token:', error);
  }
}
export const NotificationListner = async setpopup => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    // console.log(
    //   'Notification caused app to open from background state:',
    //   remoteMessage.notification,
    // );
    // console.log(JSON.stringify(remoteMessage, ' first reee'));
    // setpopup(true);
    // handlePopup('Contracts');
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        // console.log(JSON.stringify(remoteMessage, ' second reee'));
        // setpopup('MainStack');
        // setpopup(true);
        // handlePopup('Contracts');
        // console.log(
        //   'Notification caused app to open from quit state:',
        //   remoteMessage.notification,
        // );
      }
      // setLoading(false);
      // console.log(JSON.stringify(remoteMessage, 'rrrr'));
    });

  messaging().onMessage(async remoteMessage => {
    // console.log(JSON.stringify(remoteMessage, 'reee'));
    // setpopup('MainStack');
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });
};

import React, {useEffect, useState} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from '../../consts/colors';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import Notification from '../../screens/Notification';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function ModalTester() {
  const [isModalVisible, setModalVisible] = useState(false);
  const {navigate} = useNavigation();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    navigate('Notification');
  };
  useEffect(() => {
    setTimeout(() => {
      setModalVisible(false);
    }, 3000);
  }, [title]);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // console.log(remoteMessage?.notification);
      setModalVisible(true);
      setTitle(remoteMessage?.notification?.title);

      setBody(remoteMessage?.notification?.body);
    });

    return unsubscribe;
  }, []);
  return (
    <Modal
      isVisible={isModalVisible}
      animationInTiming={1000}
      animationOutTiming={1000}
      deviceHeight={1}
      animationOut={'slideOutRight'}
      animationIn={'slideInDown'}>
      <View
        style={{
          // height: 100,
          backgroundColor: COLORS().lightBorder,
          position: 'absolute',
          top: -20,
          // left: -20,
          // right: -20,
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'space-between',
          paddingVertical: 0,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '10%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              // marginHorizontal: 10,
            }}>
            <Ionicons
              name="notifications-circle-sharp"
              size={40}
              color={COLORS().red}
            />
          </View>
          <View style={{marginVertical: 5, width: '70%'}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: 'black',
                marginBottom: 10,
              }}>
              {title}
            </Text>
            <Text
              style={{
                fontSize: 12,
              }}>
              {body}
            </Text>
          </View>

          <TouchableOpacity
            onPress={toggleModal}
            style={{
              // backgroundColor: COLORS().red,
              padding: 10,
              // marginHorizontal: 20,
              borderRadius: 10,
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: COLORS().lightBorder,

              alignItems: 'center',
              width: '20%',
              height: '100%',
              // marginHorizontal: '35%',
            }}>
            <Entypo name={'chevron-right'} size={25} color={COLORS().red} />
            {/* <Text style={{color: 'white', fontSize: 12}}>View Details</Text> */}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default ModalTester;

import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import SCREEN from '../../../Layout';
import {ImageBackground} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

const Welcome = () => {
  const navigation = useNavigation();
  const getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={require('../../assets/onboarding.png')}>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={styles.box}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.text}>Find your dream property</Text>
        <Text style={styles.textGrey}>Easy way to rent a perfect property</Text>
        <View style={styles.orangeboxmain}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PaymentScreen')}>
            <View style={styles.orangebox}>
              <Entypo name="chevron-right" color={'white'} size={30} />
            </View>
          </TouchableOpacity>
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
    height: SCREEN.HEIGHT + StatusBar.currentHeight,
    width: SCREEN.WIDTH,
    backgroundColor: SCREEN.WHITE,
    borderColor: SCREEN.GREY,
    borderRadius: SCREEN.RADIUS,
    borderWidth: 2,
    padding: 10,
    // marginHorizontal: 5,
  },
  box: {
    height: SCREEN.WIDTH * 0.775,
    width: SCREEN.WIDTH * 0.88,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SCREEN.BLUE_TRANSPARENT,
    // borderRadius: SCREEN.RADIUS - 4,
    borderRadius: SCREEN.RADIUS * 2,

    position: 'absolute',
    bottom: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: SCREEN.RADIUS - 4,
  },
  secondbox: {
    height: SCREEN.WIDTH * 0.775 * 0.185,
    width: SCREEN.WIDTH * 0.76 * 0.92,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: SCREEN.GREY,
    borderRadius: SCREEN.RADIUS * 0.5,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: SCREEN.WIDTH * 0.775 * 0.145 * 0.48,
    // overflow: 'hidden',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    color: SCREEN.GREY,
  },
  orangeboxmain: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  text: {
    color: SCREEN.WHITE,
    fontSize: 22,
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
    backgroundColor: SCREEN.OREANGE,
    height: 54,
    width: 54,
    borderRadius: 15,
    marginHorizontal: 25,
    marginTop: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontlarge: {
    fontSize: 14,
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
  middlebox: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '100%',
    height: SCREEN.WIDTH * 0.775 * 0.28,
    width: SCREEN.WIDTH * 0.76 * 0.92,
  },
  lastbox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
});
export default Welcome;

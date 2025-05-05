import {
  View,
  Text,
  Image,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native';
import {COLORS} from './consts/colors';
import {useSelector} from 'react-redux';
import Header from './Components/Header';
import HTMLView from 'react-native-htmlview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AboutUs = () => {
  const {HelpCenter} = useSelector(state => state.HelpCenter);
  //
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      {/* <Header title={'About Us'} back /> */}
      <ScrollView style={{flex: 1}}>
        <View>
          <View>
            <ImageBackground
              style={{height: 300, width: '100%'}}
              source={require('./assets/png/about.png')}>
              <View
                style={{
                  marginTop: 60,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginHorizontal: 5,
                }}>
                <MaterialIcons
                  name="arrow-back-ios"
                  size={20}
                  color="white"
                  // onPress={navigation.goBack}
                  style={{
                    paddingVertical: 5,
                    backgroundColor: 'black',
                    paddingHorizontal: 2,
                  }}
                />
                <Text
                  style={{color: 'white', fontSize: 20, marginHorizontal: 10}}>
                  About Us
                </Text>
              </View>
            </ImageBackground>
            {/* <Image /> */}
            <View
              style={{
                backgroundColor: '#185894',
                height: 90,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                top: -50,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 18,
                  marginVertical: 20,
                }}>
                AL SAUD REAL ESTATE
              </Text>
            </View>
          </View>
          <View
            style={{
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              backgroundColor: 'white',
              height: '100%',
              flex: 1,
              top: -80,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingVertical: 25,
            }}>
            <HTMLView
              value={`${HelpCenter?.company_id?.[0].about_us}`}
              style={{width: '80%'}}
              stylesheet={styles}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;
const styles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
  p: {
    color: 'black',
  },
});

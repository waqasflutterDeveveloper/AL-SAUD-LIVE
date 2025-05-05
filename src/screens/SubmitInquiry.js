import React from 'react';
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
} from 'react-native';
import FirstInput from '../Components/Inputs/FirstInput';
import BasicButton from '../Components/Buttons/BasicButton';

import {useNavigation} from '@react-navigation/native';

import {COLORS} from '../consts/colors';
const {width} = Dimensions.get('screen');
const Inquiry = ({route}) => {
  // const house = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS().white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* House image */}
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />

        <View style={style.detailsContainer}>
          <Image
            style={{marginVertical: 10}}
            source={require('../assets/inquiry.png')}
          />
          <Text style={style.text}>Thank you for your inquiry </Text>
          <Text
            style={{
              ...style.text,
              color: COLORS().grey,
              fontWeight: '500',
              fontSize: 14,
              marginTop: 5,
              marginBottom: 10,
            }}>
            Our team will contact you soon
          </Text>

          <BasicButton
            text="Back to Property"
            type="back"
            width={155}
            onPress={() => navigation.navigate('DetailsScreenInStack')}
          />
        </View>
      </ScrollView>
      <View></View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS().white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },

  detailsContainer: {
    // flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
    //  position: 'absolute',
    // marginHorizontal:10,
    backgroundColor: COLORS().white,
    zIndex: 5,
    borderRadius: 25,
    paddingTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bluebox: {
    width: '85%',

    backgroundColor: COLORS().backgroundblue,
    borderRadius: 3,
    marginVertical: 8,
    paddingVertical: 3,
  },
  blueboxtext: {
    color: COLORS().blue,
    fontSize: 12,
    marginHorizontal: 3,
  },

  container: {
    // ...StyleSheet.absoluteFillObject,
    //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 200,
  },

  text: {
    color: COLORS().dark,
    fontWeight: 'bold',
    fontSize: 18,
    // width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
});

export default Inquiry;

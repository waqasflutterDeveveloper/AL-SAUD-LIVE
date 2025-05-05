import React, {useState, useEffect} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import FirstInput from '../Components/Inputs/FirstInput';
import BasicButton from '../Components/Buttons/BasicButton';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import house from '../consts/houses';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {COLORS} from '../consts/colors';
import {Center} from 'native-base';
import TextArea from '../Components/Inputs/TextArea';
import {useCreateVistApi} from '../apis/Home';
import {useValidation} from 'react-native-form-validator';

const {width} = Dimensions.get('screen');
const Inquiry = ({route}) => {
  const navigation = useNavigation();
  const {mutate: createVisit, isLoading} = useCreateVistApi();

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [description, setdescription] = useState('');

  const [flat, setflat] = useState(route?.params?.id);
  const {validate, isFieldInError, getErrorsInField, getErrorMessages} =
    useValidation({
      state: {email, name, mobile, description},
    });
  const HandleSubmitInquiry = async () => {
    validate({
      name: {required: true},
      email: {required: true},
      mobile: {required: true},
      description: {required: true},
    });
    // const res = await getErrorMessages();
    //
    if (!name || !email || !mobile) {
      return;
    } else {
      createVisit({name, mobile, email, flat, description});
      // showToast();
    }
  };
  // useEffect(() => {
  //
  //   return () => {};
  // }, [flat]);

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
          <Text style={style.text}>Fill in the form </Text>
          {/* <View style={style.bluebox}>
            <Text style={style.blueboxtext}>
              <Ionicons
                name="information-circle-outline"
                size={12}
                style={{marginHorizontal: 3}}
                color={COLORS().blue}
              />
              You have already sent an Inquiry: 14th of July
            </Text>
          </View> */}
          <FirstInput text="Name" value={name} fun={e => setname(e)} />
          {isFieldInError('name') &&
            getErrorsInField('name').map(errorMessage => (
              <Text key={errorMessage} style={{color: 'red'}}>
                {errorMessage}
              </Text>
            ))}
          <FirstInput
            text="Email Address"
            value={email}
            fun={e => setemail(e)}
          />
          {isFieldInError('email') &&
            getErrorsInField('email').map(errorMessage => (
              <Text key={errorMessage} style={{color: 'red'}}>
                {errorMessage}
              </Text>
            ))}
          <FirstInput
            text="Mopile Phone"
            value={mobile}
            fun={e => setmobile(e)}
          />
          {isFieldInError('mobile') &&
            getErrorsInField('mobile').map(errorMessage => (
              <Text key={errorMessage} style={{color: 'red'}}>
                {errorMessage}
              </Text>
            ))}
          <TextArea
            text="Description"
            value={description}
            fun={e => setdescription(e)}
          />
          {isFieldInError('descriptions') &&
            getErrorsInField('descriptions').map(errorMessage => (
              <Text key={errorMessage} style={{color: 'red'}}>
                {errorMessage}
              </Text>
            ))}
          <BasicButton
            text={
              isLoading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                'Inquiry'
              )
            }
            width={155}
            onPress={() => HandleSubmitInquiry()}
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
    marginTop: 30,
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
    marginBottom: 15,
  },
});

export default Inquiry;

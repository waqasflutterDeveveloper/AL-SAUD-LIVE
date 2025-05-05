import React, {useEffect, useState} from 'react';
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
import SelectBox from '../Components/Inputs/SelectBox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import house from '../consts/houses';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useValidation} from 'react-native-form-validator';
import TouchableOpacityBtn from '../Components/Buttons/TouchBtn';
import SCREEN from '../../Layout';
import {COLORS} from '../consts/colors';
import FirstInput from '../Components/Inputs/FirstInput';
import BasicButton from '../Components/Buttons/BasicButton';
const {width} = Dimensions.get('screen');
import {useCreateUserHook} from '../apis/Auth/index';
import {TextInput} from '@react-native-material/core';

const SignupScreen = ({navigation, route, setIsAuth, setisRegister}) => {
  const [Name, setName] = useState('');
  const [mobile, setmobile] = useState('');
  const [type, settype] = useState('');

  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  const {mutate: CreateUserApi, isLoading} = useCreateUserHook();
  const {validate, isFieldInError, getErrorsInField, getErrorMessages} =
    useValidation({
      state: {email, password, Name, mobile, type},
    });
  // useEffect(() => {
  //   validate({
  //     password: {required: true, minlength: 3},
  //     email: {required: true, minlength: 3},
  //     mobile: {numbers: true, minlength: 3},
  //     Name: {required: true, minlength: 3},
  //     type: {required: true, minlength: 3},
  //   });
  // }, []);
  const HandleSignUp = async event => {
    validate({
      password: {required: true, minlength: 3},
      email: {required: true, minlength: 3},
      mobile: {numbers: true, minlength: 3},
      Name: {required: true, minlength: 3},
      // type: {required: true, minlength: 3},
    });

    if (getErrorMessages()) {
      return;
    }
    // console.log(type);
    const result = await CreateUserApi({
      email,
      password,
      mobile,
      type: type?.id,
      Name,
    });

    // setIsAuth(true);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: '#eeeeee',
          width: '90%',
          marginTop: StatusBar.currentHeight,
          height: '100%',
        }}>
        {/* House image */}

        {/* <View style={style.backgroundImageContainer}>
          <ImageBackground
            style={style.backgroundImage}
            source={require('../assets/bg_login.png')}></ImageBackground>
        </View> */}
        <View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            // height: '10%',
            backgroundColor: '#eee',
            marginBottom: 30,
          }}>
          <Image source={require('../assets/png/close.png')} />
        </View>
        <View style={style.detailsContainer}>
          <Text style={style.text}>Let’s Get Started </Text>
          <Text style={style.textGrey}>
            {' '}
            Fill the form belwo to create an account{' '}
          </Text>
          <TextInput
            variant="outlined"
            label="Full Name"
            placeholderTextColor={COLORS().blue}
            style={{marginTop: 5, borderRadius: 15}}
            color={COLORS().blue}
            value={Name}
            onChangeText={e => setName(e)}
            borderRadius={10}
          />
          <TextInput
            variant="outlined"
            label="Email address"
            value={email}
            onChangeText={e => setEmail(e)}
            placeholderTextColor={COLORS().blue}
            style={{marginTop: 5, borderRadius: 15}}
            color={COLORS().blue}
            borderRadius={10}
          />
          <TextInput
            variant="outlined"
            label="Phone Number"
            placeholderTextColor={COLORS().blue}
            style={{marginTop: 5, borderRadius: 15}}
            color={COLORS().blue}
            borderRadius={10}
            value={mobile}
            onChangeText={e => setmobile(e)}
          />
          <SelectBox
            Type={'User Type'}
            settype={settype}
            data={[
              {name: 'tenant', id: 'tenant', display_name: 'tenant'},
              {name: 'owner', id: 'owner', display_name: 'tenant'},
            ]}
            type={type}
          />
          {isFieldInError('type') &&
            getErrorsInField('type').map(errorMessage => (
              <Text key={errorMessage} style={{color: 'red'}}>
                {errorMessage}
              </Text>
            ))}
          {/* <TextInput
            variant="outlined"
            label="User Type"
            placeholderTextColor={COLORS().blue}
            style={{margin: 5}}
            color={COLORS().blue}
          /> */}

          <TextInput
            variant="outlined"
            label="Password"
            placeholderTextColor={COLORS().blue}
            style={{margin: 5}}
            color={COLORS().blue}
            value={password}
            type="password"
            secureTextEntry={true}
            onChangeText={e => setpassword(e)}
          />

          {/* <FirstInput
            text="Email addres"
            value={email}
            fun={e => setEmail(e)}
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
          {/* <FirstInput
            text="password"
            type="password"
            value={password}
            fun={e => setpassword(e)}
            Icon={
              <Ionicons
                name="lock-closed-outline"
                size={25}
                style={{marginHorizontal: 7}}
                color={COLORS().red}
              />
            }
          /> */}
          {isFieldInError('password') &&
            getErrorsInField('password').map(errorMessage => (
              <Text key={errorMessage} style={{color: 'red'}}>
                {errorMessage}
              </Text>
            ))}
          <Text style={{color: 'red'}}>
            {/* {userInfo && userInfo == 'Invalid credentials.' ? userInfo : null} */}
          </Text>

          <TouchableOpacityBtn
            color={SCREEN.OREANGE}
            text="Create"
            width={'100%'}
            style={{
              borderRadius: 10,
              paddingVertical: 15,
              marginVertical: 15,
            }}
            textcolor={COLORS().WHITE}
            // outline={SCREEN.OREANGE}
            onPress={() => HandleSignUp()}
            // onPress={navigation.navigate('login')}
            type="basic"
            textSize={14}
            // outline={SCREEN.DARKGREY}
          />
          {/* <TouchableOpacityBtn
            color={SCREEN.WHITE}
            text="Sign In with google"
            width={'100%'}
            style={{
              borderRadius: 10,
              paddingVertical: 15,
              marginVertical: 15,
            }}
            textcolor={COLORS().dark}
            // outline={SCREEN.OREANGE}
            // onPress={navigation.navigate('login')}
            type="basic"
            textSize={14}
            outline={SCREEN.DARKGREY}
            Icon={<Google />}
          /> */}
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              width: '100%',
            }}>
            <Text style={{color: COLORS().dark, marginHorizontal: 2}}>
              Already have an account?
            </Text>
            <Pressable onPress={() => navigation.navigate('login')}>
              <Text
                style={{
                  color: COLORS().blue,
                  // fontWeight: 'bold',
                  fontSize: 14,
                  marginHorizontal: 2,
                }}>
                Sign In
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Pressable onPress={() => dispatch(setisAuth(true))}>
              <View style={style.bluebox}>
                <View style={style.blueboxtext}>
                  <Ionicons
                    name="home-outline"
                    size={15}
                    style={{marginRight: 5}}
                    color={COLORS().blue}
                  />
                  <Text color={COLORS().blue} style={style.margin}>
                    Explore Properties as a Guest
                  </Text>
                </View>
              </View>
            </Pressable> */}
            {/* <Pressable
              onPress={() => navigation.navigate('Loved')}
              style={{
                padding: 12,
                borderColor: COLORS().dark,
                borderWidth: 1,
                borderRadius: 5,
              }}>
              <Icon name="cards-heart-outline" color={COLORS().dark} size={20} />
            </Pressable> */}
          </View>
        </View>
      </ScrollView>
      <ScrollView
        style={{display: 'none'}}
        showsVerticalScrollIndicator={false}>
        {/* House image */}
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />

        <View style={style.backgroundImageContainer}>
          <ImageBackground
            style={style.backgroundImage}
            source={require('../assets/bg_login.png')}></ImageBackground>
        </View>
        <View style={style.detailsContainer}>
          <Image
            style={{marginVertical: 5}}
            source={require('../assets/logo.png')}
          />
          <Text style={style.text}>Register </Text>
          <FirstInput
            text="Name"
            value={Name}
            fun={e => setName(e)}
            Icon={
              <Ionicons
                name="at"
                size={25}
                style={{marginHorizontal: 7}}
                color={COLORS().red}
              />
            }
          />
          {isFieldInError('Name') &&
            getErrorsInField('Name').map(errorMessage => (
              <Text key={errorMessage} style={{color: 'red'}}>
                {errorMessage}
              </Text>
            ))}
          <FirstInput
            text="Email addres"
            value={email}
            fun={e => setEmail(e)}
            Icon={
              <Ionicons
                name="at"
                size={25}
                style={{marginHorizontal: 7}}
                color={COLORS().red}
              />
            }
          />
          {isFieldInError('email') &&
            getErrorsInField('email').map(errorMessage => (
              <Text key={errorMessage} style={{color: 'red'}}>
                {errorMessage}
              </Text>
            ))}
          <FirstInput
            text="Mobile"
            value={mobile}
            fun={e => setmobile(e)}
            Icon={
              <Ionicons
                name="at"
                size={25}
                style={{marginHorizontal: 7}}
                color={COLORS().red}
              />
            }
          />
          {isFieldInError('mobile') &&
            getErrorsInField('mobile').map(errorMessage => (
              <Text key={errorMessage} style={{color: 'red'}}>
                {errorMessage}
              </Text>
            ))}
          <FirstInput
            text="password"
            type="password"
            value={password}
            fun={e => setpassword(e)}
            Icon={
              <Ionicons
                name="lock-closed-outline"
                size={25}
                style={{marginHorizontal: 7}}
                color={COLORS().red}
              />
            }
          />
          {isFieldInError('password') &&
            getErrorsInField('password').map(errorMessage => (
              <Text key={errorMessage} style={{color: 'red'}}>
                {errorMessage}
              </Text>
            ))}
          {/* <FirstInput
            text="type"
            value={type}
            fun={e => settype(e)}
            Icon={
              <Ionicons
                name="at"
                size={25}
                style={{marginHorizontal: 7}}
                color={COLORS().red}
              />
            }
          /> */}

          <BasicButton
            text={
              isLoading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                'Signup'
              )
            }
            onPress={() => HandleSignUp()}
          />
          <View>
            <Pressable onPress={() => navigation.navigate('login')}>
              <Text
                style={{
                  color: COLORS().dark,
                  fontWeight: 'bold',
                  fontSize: 16,
                  textDecorationLine: 'underline',
                }}>
                Already Have An Account?
              </Text>
            </Pressable>
          </View>
          {/* <View style={style.bluebox}>
            <View style={style.blueboxtext}>
              <Ionicons
                name="home-outline"
                size={15}
                style={{marginRight: 5}}
                color={COLORS().blue}
              />
              <Text color={COLORS().blue} style={style.margin}>
                Explore Properties as a Guest
              </Text>
            </View>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// const style = StyleSheet.create({
//   backgroundImageContainer: {
//     elevation: 20,
//     // marginHorizontal: 20,
//     // marginTop: 20,
//     alignItems: 'center',
//     height: 150,
//     zIndex: 1,
//   },
//   backgroundImage: {
//     height: '100%',
//     width: '100%',
//     borderRadius: 20,
//     overflow: 'hidden',
//   },
//   header: {
//     paddingVertical: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//   },
//   headerBtn: {
//     height: 50,
//     width: 50,
//     backgroundColor: COLORS().white,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 3,
//   },
//   ratingTag: {
//     height: 30,
//     width: 35,
//     backgroundColor: COLORS().blue,
//     borderRadius: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   virtualTag: {
//     top: -20,
//     width: 120,
//     borderRadius: 10,
//     height: 40,
//     paddingHorizontal: 20,
//     backgroundColor: COLORS().dark,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   interiorImage: {
//     width: width / 3 - 20,
//     height: 80,
//     marginRight: 10,
//     borderRadius: 10,
//   },
//   footer: {
//     height: 70,
//     backgroundColor: COLORS().light,
//     borderRadius: 10,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 10,
//   },
//   bookNowBtn: {
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: COLORS().dark,
//     borderRadius: 10,
//     paddingHorizontal: 20,
//   },
//   detailsContainer: {
//     // flex: 1,
//     paddingHorizontal: 20,
//     marginTop: 20,
//     margin: 'auto',
//     //  position: 'absolute',
//     // marginHorizontal:10,
//     backgroundColor: COLORS().white,
//     zIndex: 5,
//     paddingTop: 20,
//     display: 'flex',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },

//   text: {
//     color: COLORS().dark,
//     fontWeight: 'bold',
//     fontSize: 18,
//     // width: '50%',
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },

//   bluebox: {
//     width: '90%',
//     backgroundColor: COLORS().backgroundblue,
//     borderRadius: 10,
//     marginVertical: 8,
//     paddingVertical: 3,
//     height: 60,
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     padding: 5,
//   },
//   blueboxtext: {
//     color: COLORS().blue,
//     fontSize: 14,
//     marginHorizontal: 6,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     display: 'flex',
//   },
//   callSupport: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//   },
//   callSupportIcon: {
//     backgroundColor: COLORS().red,
//     padding: 8,
//     borderRadius: 50,
//   },
//   container: {
//     // ...StyleSheet.absoluteFillObject,
//     //the container will fill the whole screen.
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     height: 200,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   margin: {
//     marginHorizontal: 5,
//     color: COLORS().blue,
//   },
// });
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
    //marginTop: 40,
    // margin: 'auto',
    //  position: 'absolute',
    // marginHorizontal:10,
    paddingVertical: 50,
    borderRadius: 20,
    backgroundColor: 'white',
    zIndex: 5,
    // paddingTop: 20,
    // display: 'flex',
    // justifyContent: 'center',
    // flexDirection: 'column',
    // alignItems: 'center',
    // height: '90%',
  },

  text: {
    color: COLORS().dark,
    fontWeight: 'bold',
    fontSize: 30,
    // width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textGrey: {
    color: COLORS().grey,
    fontSize: 14,
    // width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
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

export default SignupScreen;

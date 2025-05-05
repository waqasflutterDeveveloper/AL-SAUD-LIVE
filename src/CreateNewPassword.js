import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {COLORS} from './consts/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {useChangeassword} from './apis/Home';
import {useDispatch} from 'react-redux';
import {setPass} from './Store/PersonalInfoSlice/PersonalInfoSlice';
import {TextInput} from '@react-native-material/core';
import {SCREEN_HEIGHT} from '@gorhom/bottom-sheet';

const CreateNewPassword = () => {
  const {userInfo} = useSelector(state => state.userinfo);
  const {passwordChange} = useSelector(state => state.PersonalInfo);
  const dispatch = useDispatch();
  const [password, setpassword] = useState(null);
  const [confirm_password, setconfirm_password] = useState(null);
  const {mutate: ChnagePass} = useChangeassword();
  const {isDark} = useSelector(state => state.Home);

  const OnSubmit = async () => {
    await ChnagePass({
      password,
      confirm_password,

      partner_id: userInfo?.partner_id,
    });
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS(isDark).dark, flex: 1}}>
      <View
        style={{
          // height: '80%',
          // backgroundColor: 'black',
          height: SCREEN_HEIGHT,
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: '70%',
            // backgroundColor: 'blue',
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 200,
              // backgroundColor: 'blue',
              width: '100%',
            }}>
            <Image
              style={{
                height: 200,
                width: '60%',
                marginVertical: 20,
                marginLeft: 50,
                alignSelf: 'center',
              }}
              source={require('./assets/png/newpassword.png')}
            />
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <TextInput
              variant="outlined"
              onChangeText={e => setpassword(e)}
              value={password}
              secureTextEntry={true}
              label={
                <Text>
                  <FontAwesome5
                    name="lock"
                    color={COLORS().blue}
                    size={18}
                    style={{marginLeft: 20}}
                  />{' '}
                  New Password
                </Text>
              }
              placeholderTextColor={COLORS().blue}
              style={{margin: 5, width: '85%'}}
              color={COLORS().blue}
            />
            <TextInput
              variant="outlined"
              onChangeText={e => setconfirm_password(e)}
              value={confirm_password}
              secureTextEntry={true}
              label={
                <Text>
                  <FontAwesome5
                    name="lock"
                    color={COLORS().blue}
                    size={18}
                    style={{marginLeft: 20}}
                  />{' '}
                  Confirm Password
                </Text>
              }
              placeholderTextColor={COLORS().blue}
              style={{margin: 5, width: '85%'}}
              color={COLORS().blue}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
            width: '100%',
            padding: 15,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '15%',
            // backgroundColor: 'red',
          }}>
          <TouchableOpacity
            onPress={OnSubmit}
            style={{
              height: 60,
              width: '95%',
              backgroundColor: COLORS().red,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text style={{color: 'white'}}>Continue</Text>
          </TouchableOpacity>
          {passwordChange &&
            Alert.alert(passwordChange.status, passwordChange.status, [
              {
                text: 'ok',
                onPress: () => dispatch(setPass(null)),
              },
            ])}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateNewPassword;

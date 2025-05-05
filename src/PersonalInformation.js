import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS} from './consts/colors';
import {useChangePersonalInfo} from './apis/Home';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonalInformation = () => {
  const {userInfo} = useSelector(state => state.userinfo);
  const {isDark} = useSelector(state => state.Home);

  const [name, setname] = useState(userInfo?.name);
  const [email, setemail] = useState(userInfo?.user_obj[0]?.login);
  const [phone, setphone] = useState(userInfo?.partner[0]?.phone);
  const [disable, setdisable] = useState(false);
  // console.log(userInfo?.partner[0]?.phone, 'ph');
  const {mutate: ChangePersonalInfo} = useChangePersonalInfo();
  const OnSubmit = async () => {
    const jsonValue = await AsyncStorage.getItem('passwordAndDb');
    const parsedValues = JSON.parse(jsonValue);
    await ChangePersonalInfo({
      name,
      email,
      phone,
      partner_id: userInfo?.partner_id,
      ...parsedValues,
    });
    // console.log({
    //   name,
    //   email,
    //   phone,
    //   partner_id: userInfo?.partner_id,
    //   ...parsedValues,
    // });
    setdisable(true);
    setTimeout(() => {
      setdisable(false);
    }, 1000);
  };
  // useEffect(() => {
  //   setemail(userInfo?.partner?.email);
  //
  // }, [userInfo]);

  return (
    <ScrollView>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 15,
          backgroundColor: COLORS(isDark).dark,
          paddingVertical: 30,
          marginTop: 20,
        }}>
        <View style={{position: 'relative'}}>
          <Image
            style={{height: 150, width: 150, borderRadius: 100}}
            source={require('./assets/man.jpg')}
          />
          <View
            style={{
              position: 'absolute',
              backgroundColor: COLORS().red,
              bottom: 5,
              right: 0,
              borderRadius: 5,
            }}>
            <FontAwesome5
              name="pen"
              color="white"
              size={18}
              style={{padding: 5}}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 50,
            backgroundColor: COLORS(isDark).dark,
            width: '95%',
            padding: 15,
          }}>
          <View style={{borderColor: 'grey', borderRadius: 10, borderWidth: 1}}>
            <Text style={{marginLeft: 20, color: 'grey', marginTop: 5}}>
              Name
            </Text>
            <TextInput
              editable={true}
              placeholder={name}
              value={name}
              onChangeText={e => setname(e)}
              style={{marginLeft: 20, color: COLORS(isDark).blueForDark}}
            />
          </View>

          <View
            style={{
              borderColor: 'grey',
              borderRadius: 10,
              borderWidth: 1,
              marginTop: 20,
            }}>
            <Text style={{marginLeft: 20, marginTop: 5, color: 'grey'}}>
              Phone Number
            </Text>
            <TextInput
              editable={true}
              placeholder={phone ? phone : ''}
              value={phone ? phone : ''}
              onChangeText={e => setphone(e)}
              style={{marginLeft: 20, color: COLORS(isDark).blueForDark}}
            />
          </View>

          <View
            style={{
              borderColor: 'grey',
              borderRadius: 10,
              borderWidth: 1,
              marginTop: 20,
            }}>
            <Text style={{marginLeft: 20, marginTop: 5, color: 'grey'}}>
              Email
            </Text>
            <TextInput
              editable={true}
              placeholder={email}
              value={email}
              onChangeText={e => setemail(e)}
              style={{marginLeft: 20, color: COLORS(isDark).blueForDark}}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            width: '100%',
            padding: 15,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            // disabled={true}
            onPress={OnSubmit}
            style={{
              height: 60,
              width: '95%',
              backgroundColor: COLORS(isDark).gray,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text style={{color: COLORS(isDark).blueForDark}}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PersonalInformation;

import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../consts/colors';
import {TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const RecoveryPassword = () => {
  const [phone, setphone] = useState('01001186472');
  const [email, setemail] = useState('Ahmed@example.com');
  const [title, settitle] = useState();
  const [check, setcheck] = useState(null);
  const [Dis, setDis] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    if (check === true) {
      settitle(phone);
      setDis(false);
    }
    if (check === false) {
      settitle(email);
      setDis(false);
    }
  }, [check]);

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, marginHorizontal: 15, marginVertical: 25}}>
        <View
          style={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 140, width: '60%'}}
            source={require('../../src/assets/png/ask.png')}
          />
        </View>
        <View style={{marginTop: 40}}>
          <Text style={{marginVertical: 30, fontSize: 18}}>
            Select which contact details should we use to reset your password
          </Text>

          <TouchableOpacity onPress={() => setcheck(true)}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderColor: check === true ? '#185894' : 'white',
                borderWidth: 2,
                borderRadius: 10,
                backgroundColor:
                  check === true ? 'rgba(24, 88, 148, 0.05)' : 'white',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderRadius: 50,
                  margin: 15,
                  borderColor: 'white',
                }}>
                <Ionicons
                  name="chatbubble-ellipses"
                  color={COLORS().blue}
                  size={45}
                  style={{padding: 20}}
                />
              </View>
              <View style={{marginLeft: 10}}>
                <Text>via SMS:</Text>
                {/* <TextInput placeholder={phone} style={{color: 'black'}} /> */}
                <Text style={{color: 'black'}}>+1 111 ******99</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setcheck(false)}>
            <View
              style={{
                marginTop: 15,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderColor: check === false ? '#185894' : 'white',
                borderWidth: 2,
                borderRadius: 10,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderRadius: 50,
                  margin: 15,
                  borderColor: 'white',
                }}>
                <Ionicons
                  name="mail"
                  color={COLORS().blue}
                  size={45}
                  style={{padding: 20}}
                />
              </View>
              <View style={{marginLeft: 10}}>
                <Text style={{marginBottom: 5}}>via Email:</Text>
                {/* <TextInput placeholder={email} /> */}
                <Text style={{color: 'black'}}>Mostafa@gmail.com</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 40}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OTPCode', {
                title: title,
              })
            }
            disabled={Dis}
            style={{
              height: 50,
              width: '100%',
              backgroundColor: COLORS().red,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text style={{color: 'white'}}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RecoveryPassword;

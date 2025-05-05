import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import {COLORS} from '../consts/colors';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {useNavigation} from '@react-navigation/native';

const OTPCode = ({route}) => {
  // const { title } = route.params;
  const navigation = useNavigation();

  const [DIS, setDIS] = useState(false);
  const [num, setnum] = useState(60);
  const otpInput = useRef(null);

  const clearText = () => {
    otpInput.current.clear();
  };

  const setText = () => {
    otpInput.current.setValue('1234');
  };

  useEffect(() => {
    if (num === 0) {
      setDIS(true);
    }
  }, [num]);
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          marginTop: 100,
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <Text>code has been send to {title}</Text> */}
        <View style={[styles.container, {marginTop: 50, width: '100%'}]}>
          <OTPTextView
            handleTextChange={e => {}}
            containerStyle={styles.textInputContainer}
            textInputStyle={[styles.roundedTextInput, {borderRadius: 100}]}
            tintColor={COLORS().red}
          />
          <View style={{marginTop: 50}}>
            <CountdownCircleTimer
              isPlaying
              duration={num}
              colors={[COLORS().red]}
              colorsTime={[7]}>
              {({remainingTime}) => <Text>{remainingTime}</Text>}
            </CountdownCircleTimer>
          </View>

          <View style={{marginTop: 100, width: '100%'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateNewPassword')}
              disabled={DIS}
              style={{
                height: 60,
                width: '100%',
                backgroundColor: COLORS().red,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text style={{color: 'white'}}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
  },

  textInputContainer: {
    marginBottom: 20,
    borderColor: COLORS().red,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS().red,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF1ED',
    padding: 5,
  },
});

export default OTPCode;

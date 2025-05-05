import React, {useRef, useState} from 'react';
import {
  View,
  Button,
  Text,
  Image,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TouchableOpacityBtn from '../Buttons/TouchBtn';
import SCREEN from '../../../Layout';

import {COLORS} from '../../consts/colors';
import {useNavigation} from '@react-navigation/native';
export default function BottomSheet({
  Item,
  Content,
  Height,
  width,
  onPress,
  call = true,
  title,
}) {
  const refRBSheet = useRef();

  const navigation = useNavigation();
  const HandleOpenModal = () => {
    refRBSheet.current.open();
  };
  return (
    <View style={{width: width ? width : '50%'}}>
      {Item ? (
        <Pressable onPress={() => HandleOpenModal()}>{Item}</Pressable>
      ) : call ? (
        <TouchableOpacityBtn
          color={SCREEN.OREANGE}
          text="Call us"
          width={'100%'}
          style={{
            borderRadius: 10,
            paddingVertical: 12,
            marginVertical: 15,
          }}
          textcolor={SCREEN.WHITE}
          // outline={SCREEN.OREANGE}
          onPress={() => HandleOpenModal()}
          type="basic"
          textSize={14}
          Icon={<Image source={require('../../assets/png/contact.png')} />}
        />
      ) : null}

      <RBSheet
        ref={call ? refRBSheet : onPress}
        // ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Height ? Height : 500}
        width="100%"
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(9, 16, 29, .7)',
          },
          draggableIcon: {
            backgroundColor: 'grey',
          },
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          },
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            paddingBottom: 30,
          }}>
          <ScrollView
            style={{
              height: '100%',
              width: '90%',
              overflow: 'scroll',
            }}>
            <Text
              style={{
                color: '#000000',
                marginHorizontal: 10,
                fontSize: 15,
                // fontWeight: 'bold',
                borderBottomColor: '#E8E8E8',
                borderWidth: 1,
                width: '100%',
                alignSelf: 'center',
                alignItems: 'center',
                alignContent: 'center',
                textAlign: 'center',
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
                borderLeftColor: 'transparent',
                paddingBottom: 15,
                marginBottom: 15,
              }}>
              {title}
            </Text>
            {Content}
          </ScrollView>
        </View>
      </RBSheet>
    </View>
  );
}

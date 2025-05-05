import React, {useRef, useState} from 'react';
import {View, Button, Text, Image, Pressable} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import SelectBox from '../Inputs/SelectBox';
import BasicButton from '../Buttons/BasicButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Box, Progress, Center, NativeBaseProvider} from 'native-base';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FirstInput from '../Inputs/FirstInput';

import axios from 'axios';
import {COLORS} from '../../consts/colors';
export default function Example() {
  const refRBSheet = useRef();
  const [pic, setpic] = useState('');
  const [picName, setpicName] = useState('');

  const [percentage, setPercentage] = useState(0);

  const uploadProgress = progressEvent => {
    var Percentage = Math.round(
      (progressEvent.loaded / progressEvent.total) * 100,
    );
    setPercentage(Percentage);
    // console.log(progressEvent.loaded, progressEvent.total);
    // console.log(
    //   'Upload progress: ' +
    //     Math.round((progressEvent.loaded / progressEvent.total) * 100) +
    //     '%',
    // );
  };
  const UploadImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, async res => {
      if (res.didCancel) {
      } else if (res.errorCode == 'permission') {
      } else if (res.errorCode == 'others') {
      } else {
        setpic(res.assets[0].base64);
        // setpicName(res.assets[0].fileName);
        // console.log(res.assets[0].fileName, res.assets[0]);
        axios({
          method: 'POST',
          url: 'https://odooerp-ae-property.odoo.com/api/property_create_document',
          data: {
            params: {
              flat_id: 451,
              file_name: picName,
              binary_file: `data:image/png;base64,${res.assets[0].base64}`,
            },
          },
          headers: {},
          onUploadProgress: uploadProgress,
        })
          .then(res => {
            if (res.data) {
              // console.log(res.data, 'err2');
              refRBSheet.current.close();
              setPercentage(0);
              setpicName('');
              setpic('');
            }
          })
          .catch(err => console.log(err));
      }
    });
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* <BasicButton
        text="Upload"
        color={COLORS().blue}
        width={150}
        onPress={() => refRBSheet.current.open()}
        Icon={
          <MaterialCommunityIcons
            color={COLORS().white}
            size={18}
            name="plus-circle-outline"
          />
        }
      /> */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={400}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(178, 182, 186, 0.9)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderRadius: 30,
          },
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          <View style={{height: 70}}>
            <FirstInput text="Name" value={picName} fun={e => setpicName(e)} />
          </View>
          {/* <View style={{height: 70}}>
            <SelectBox Type="Type" />
          </View>
          <View style={{height: 70}}>
            <SelectBox Type="Expiry date" />
          </View> */}
          <Pressable
            onPress={() => UploadImage()}
            disabled={picName ? false : true}
            style={{
              backgroundColor: COLORS().blue,
              padding: 15,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '80%',
              borderRadius: 10,
              marginVertical: 15,
            }}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexDirection: 'row',
              }}>
              <MaterialCommunityIcons
                color={COLORS().white}
                size={18}
                name="plus-circle-outline"
              />
              <Text style={{marginHorizontal: 5, color: COLORS().white}}>
                Upload file
              </Text>
            </View>
          </Pressable>
          {percentage > 0 && (
            <View
              style={{
                borderColor: COLORS().grey,
                borderWidth: 1,
                width: '78%',
                height: 80,
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
                flexDirection: 'column',
              }}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <View>
                  <Image
                    source={{uri: 'data:image/png;base64,' + pic}}
                    style={{width: 50, height: 50, borderRadius: 10}}
                  />
                </View>

                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    marginHorizontal: 10,
                    height: 50,
                    width: '60%',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      width: '100%',
                      marginVertical: 5,
                    }}>
                    <Text style={{color: COLORS().dark}}>{'Photo'}</Text>
                    <Text style={{color: COLORS().dark}}>{percentage}%</Text>
                  </View>
                  <View style={{width: '100%'}}>
                    <NativeBaseProvider>
                      <Box w="100%" maxW="400">
                        <Progress size="xs" value={percentage} />
                      </Box>
                    </NativeBaseProvider>
                  </View>
                </View>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    marginHorizontal: 20,
                  }}>
                  {/* <Pressable onPress={() => refRBSheet.current.close()}>
                    <MaterialCommunityIcons
                      name="close"
                      size={20}
                      color={COLORS().red}
                    />
                  </Pressable> */}
                </View>
              </View>
            </View>
          )}
        </View>
      </RBSheet>
    </View>
  );
}

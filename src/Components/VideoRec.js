import {Progress, NativeBaseProvider} from 'native-base';
import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {RNCamera} from 'react-native-camera';
import RNFS from 'react-native-fs';
import {COLORS} from '../consts/colors';
import Spinner from './Spinner';
import {SCREEN_HEIGHT} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';

const App = ({callCreateReq, setIsprogress, Isprogress, transferred}) => {
  const [IsRec, setIsRec] = useState(false);
  const camera = useRef(null);
  const [seconds, setSeconds] = useState(0);
  const {isDark} = useSelector(state => state.Home);

  const [video, setVideo] = useState(null);
  const ConvertVideoBase64 = async uri => {
    // const base64Video = await RNFS.readFile(uri, 'base64');
    setVideo(uri);
  };

  const Submit = async () => {
    setIsRec(true);
    setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    if (camera) {
      const options = {maxDuration: 30};

      const {uri, codec = 'mp4'} = await camera.current.recordAsync(options);
      console.info(uri, 'uri');
      if (uri) {
        setIsprogress(true);

        ConvertVideoBase64(uri);
      }
    }
  };
  const Stop = () => {
    setIsRec(false);
    camera.current.stopRecording();
  };
  useEffect(() => {
    // console.log(video, 'video');
    if (video) {
      callCreateReq(video);
    }
    return () => {};
  }, [video]);

  const RenderCam = () => {
    return (
      <RNCamera
        ref={camera}
        style={styles.preview}
        type="back"
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <>
        {Isprogress ? (
          <>
            {/* {console.log(transferred, 'transferred')} */}
            <View
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <View style={{height: 40}}>
                <Spinner />
              </View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: COLORS().grey,
                }}>
                Please Wait While Proccessing Your Video ...
              </Text>
              {/* <NativeBaseProvider>
                <Progress value={transferred} width={300} />
              </NativeBaseProvider> */}
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                height: '70%',
                backgroundColor: 'white',
              }}>
              <View style={{width: '100%', height: '100%'}}>{RenderCam()}</View>
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Pressable
                onPress={Submit}
                style={{
                  height: 50,
                  marginTop: 30,
                  backgroundColor: COLORS().red,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                  Start
                </Text>
              </Pressable>
            </View>
            {IsRec && (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  height: 50,
                }}>
                <Text style={{color: COLORS().dark}}> ({seconds}) Rec</Text>
                <View
                  style={{
                    width: 15,
                    marginHorizontal: 5,
                    height: 15,
                    borderRadius: 500,
                    backgroundColor: COLORS().red,
                  }}></View>
              </View>
            )}
            <Pressable
              onPress={Stop}
              style={{
                height: 50,
                marginTop: 10,
                backgroundColor: COLORS().red,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 20,
                  backgroundColor: COLORS().red,
                }}>
                Stop and Upload
              </Text>
            </Pressable>
          </>
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: SCREEN_HEIGHT * 0.8,
  },
  preview: {
    width: '100%',
    height: 450,
  },
});

export default App;

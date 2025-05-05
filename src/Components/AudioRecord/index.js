import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';

import storage from '@react-native-firebase/storage';
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {Component} from 'react';

import Button from '../Button';
import {COLORS} from '../../consts/colors';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Spinner from '../Spinner';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleTxt: {
    marginTop: 100,
    color: 'white',
    fontSize: 28,
  },
  viewRecorder: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  recordBtnWrapper: {
    flexDirection: 'column',
    width: '90%',
  },
  viewPlayer: {
    marginTop: 60,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  viewBarWrapper: {
    marginTop: 28,
    marginHorizontal: 28,
    alignSelf: 'stretch',
  },
  viewBar: {
    backgroundColor: '#ccc',
    height: 4,
    alignSelf: 'stretch',
  },
  viewBarPlay: {
    backgroundColor: 'white',
    height: 4,
    width: 0,
  },
  playStatusTxt: {
    marginTop: 8,
    color: '#ccc',
  },
  playBtnWrapper: {
    flexDirection: 'row',
    marginTop: 40,
  },
  btn: {
    borderColor: COLORS().lightBorder,
    borderWidth: 1,
    backgroundColor: COLORS().primary,
    width: '100%',
    marginVertical: 5,
    textAlign: 'center',
    paddingVertical: 5,
  },
  txt: {
    color: COLORS().gray,
    fontSize: 18,
    marginHorizontal: 8,
    marginVertical: 4,
    textAlign: 'center',
  },
  txtRecordCounter: {
    marginTop: 32,
    color: COLORS().green,
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
  txtCounter: {
    marginTop: 12,
    color: COLORS().red,
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
});

const screenWidth = Dimensions.get('screen').width;

class Page extends Component {
  dirs = ReactNativeBlobUtil.fs.dirs;
  path = Platform.select({
    ios: undefined,
    android: undefined,
    android: `${this.dirs.CacheDir}/${Date.now()}_${Math.floor(
      Math.random() * 10000,
    )}.mp3`,
  });

  audioRecorderPlayer;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      transferred: 0,
      uris: '',
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5
  }
  navigateToOtherScreen = () => {
    const data = this.props.route?.params.data;

    this.props.navigation.navigate('CreateRequestScreen', {
      data: this.state.uris,
      route: 'VoiceRecord',
      ...data,
    });
  };
  render() {
    if (this.state.uris?.length > 0 && this.state.loading == false) {
      this.navigateToOtherScreen();
    }
    let playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56);

    if (!playWidth) {
      playWidth = 0;
    }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor="black" />
        {this.state.loading ? (
          <>
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
                Please Wait While Proccessing Your Record ...
              </Text>
              {/* <NativeBaseProvider>
                <Progress value={transferred} width={300} />
              </NativeBaseProvider> */}
            </View>
          </>
        ) : (
          <>
            <Text style={styles.titleTxt}>Audio Recorder Player</Text>
            <Text style={styles.txtRecordCounter}>{this.state.recordTime}</Text>
            <View style={styles.viewRecorder}>
              <View style={styles.recordBtnWrapper}>
                <Button
                  style={[styles.btn]}
                  onPress={this.onStartRecord}
                  textStyle={styles.txt}>
                  Record
                </Button>
                <Button
                  style={[styles.btn]}
                  onPress={this.onPauseRecord}
                  textStyle={styles.txt}>
                  Pause
                </Button>
                <Button
                  style={[styles.btn]}
                  onPress={this.onResumeRecord}
                  textStyle={styles.txt}>
                  Resume
                </Button>
                <Button
                  style={[styles.btn]}
                  onPress={this.onStopRecord}
                  textStyle={styles.txt}>
                  Upload
                </Button>
              </View>
            </View>
          </>
        )}
      </SafeAreaView>
    );
  }

  onStopRecord = async () => {
    this.setState({
      loading: true,
    });
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    this.uploadImagetoFirebase(result);
  };
  onStatusPress = e => {
    const touchX = e.nativeEvent.locationX;

    const playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56);

    const currentPosition = Math.round(this.state.currentPositionSec);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round(currentPosition + 1000);
      this.audioRecorderPlayer.seekToPlayer(addSecs);
    } else {
      const subSecs = Math.round(currentPosition - 1000);
      this.audioRecorderPlayer.seekToPlayer(subSecs);
    }
  };

  onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
        } else {
          return;
        }
      } catch (err) {
        console.warn(err);

        return;
      }
    }

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
    };

    const uri = await this.audioRecorderPlayer.startRecorder(
      this.path,
      audioSet,
    );

    this.audioRecorderPlayer.addRecordBackListener(e => {
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
    });
    setTimeout(() => {
      this.onPauseRecord();
    }, 30000);
    setTimeout(() => {
      this.onStopRecord();
    }, 30200);
  };

  onPauseRecord = async () => {
    try {
      const r = await this.audioRecorderPlayer.pauseRecorder();
    } catch (err) {}
  };

  onResumeRecord = async () => {
    await this.audioRecorderPlayer.resumeRecorder();
  };

  onStartPlay = async () => {
    try {
      const msg = await this.audioRecorderPlayer.startPlayer(this.path);

      const volume = await this.audioRecorderPlayer.setVolume(1.0);

      this.audioRecorderPlayer.addPlayBackListener(e => {
        this.setState({
          currentPositionSec: e.currentPosition,
          currentDurationSec: e.duration,
          playTime: this.audioRecorderPlayer.mmssss(
            Math.floor(e.currentPosition),
          ),
          duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        });
      });
    } catch (err) {}
  };

  onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  onResumePlay = async () => {
    await this.audioRecorderPlayer.resumePlayer();
  };

  onStopPlay = async () => {
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };

  uploadImagetoFirebase = async uri => {
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const task = storage().ref(filename).putFile(uploadUri);
    task.on('state_changed', snapshot => {
      this.setState({
        transferred:
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      });
    });

    try {
      const res = await task;

      this.setState({
        uris: `https://firebasestorage.googleapis.com/v0/b/realestate-3b42f.appspot.com/o/${res.metadata.fullPath}?alt=media&token=${res.metadata.downloadTokens}`,
      });
      this.setState({
        loading: false,
      });
    } catch (e) {
      console.error(e, 'eeeee');
    }
  };
}

export default Page;

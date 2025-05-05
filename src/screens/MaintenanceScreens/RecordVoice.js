import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import {
  AudioSet,
  PlayBackType,
  RecordBackType,
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
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';

import Button from '../../Components/Button';
import {ReactElement} from 'react';
import {COLORS} from '../../consts/colors';
import {api} from '../../axios';
import ReactNativeBlobUtil from 'react-native-blob-util';
// import Toast from 'react-native-simple-toast';

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

    // Discussion: https://github.com/hyochan/react-native-audio-recorder-player/discussions/479
    // ios: 'https://firebasestorage.googleapis.com/v0/b/cooni-ebee8.appspot.com/o/test-audio.mp3?alt=media&token=d05a2150-2e52-4a2e-9c8c-d906450be20b',
    // ios: 'https://staging.media.ensembl.fr/original/uploads/26403543-c7d0-4d44-82c2-eb8364c614d0',
    // ios: 'hello.m4a',
    android: `${this.dirs.CacheDir}/${Date.now()}_${Math.floor(
      Math.random() * 10000,
    )}.mp3`,
  });

  audioRecorderPlayer;

  constructor(props) {
    super(props);
    this.state = {
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
  navigateToOtherScreen = MaintainenceSelceted => {
    // const data = this.props.route?.params.data;
    // console.log(data, 'data data');

    this.props.navigation.navigate('MaintenanceDetails', {
      MaintainenceSelceted,
    });
  };
  render() {
    // console.log(this.state.uris, 'this.state.uris');
    const {params} = this.props.route;

    // Access specific parameters
    if (this.state.uris?.length > 0) {
      this.navigateToOtherScreen(params?.MaintainenceSelceted);
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
              onPress={() => this.onStopRecord(params?.MaintainenceSelceted)}
              textStyle={styles.txt}>
              Upload
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  onStatusPress = e => {
    const touchX = e.nativeEvent.locationX;
    // console.log(`touchX: ${touchX}`);

    const playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56);
    // console.log(`currentPlayWidth: ${playWidth}`);

    const currentPosition = Math.round(this.state.currentPositionSec);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round(currentPosition + 1000);
      this.audioRecorderPlayer.seekToPlayer(addSecs);
      // console.log(`addSecs: ${addSecs}`);
    } else {
      const subSecs = Math.round(currentPosition - 1000);
      this.audioRecorderPlayer.seekToPlayer(subSecs);
      // console.log(`subSecs: ${subSecs}`);
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

        // console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          // console.log('permissions granted');
        } else {
          // console.log('All required permissions not granted');

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

    // console.log('audioSet', audioSet);

    const uri = await this.audioRecorderPlayer.startRecorder(
      this.path,
      audioSet,
    );

    this.audioRecorderPlayer.addRecordBackListener(e => {
      // console.log('record-back', e);
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
    });
    // console.log(`uri: ${uri}`);
  };

  onPauseRecord = async () => {
    try {
      const r = await this.audioRecorderPlayer.pauseRecorder();
      // console.log(r);
    } catch (err) {
      // console.log('pauseRecord', err);
    }
  };

  onResumeRecord = async () => {
    await this.audioRecorderPlayer.resumeRecorder();
  };

  onStopRecord = async MaintainenceSelceted => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    // console.log('stoping', result);
    this.uploadImagetoFirebase(result, MaintainenceSelceted);
  };

  onStartPlay = async () => {
    // console.log('onStartPlay', this.path);

    try {
      const msg = await this.audioRecorderPlayer.startPlayer(this.path);

      //? Default path
      // const msg = await this.audioRecorderPlayer.startPlayer();
      const volume = await this.audioRecorderPlayer.setVolume(1.0);
      // console.log(`path: ${msg}`, `volume: ${volume}`);

      this.audioRecorderPlayer.addPlayBackListener(e => {
        // console.log('playBackListener', e);
        this.setState({
          currentPositionSec: e.currentPosition,
          currentDurationSec: e.duration,
          playTime: this.audioRecorderPlayer.mmssss(
            Math.floor(e.currentPosition),
          ),
          duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        });
      });
    } catch (err) {
      // console.log('startPlayer error', err);
    }
  };

  onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  onResumePlay = async () => {
    await this.audioRecorderPlayer.resumePlayer();
  };

  onStopPlay = async () => {
    // console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };

  uploadImagetoFirebase = async (uri, MaintainenceSelceted) => {
    // const { uri } = image;
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

      this.setState(
        {
          uris: `https://firebasestorage.googleapis.com/v0/b/realestate-3b42f.appspot.com/o/${res.metadata.fullPath}?alt=media&token=${res.metadata.downloadTokens}`,
        },
        async () => {
          // console.log(
          //   MaintainenceSelceted,
          //   'MaintainenceSelceted MaintainenceSelceted',
          // );

          try {
            const res = await api.post(
              `api/property_maintenance_request_add_file`,
              {
                params: {
                  maintenance_request_id: MaintainenceSelceted?.id,
                  files: this.state.uris,
                },
              },
            );
            // Toast.show('record Sent Succefully.', Toast.LONG, {
            //   backgroundColor: 'orange',
            // });
          } catch (error) {
            // console.log(error, 'error');
          }
        },
      );
    } catch (e) {
      console.error(e, 'eeeee');
    }
  };
}

export default Page;

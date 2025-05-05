import React, {useState, useEffect} from 'react';
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
  Alert,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import {Video} from 'react-native-compressor';
// import Toast from 'react-native-simple-toast';

import {COLORS} from '../../consts/colors';
import TextArea from '../../Components/Inputs/TextArea';
const {width} = Dimensions.get('screen');

import VideoRec from '../../Components/VideoRec';
import {api} from '../../axios';
import {setMyUploads} from '../../Store/upload/myUploadsSlice';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

const VideoRecScreen = ({navigation, route}) => {
  const [RequestTypeData, setRequestTypeData] = useState([]);
  const [photo, setphoto] = React.useState('');
  const [disable, setDisable] = React.useState(false);
  const MaintainenceSelceted = route.params.MaintainenceSelceted;

  const {urls} = useSelector(state => state.uploads);

  const dispatch = useDispatch();
  const [Isprogress, setIsprogress] = React.useState(false);
  const Submit = async () => {
    // console.log(MaintainenceSelceted, 'MaintainenceSelceted');
    if (urls) {
      try {
        const res = await api.post(
          `api/property_maintenance_request_add_file`,
          {
            params: {
              maintenance_request_id: MaintainenceSelceted?.id,
              files: urls,
            },
          },
        );
        // Toast.show('feedback Sent Succefully.', Toast.LONG, {
        //   backgroundColor: 'orange',
        // });

        // setOpen(false);
        // MaintianenceApi({
        //   partner_type: userInfo?.partner[0].is_tenant ? 'tenant' : 'owner',
        //   partner: userInfo.partner_id,
        //   flat: selectedProp.id,
        // });
      } catch (error) {
        // console.log(error, 'error');
      }
    }
  };
  useEffect(() => {
    if (urls?.length > 0) {
      const data = {urls};
      Submit();
      navigation.goBack(data);
    }
  }, [urls]);
  const [transferred, setTransferred] = useState(0);
  const uploadImagetoFirebase = async uri => {
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const task = storage().ref(filename).putFile(uploadUri);
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      );
    });

    try {
      const res = await task;
      // console.error(res.metadata.fullPath, 'res res');
      dispatch(
        setMyUploads(
          `https://firebasestorage.googleapis.com/v0/b/realestate-3b42f.appspot.com/o/${res.metadata.fullPath}?alt=media&token=${res.metadata.downloadTokens}`,
        ),
      );
    } catch (e) {
      console.error(e, 'eeeee');
    }
  };
  const compressVideo = async path => {
    const result = await Video.compress(
      path,
      {
        compressionMethod: 'auto',
        minimumFileSizeForCompress: 5,
      },
      progress => {
        // console.log('Compression Progress: ', progress);
      },
    );
    setIsprogress(true);

    if (result) {
      callCreateReq(result);
      // console.log(result, 'result result');
    }
  };
  var callRequested = false;
  const callCreateReq = async video => {
    uploadImagetoFirebase(video);
  };

  // const house = route.params;

  return (
    <SafeAreaView style={{height: '100%'}}>
      <ScrollView style={{height: '100%'}}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />

        <View style={style.detailsContainer}>
          <VideoRec
            callCreateReq={compressVideo}
            setIsprogress={setIsprogress}
            Isprogress={Isprogress}
            transferred={transferred}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS().white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },

  detailsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    // marginTop: 10,
    //  position: 'absolute',
    // marginHorizontal:10,
    // backgroundColor: 'yellow',
    // zIndex: 5,
    // borderRadius: 25,
    paddingTop: 20,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    height: '100%',
  },

  bluebox: {
    width: '85%',

    backgroundColor: COLORS().backgroundblue,
    borderRadius: 3,
    marginVertical: 8,
    paddingVertical: 3,
  },
  blueboxtext: {
    color: COLORS().blue,
    fontSize: 12,
    marginHorizontal: 3,
  },

  container: {
    // ...StyleSheet.absoluteFillObject,
    //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 200,
  },

  text: {
    color: COLORS().dark,
    fontWeight: 'bold',
    fontSize: 18,
    // width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
  },
});

export default VideoRecScreen;

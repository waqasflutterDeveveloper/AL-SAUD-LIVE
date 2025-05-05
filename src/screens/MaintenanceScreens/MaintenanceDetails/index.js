import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
// import Toast from 'react-native-simple-toast';

import React, {useState, useRef, useEffect} from 'react';
import styles from './styles';
import {COLORS} from '../../../consts/colors';

import TouchBtn from '../../../Components/Buttons/TouchBtn';
import {useSelector, useDispatch} from 'react-redux';
import MiniMaintenanceDetailsCard from '../../../Components/Cards/MaintenanceDetailsCard/MiniMaintenanceDetailsCard';
import MiniMaintenanceDetailsCardStatus from '../../../Components/Cards/MaintenanceDetailsCard/MiniMaintenanceDetailsCardStatus';
import ProblemDescriptionCard from '../../../Components/Cards/MaintenanceDetailsCard/ProblemDescriptionCard';
import NewBottomSheet from '../../../Components/Sheets/New_BottomSheet';
import FeedbackAnswer from '../../../Components/Cards/MaintenanceDetailsCard/FeedbackAnswer';
import {api} from '../../../axios';
import Spinner from '../../../Components/Spinner';
import {useMaintianenceApi, useOneMaintianenceApi} from '../../../apis/Home';
import {useIsFocused} from '@react-navigation/native';
import {SCREEN_HEIGHT} from '@gorhom/bottom-sheet';
import {setMyUploads} from '../../../Store/upload/myUploadsSlice';
const MaintenanceDetails = ({navigation, route}) => {
  const data = route.params;
  const {urls} = useSelector(state => state.uploads);

  const dispatch = useDispatch();
  const {comments} = useSelector(state => state.Home);
  const MaintainenceSelceted = route.params.MaintainenceSelceted;
  const [comment, setcomment] = useState('');
  const {userInfo} = useSelector(state => state.userinfo);
  const [response, setresponse] = useState(false);
  const {mutate: OneMaintianenceApi} = useOneMaintianenceApi();
  const [stages, setStages] = useState([]);

  const [loading, setloading] = useState(false);

  const selectedProp = useSelector(state => state.MyProperties.selectedProp);
  const {mutate: MaintianenceApi, isLoading} = useMaintianenceApi();
  const maintenance_request_stages = async () => {
    const res = await api.post('api/maintenance_request_stages', {});

    if (res?.data?.result) {
      setStages(res?.data?.result);
    }
  };
  const IsFocused = useIsFocused();
  useEffect(() => {
    maintenance_request_stages();
    OneMaintianenceApi({id: MaintainenceSelceted?.id});
  }, [IsFocused]);
  // useEffect(() => {
  //   console.log(comments, MaintainenceSelceted?.id, 'comments');
  // }, [comments]);

  const refRB = useRef();
  const refRC = useRef();
  const HandleOpenModalC = () => {
    //
    refRC.current.open();
  };
  const handleCloseModalC = () => {
    refRC.current.close();
  };
  const HandleOpenModal = () => {
    //
    refRB.current.open();
  };
  const handleCloseModal = () => {
    refRB.current.close();
  };
  const [disable, setdisable] = useState(false);

  const Submit = async () => {
    // console.log(MaintainenceSelceted, 'MaintainenceSelceted');
    if (urls) {
      try {
        const res = await api.post(
          `api/property_maintenance_request_add_file`,
          {
            params: {
              request_id: MaintainenceSelceted?.id,
              maintenance_request_id: MaintainenceSelceted?.id,
              files: urls,
            },
          },
        );
        // Toast.show('feedback Sent Succefully.', Toast.LONG, {
        //   backgroundColor: 'orange',
        // });

        handleCloseModal();
        setresponse(res.data);
        OneMaintianenceApi({id: MaintainenceSelceted?.id});
        // setOpen(false);
        // MaintianenceApi({
        //   partner_type: userInfo?.partner[0].is_tenant ? 'tenant' : 'owner',
        //   partner: userInfo.partner_id,
        //   flat: selectedProp.id,
        // });
        setdisable(true);
        setTimeout(() => {
          setdisable(false);
        }, 1000);
      } catch (error) {
        // console.log(error, 'error');
      }
    }
    try {
      const res = await api.post(`api/property_send_feed_back`, {
        params: {
          author_id: userInfo?.partner_id,
          comment,
          request_id: MaintainenceSelceted?.id,
        },
      });
      // Toast.show('Comments Sent Succefully.', Toast.LONG, {
      //   backgroundColor: 'orange',
      // });

      handleCloseModal();
      setresponse(res.data);
      OneMaintianenceApi({id: MaintainenceSelceted?.id});
      // setOpen(false);

      setdisable(true);
      setTimeout(() => {
        setdisable(false);
      }, 1000);
    } catch (error) {}
  };
  const [allFilesdata, setallFilesdata] = React.useState([]);

  const uploadImagetoFirebase = async uri => {
    // const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const task = storage().ref(filename).putFile(uploadUri);

    try {
      const res = await task;
      // console.error(res.metadata.fullPath, 'res res');
      dispatch(
        setMyUploads(
          `https://firebasestorage.googleapis.com/v0/b/realestate-3b42f.appspot.com/o/${res.metadata.fullPath}?alt=media&token=${res.metadata.downloadTokens}`,
        ),
      );

      // console.error(
      //   `https://firebasestorage.googleapis.com/v0/b/realestate-3b42f.appspot.com/o/${res.metadata.fullPath}?alt=media&token=${res.metadata.downloadTokens}`,
      // );
    } catch (e) {
      console.error(e, 'eeeee');
    }
  };
  const UploadImage = () => {
    setloading(true);

    let options = {
      mediaType: 'photo',
      quality: 1,
      // includeBase64: true,
    };
    launchCamera(options, async res => {
      if (res.didCancel) {
      } else if (res.errorCode == 'permission') {
      } else if (res.errorCode == 'others') {
      } else {
        // setphoto([`data:image/png;base64,${res.assets[0].uri}`]);
        uploadImagetoFirebase(res.assets[0].uri);
        // setpicName(res.assets[0].fileName);
        setallFilesdata([{type: 'image/png', name: 'photo'}]);
      }
    });
  };
  useEffect(() => {
    // console.log(data, 'data aaaaaaa');

    if (urls) {
      // console.log(data, 'data');
      setloading(false);
    }
  }, [urls]);

  return (
    <SafeAreaView>
      {/* <StatusBar /> */}
      <ScrollView>
        <View
          style={{
            ...styles.container,
            height:
              MaintainenceSelceted?.comments?.length > 0
                ? 'auto'
                : SCREEN_HEIGHT,
          }}>
          <View style={{height: '100%'}}>
            <MiniMaintenanceDetailsCard
              // title={'Ma89565'}
              text={MaintainenceSelceted?.name}
              image={require('../../../assets/png/settings_blue.png')}
              subtitle={
                'Problem Type: ' + MaintainenceSelceted?.maintenance_type
              }
              status={MaintainenceSelceted?.stage_id[1]}
              imagestatus={
                MaintainenceSelceted?.is_solved
                  ? require('../../../assets/png/righttik.png')
                  : require('../../../assets/png/inprogress.png')
              }
              color={
                MaintainenceSelceted?.is_solved
                  ? COLORS().green
                  : COLORS().inprogress
              }
            />
            {stages?.map((item, index) => {
              return (
                <MiniMaintenanceDetailsCardStatus
                  title={'Request Submitted'}
                  item={item}
                  text={'26 April 2022, 12.00 pm'}
                  image={require('../../../assets/png/tik_blue.png')}
                  line={index < 3 ? true : false}
                  currentState={MaintainenceSelceted?.stage_id[1]}
                  active={MaintainenceSelceted?.stages_ids[`${index + 1}`]}
                />
              );
            })}
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <ProblemDescriptionCard
                  title={MaintainenceSelceted?.description}
                  image={
                    MaintainenceSelceted?.attachments?.[0]?.type == 'image'
                      ? {uri: MaintainenceSelceted?.attachments?.[0]?.url}
                      : null
                  }
                  video={MaintainenceSelceted?.attachments?.[0]?.url}
                  isVideo={MaintainenceSelceted?.attachments?.[0]?.url.includes(
                    'mp4',
                  )}
                />
                {comments && comments?.length > 0 && (
                  <FeedbackAnswer
                    title={'Your Feedback'}
                    // date={'25/04/2023, 4:12 PM'}
                    desc={comments}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 10,
          width: '100%',
          position: 'absolute',
          backgroundColor: 'white',
          padding: 10,
        }}>
        <TouchBtn
          text={'Media'}
          width={'80%'}
          type={'basic'}
          onPress={() => HandleOpenModalC()}
          color={COLORS().red}
          Icon={null}
          disable={false}
          styleText={null}
          style={{
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          outline={null}
          textcolor={COLORS().white}
          textSize={null}
        />
        <NewBottomSheet
          call={false}
          onPress={refRC}
          title={
            <View
              style={{
                height: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
                Feedback
              </Text>
            </View>
          }
          Item={null}
          Height={350}
          Content={
            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                borderRadius: 10,
                width: '90%',
                height: '80%',
              }}>
              <View>
                <Pressable onPress={() => UploadImage()}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                      marginVertical: 10,
                    }}>
                    <MaterialIcons
                      name="photo-camera"
                      size={25}
                      color={COLORS().blue}
                      style={{marginHorizontal: 8}}
                    />
                    <Text
                      style={{
                        color: COLORS().dark,
                      }}>
                      Open Camera
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() =>
                    navigation.navigate('RecordVoice', {MaintainenceSelceted})
                  }>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                      marginVertical: 10,
                    }}>
                    <MaterialCommunityIcons
                      name="record-circle-outline"
                      size={25}
                      color={COLORS().blue}
                      style={{marginHorizontal: 8}}
                    />
                    <Text
                      style={{
                        color: COLORS().dark,
                      }}>
                      Record Voice
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() =>
                    navigation.navigate('videoRec', {MaintainenceSelceted})
                  }>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                      marginVertical: 10,
                    }}>
                    <MaterialIcons
                      name="video-call"
                      size={25}
                      color={COLORS().blue}
                      style={{marginHorizontal: 8}}
                    />
                    <Text
                      style={{
                        color: COLORS().dark,
                      }}>
                      Record Video
                    </Text>
                  </View>
                </Pressable>
              </View>

              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bottom: '5%',
                  width: '100%',
                  position: 'absolute',
                }}>
                <TouchBtn
                  text={'Submit '}
                  width={'100%'}
                  type={'basic'}
                  isLoading={loading}
                  onPress={() => (loading ? null : Submit())}
                  color={COLORS().red}
                  Icon={null}
                  disable={disable}
                  styleText={null}
                  style={{
                    height: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}
                  outline={null}
                  textcolor={COLORS().white}
                  textSize={null}
                />
              </View>
            </View>
          }
          // Height={400}
          width={'100%'}
        />
        <TouchBtn
          text={'Give Feedback'}
          width={'80%'}
          type={'basic'}
          onPress={() => HandleOpenModal()}
          color={COLORS().red}
          Icon={null}
          disable={false}
          styleText={null}
          style={{
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          outline={null}
          textcolor={COLORS().white}
          textSize={null}
        />

        <NewBottomSheet
          call={false}
          onPress={refRB}
          title={
            <View
              style={{
                height: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
                Feedback
              </Text>
            </View>
          }
          Item={null}
          Height={350}
          Content={
            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                borderRadius: 10,
                width: '90%',
                height: '80%',
              }}>
              {/* <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 10,
                    flexDirection: 'row',
                    marginVertical: 20,
                  }}>
                  <View
                    style={{
                      // height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      flexDirection: 'row',
                      borderColor: COLORS().lightBorder,
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      width: '40%',
                    }}>
                    <Image source={require('../../assets/png/righttik.png')} />
                    <Text
                      style={{
                        color: COLORS().black,
                        marginHorizontal: 10,
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      Solved
                    </Text>
                  </View>
                  <View
                    style={{
                      // height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      flexDirection: 'row',
                      borderColor: COLORS().lightBorder,
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      width: '40%',
                    }}>
                    <Image
                      style={{width: 30, height: 30}}
                      source={require('../../assets/png/sad.png')}
                    />
                    <Text
                      style={{
                        color: COLORS().black,
                        marginHorizontal: 10,
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      Not Yet
                    </Text>
                  </View>
                </View> */}
              <TextInput
                multiline={true}
                onChangeText={e => setcomment(e)}
                numberOfLines={4}
                placeholder="Write your feedback..."
                style={{
                  borderColor: COLORS().lightBorder,
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '100%',
                  height: 100,
                  paddingHorizontal: 10,
                  color: COLORS().black,
                }}
                placeholderTextColor={COLORS().lightGrey}
              />

              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bottom: '5%',
                  width: '100%',
                  position: 'absolute',
                }}>
                <TouchBtn
                  text={'Submit'}
                  width={'100%'}
                  type={'basic'}
                  onPress={() => Submit()}
                  color={COLORS().red}
                  Icon={null}
                  disable={disable}
                  styleText={null}
                  style={{
                    height: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}
                  outline={null}
                  textcolor={COLORS().white}
                  textSize={null}
                />
              </View>
            </View>
          }
          // Height={400}
          width={'100%'}
        />
      </View>
    </SafeAreaView>
  );
};

export default MaintenanceDetails;

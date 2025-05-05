import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  StatusBar,
  TextInput,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import styles from './styles';
import {COLORS} from '../../consts/colors';
import axios from 'axios';
import TouchBtn from '../../Components/Buttons/TouchBtn';
import BottomSheet from '../../Components/Sheets/New_BottomSheet';
import {useSelector, useDispatch} from 'react-redux';
import SCREEN from '../../../Layout';
import MiniMaintenanceDetailsCard from '../../Components/Cards/MaintenanceDetailsCard/MiniMaintenanceDetailsCard';
import MiniMaintenanceDetailsCardStatus from '../../Components/Cards/MaintenanceDetailsCard/MiniMaintenanceDetailsCardStatus';
import ProblemDescriptionCard from '../../Components/Cards/MaintenanceDetailsCard/ProblemDescriptionCard';
import NewBottomSheet from '../../Components/Sheets/New_BottomSheet';
import {Input} from 'native-base';
import FeedbackAnswer from '../../Components/Cards/MaintenanceDetailsCard/FeedbackAnswer';
import {api} from '../../axios';
import Spinner from '../../Components/Spinner';
import {useMaintianenceApi, useOneMaintianenceApi} from '../../apis/Home';
import {useIsFocused} from '@react-navigation/native';
import {SCREEN_HEIGHT} from '@gorhom/bottom-sheet';
const MaintenanceDetails = ({navigation, route}) => {
  const {comments} = useSelector(state => state.Home);
  const MaintainenceSelceted = route.params.MaintainenceSelceted;
  const {hasLegalCase} = route.params;
  const [comment, setcomment] = useState('');
  const {userInfo} = useSelector(state => state.userinfo);
  const [response, setresponse] = useState(false);
  const {mutate: OneMaintianenceApi} = useOneMaintianenceApi();
  const [stages, setStages] = useState([]);
  const [notificationData, setNotificationData] = useState(null);
  const selectedProp = useSelector(state => state.MyProperties.selectedProp);
  const {mutate: MaintianenceApi, isLoading} = useMaintianenceApi();
  const {isDark} = useSelector(state => state.Home);

  const maintenance_request_stages = async () => {
    const res = await api.post('api/maintenance_request_stages', {});

    if (res?.data?.result) {
      setStages(res?.data?.result);
    }
  };
  useEffect(async () => {
    if (route?.params?.id) {
      try {
        const res = await axios.post(
          `https://odooerp-ae-property.odoo.com/api/generic_details/maintenance.request/${route?.params?.id}`,
          {},
        );
        // console.log(res?.data, 'res');
        setNotificationData(res.data.result.record);
      } catch (error) {
        // console.log(error.response, 'error');
      }
      OneMaintianenceApi({id: route?.params?.id});

      // console.log(route?.params?.id, 'route?.params?.id');
    }
  }, [route?.params?.id]);

  const IsFocused = useIsFocused();
  useEffect(() => {
    maintenance_request_stages();
    OneMaintianenceApi({id: MaintainenceSelceted?.id});
  }, [IsFocused]);
  useEffect(() => {
    // console.log(MaintainenceSelceted?.attachments, 'comments');
  }, [MaintainenceSelceted]);

  const refRB = useRef();
  const HandleOpenModal = () => {
    //
    refRB.current.open();
  };
  const handleCloseModal = () => {
    refRB.current.close();
  };
  const [disable, setdisable] = useState(false);

  const Submit = async () => {
    try {
      const res = await api.post(`api/property_send_feed_back`, {
        params: {
          author_id: userInfo?.partner_id,
          comment,
          request_id: notificationData
            ? notificationData?.id
            : MaintainenceSelceted?.id,
        },
      });
      // Toast.show('Comments Sent Succefully.', Toast.LONG, {
      //   backgroundColor: 'orange',
      // });

      handleCloseModal();
      setresponse(res.data);
      OneMaintianenceApi({
        id: notificationData ? notificationData?.id : MaintainenceSelceted?.id,
      });
      // setOpen(false);
      MaintianenceApi({
        partner_type: userInfo?.partner[0].is_tenant ? 'tenant' : 'owner',
        partner: userInfo.partner_id,
        flat: selectedProp.id,
      });
      setdisable(true);
      setTimeout(() => {
        setdisable(false);
      }, 1000);
    } catch (error) {}
  };
  // useEffect(() => {
  //   console.log(data, 'data b');

  //   if (data) {
  //     // console.log(data, 'data b');
  //   }
  // }, [data]);
  return (
    <SafeAreaView>
      {/* <StatusBar /> */}
      <ScrollView>
        <View
          style={{
            ...styles.container,
            height: '100%',
            backgroundColor: COLORS(isDark).cardForDark,
          }}>
          <View
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MiniMaintenanceDetailsCard
              // title={'Ma89565'}
              text={
                notificationData
                  ? notificationData?.name
                  : MaintainenceSelceted?.name
              }
              image={require('../../assets/png/settings_blue.png')}
              subtitle={
                'Problem Type: ' +
                (notificationData
                  ? notificationData?.maintenance_request_type_id?.[1]
                  : MaintainenceSelceted?.maintenance_type)
              }
              technician_id={
                notificationData
                  ? notificationData?.technician_id
                  : MaintainenceSelceted?.technician_id
              }
              schedule_date={
                notificationData
                  ? notificationData?.schedule_date
                  : MaintainenceSelceted?.schedule_date
              }
              status={
                notificationData
                  ? notificationData?.stage_id[1]
                  : MaintainenceSelceted?.stage_id[1]
              }
              imagestatus={
                MaintainenceSelceted?.is_solved
                  ? require('../../assets/png/righttik.png')
                  : require('../../assets/png/inprogress.png')
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
                  image={require('../../assets/png/tik_blue.png')}
                  line={index < 3 ? true : false}
                  currentState={
                    notificationData
                      ? notificationData?.stage_id[1]
                      : MaintainenceSelceted?.stage_id[1]
                  }
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
                  attach={MaintainenceSelceted?.attachments}
                />
                {/* <FeedbackAnswer
                  isDark={isDark}
                  title={'Your Feedback'}
                  // date={'25/04/2023, 4:12 PM'}
                  desc={['comments']} 
                /> */}
                {console.log(comments, 'comments')}
                {comments && comments?.length > 0 && (
                  <FeedbackAnswer
                    isDark={isDark}
                    title={'Your Feedback'}
                    // date={'25/04/2023, 4:12 PM'}
                    desc={comments}
                  />
                )}
              </>
            )}

            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // bottom: 10,
                width: '100%',
                // position: 'absolute',
                backgroundColor: COLORS(isDark).cardForDark,
                padding: 10,
                marginBottom: 70,
              }}>
              {hasLegalCase && (
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
              )}

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
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MaintenanceDetails;

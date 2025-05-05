import {COLORS} from '../../consts/colors';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
// import Toast from 'react-native-simple-toast';
import Video from 'react-native-video';
import {ScrollView} from 'react-native-gesture-handler';
import {api} from '../../axios';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {useMaintianenceApi} from '../../apis/Home';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
const SheetCard = ({
  openModal,
  setOpenModal,
  MaintainenceSelceted,
  setOpen,
  handleCloseModal,
}) => {
  const [comment, setcomment] = useState('');
  const {userInfo} = useSelector(state => state.userinfo);
  const [response, setresponse] = useState(false);
  const selectedProp = useSelector(state => state.MyProperties.selectedProp);
  const {mutate: MaintianenceApi, isLoading} = useMaintianenceApi();

  const Submit = async () => {
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
      setOpen(false);
      MaintianenceApi({
        partner_type: userInfo?.partner[0].is_tenant ? 'tenant' : 'owner',
        partner: userInfo.partner_id,
        flat: selectedProp.id,
      });
    } catch (error) {}
  };
  return (
    <View>
      <ScrollView>
        <View style={style.flexcolstart}>
          <View>
            <TouchableOpacity onPress={handleCloseModal}>
              <FontAwesome style={{color: 'red', fontSize: 20}} name="close" />
            </TouchableOpacity>
          </View>
          <View style={style.flexRowbtw}>
            <View style={style.flexcolstart2}>
              <Text style={{color: COLORS().dark, fontWeight: 'bold'}}>
                {MaintainenceSelceted?.name}
              </Text>
              <Text
                style={{
                  color: COLORS().grey,
                  fontWeight: '400',
                  fontWeight: 'bold',
                }}>
                {MaintainenceSelceted?.request_date}
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{
                    marginVertical: 2,
                    marginHorizontal: 5,
                  }}>
                  <Text style={{color: COLORS().dark, fontWeight: 'bold'}}>
                    Status :{' '}
                    <Text style={{color: 'green'}}>
                      {MaintainenceSelceted?.stage_id?.[1]}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    padding: 5,
                  }}>
                  <Text style={{color: COLORS().blue}}>
                    Type :{' '}
                    <Text>
                      {' '}
                      {MaintainenceSelceted?.maintenance_request_type_id?.[1]}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              borderColor: '#DCDCDC',
              borderWidth: 2,
              borderRadius: 25,
              width: '100%',
              padding: 20,
            }}>
            <Text style={{marginVertical: 5}}>12/02/2021, 2:36 PM</Text>
            <Text style={{marginBottom: 15, color: COLORS().dark}}>
              {MaintainenceSelceted?.description}
            </Text>
            {/* <Text style={{color: COLORS().dark}}>
              I like the area in Peckham, it was nice and quite. Easy to grab
              busses close by anytime, but it takes around 30-40min to central
              of London.
            </Text> */}
            {MaintainenceSelceted?.attachments?.length > 0 && (
              <Text
                style={{
                  marginVertical: 15,
                  fontWeight: 'bold',
                  color: COLORS().dark,
                }}>
                Attachments
              </Text>
            )}

            <View style={{display: 'flex', flexDirection: 'row'}}>
              {MaintainenceSelceted?.attachments?.map(attach => {
                if (attach.url) {
                  if (attach.url.includes('mp4')) {
                    return (
                      <View>
                        <Video
                          volume={0.4}
                          source={{uri: attach.url}}
                          controls={true}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 5,
                            marginRight: 5,
                          }}
                        />
                      </View>
                    );
                  }
                  return (
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 5,
                        marginRight: 5,
                      }}
                      source={{uri: `${attach?.url}`}}
                    />
                  );
                }
              })}
            </View>
          </View>
          <View
            style={{
              backgroundColor: COLORS().backgroundblue,
              borderRadius: 25,
              width: '100%',
              padding: 20,
              marginVertical: 20,
            }}>
            <Text style={{marginVertical: 5, color: COLORS().grey}}>
              {MaintainenceSelceted?.request_date}
            </Text>
            <Text
              style={{
                marginVertical: 15,
                fontWeight: 'bold',
                color: COLORS().dark,
              }}>
              Tenant Feedback
            </Text>
            {MaintainenceSelceted?.comments?.map(comment => {
              return (
                <Text
                  style={{
                    color: COLORS().dark,
                    borderColor: 'grey',
                    borderWidth: 2,
                    borderRadius: 5,
                    marginVertical: 3,
                    width: '100%',
                    padding: 5,
                    paddingHorizontal: 10,
                  }}>
                  {comment.description}
                </Text>
              );
            })}
          </View>
          <View style={{width: '95%', marginBottom: 50}}>
            <TextInput
              onChangeText={e => setcomment(e)}
              placeholder=" Write a message..."
              style={style.input}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Pressable
          style={{
            backgroundColor: COLORS().dark,
            width: 120,
            borderRadius: 8,
            padding: 15,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            marginHorizontal: 5,
            display: 'none',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              backgroundColor: COLORS().dark,
              color: COLORS().white,
              display: 'none',
            }}>
            Not Yet
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: '#14AD2F',
            width: 120,
            borderRadius: 8,
            padding: 15,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            marginHorizontal: 5,
          }}
          onPress={() => Submit()}>
          <Text
            style={{
              fontWeight: 'bold',
              backgroundColor: '#14AD2F',
              color: COLORS().white,
            }}>
            Submit
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  //   line: {
  //     // borderBottomColor: COLORS().grey,
  //     // borderColor: 'white',
  //     width: '90%',
  //     height: 1,
  //     borderWidth: 0.5,
  //     // opacity: 0.4,
  //     marginVertical: 20,
  //     marginHorizontal: '5%',
  //     // height: 10,
  //   },
  flexcolstart2: {
    height: 'auto',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: COLORS().white,
    paddingVertical: 5,
    width: '72%',
  },
  flexcolstart: {
    height: 'auto',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: COLORS().white,
    paddingVertical: 5,
    width: '100%',
  },
  flexRowbtw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS().white,
    borderRadius: 12,
    marginVertical: 5,
    marginHorizontal: 6,
    width: '75%',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderColor: '#DCDCDC',
    borderRadius: 8,
    color: COLORS().grey,
  },
});
export default SheetCard;

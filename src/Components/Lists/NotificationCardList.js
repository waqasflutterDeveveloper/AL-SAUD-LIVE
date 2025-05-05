import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import LargeNotificationCard from '../Notification/LargeNotificationCard';
import {COLORS} from '../../consts/colors';
import BottomSheet from '../Sheets/New_BottomSheet';
import BasicBtn from '../../Components/Buttons/BasicButton';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import TouchableOpacityBtn from '../../Components/Buttons/TouchBtn';
import SCREEN from '../../../Layout';
import {useNavigation} from '@react-navigation/native';
import {UseGetmaintenanceNotificationsApi} from '../../apis/Home';
import {api} from '../../axios';
import {useSelector} from 'react-redux';
const NotificationCardList = ({data, type}) => {
  const [Data, setData] = useState([]); // Holds your data
  const [page, setPage] = useState(1); // Initialize the page number
  const [loading, setLoading] = useState(false); // Track loading state
  const [hasMore, setHasMore] = useState(true);
  const {navigate} = useNavigation();
  const refRB = useRef();
  const {userInfo} = useSelector(state => state.userinfo);
  const {isDark} = useSelector(state => state.Home);

  const HandleOpenModal = (id, type, item) => {
    //mutate

    // console.log(item, 'itemmm');
    if (type == 'property.contract') {
      navigate('PaymentScreen', {id, item: {}, parent: {}});
    } else if (type == 'maintenance.request') {
      navigate('MaintenanceDetails', {id});
    } else {
      if (
        item.cheque_amount > 0 &&
        item?.cheque_status_code != 'posted' &&
        item.cheque_status_code != 'draft'
      ) {
        const index = 0;
        navigate('PaymentScreenTab', {id, item, index});
      } else {
        const index = 1;

        navigate('PaymentScreenTab', {id, item, index});
      }
    }
    type == 'pdc.wizard';
    // refRB.current.open();
  };
  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.post(
        `api/partner_notifications_pagers/page/${page}`,
        {
          params: {
            partner_id: userInfo?.partner_id,
            model:
              type == 'account.payment'
                ? `${'pdc.wizard,account.payment'}`
                : type,
          },
        },
      );
      const newData = response.data?.result.filter(
        item => item?.model_id == type,
      );
      // console.log(response, 'newDatanewDatanewData');
      if (newData.length > 0) {
        setData([...newData, ...Data]);
      } else {
        setHasMore(false); // No more data to load
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page) {
      fetchData(1);
    }
  }, []);

  const SubItem = ({item, index}) => {
    return (
      <View>
        <LargeNotificationCard
          image={item.image}
          desc={item.message}
          title={item.display_name}
          time={item.write_date}
          onPress={() => HandleOpenModal(item?.res_id, item?.model_id, item)}
          item={item}
        />
        <View style={styles.line} />
      </View>
    );
  };
  const Item = ({item}) => {
    return (
      item && (
        <View style={{marginBottom: 15}}>
          {/* <View>
            <Text style={styles.bluetext}>{item.displa}</Text>
          </View> */}
          <View style={styles.containerSubItem}>
            <SubItem key={item?.id} item={item} />

            {/* {item.notification?.map(item => (
            ))} */}
          </View>
        </View>
      )
    );
  };
  return (
    <View style={{backgroundColor: COLORS(isDark).cardForDark}}>
      <FlatList
        data={Data}
        showsHorizontalScrollIndicator={false}
        renderItem={Item}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.2} // Load more when 10% from the bottom
        // onEndReached={() => {
        //   if (hasMore && !loading) {
        //     setPage(old => old + 1);
        //   }
        // }}
        ListFooterComponent={
          <>
            {Data?.length > 0 && (
              <View
                style={{
                  height: 180,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setPage(old => old + 1);
                    fetchData(page + 1);
                  }}>
                  <Text
                    style={{
                      width: 100,
                      backgroundColor: COLORS().red,
                      textAlign: 'center',
                      paddingVertical: 5,
                      paddingHorizontal: 15,
                      borderRadius: 5,
                      color: 'white',
                      margin: 'auto',
                    }}>
                    Load More
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        }
      />
      <BottomSheet
        call={false}
        onPress={refRB}
        width={'25%'}
        title={'Make a Review'}
        Content={
          <View style={styles.content}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  borderRadius: 10,
                  borderColor: COLORS().stock,
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  width: '100%',
                }}>
                <Image
                  style={{
                    width: 28,
                    height: 28,
                  }}
                  source={{
                    uri: 'https://static.thenounproject.com/png/2085889-200.png',
                  }}
                />
                <View style={styles.secboxtext}>
                  <Text style={styles.name}>Flat/SNA - 101 Block...</Text>
                  <View style={styles.codebox}>
                    <Text style={{color: SCREEN.DARKGREY, fontSize: 12}}>
                      Code: SNA-101
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginVertical: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: SCREEN.BLUE,
                  }}>
                  Rate the Property
                </Text>
                <View
                  style={{
                    marginVertical: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Ionicons
                    name="star"
                    style={{marginHorizontal: 2}}
                    size={25}
                    color="gold"
                  />
                  <Ionicons
                    name="star"
                    style={{marginHorizontal: 2}}
                    size={25}
                    color="gold"
                  />
                  <Ionicons
                    name="star"
                    style={{marginHorizontal: 2}}
                    size={25}
                    color="gold"
                  />
                  <Ionicons
                    name="star"
                    style={{marginHorizontal: 2}}
                    size={25}
                    color={SCREEN.MIDDLEGREY}
                  />
                  <Ionicons
                    name="star"
                    style={{marginHorizontal: 2}}
                    size={25}
                    color={SCREEN.MIDDLEGREY}
                  />
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                }}>
                <TextInput
                  style={{
                    color: COLORS().dark,
                    borderColor: COLORS().stock,
                    borderWidth: 1,
                    height: 100,
                    borderRadius: 10,
                    marginVertical: 15,
                    paddingHorizontal: 10,
                  }}
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Write your review..."
                  placeholderTextColor={'grey'}
                />
                <TouchableOpacityBtn
                  color={SCREEN.OREANGE}
                  text="Send"
                  width={'100%'}
                  style={{
                    borderRadius: 10,
                    paddingVertical: 12,
                    marginVertical: 15,
                  }}
                  textcolor={SCREEN.WHITE}
                  type="basic"
                  textSize={14}
                  // Icon={<Contact />}
                />
              </View>
            </View>
          </View>
        }
      />
    </View>
  );
};

export default NotificationCardList;

const styles = StyleSheet.create({
  bluetext: {
    color: COLORS().blue,
    fontWeight: '700',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  containerSubItem: {
    backgroundColor: COLORS().backgroundLight,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS().stock,
  },
  line: {
    height: 1,
    width: '80%',
    backgroundColor: COLORS().stock,
    alignSelf: 'center',
    // marginVertical: 10,
  },
  content: {
    alignItems: 'center',
    width: '90%',
  },
  secboxtext: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 10,
    // backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 5,
  },
  name: {
    color: COLORS().dark,
    fontWeight: 'bold',
    fontSize: 13,
  },
});

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import moment from 'moment';
import {COLORS} from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropertyCard from '../Components/Cards/PropertyCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Skeleton from '../Components/Skeleton';
import {setHomeDetailedData} from '../Store/HomeData/HomeSlice';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
const {width} = Dimensions.get('screen');
import houses from '../consts/houses';
import {useMyPropertyApi} from '../apis/Home';
import {api} from '../axios';
import Header from '../Components/Header';
import UpcommingVisitCard from '../Components/Cards/UpcommingVisitCard';
const Card = ({house}) => {
  // const dispatch = useDispatch();
  // const navigation = useNavigation();
  // const handleHomeClick = house => {
  //   dispatch(setHomeDetailedData(house));
  //   navigation.navigate('DetailsScreenInStack');
  // };

  return (
    <Pressable activeOpacity={0.8}>
      <View style={style.card}>
        <View style={style.allIconflex}>
          <View style={style.allIcon}>
            <View></View>
          </View>
        </View>

        <Image
          source={
            house?.image_128
              ? {uri: `data:image/jpeg;base64,${house?.image_128}`}
              : require('../assets/unknown.jpg')
          }
          style={style.cardImage}
        />

        <View style={{marginTop: 10}}>
          {/* Title and price container */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: COLORS().dark,
              }}>
              Apartment
            </Text>
            <Text
              style={{
                fontWeight: '500',
                color: COLORS().grey,
                fontSize: 12,
              }}>
              Ref No. {house?.code}
            </Text>
          </View>

          {/* Location text */}

          <Text
            style={{
              color: COLORS().blue,
              fontSize: 14,
              marginTop: 5,
              fontWeight: 'bold',
            }}>
            {house?.rent_value}
          </Text>
          <Text
            style={{
              color: COLORS().grey,
              fontSize: 12,
              marginTop: 5,
              fontWeight: '500',
              textAlign: 'left',
            }}>
            {house?.building_id?.[1]} - {house?.state_id?.[1]}
          </Text>
          {/* Facilities container */}
          <View style={{flexDirection: 'column'}}>
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <View style={style.facility}>
                <Ionicons name="bed-outline" size={18} color={COLORS().dark} />
                <Text style={style.facilityText}> {house?.room_no} Rooms</Text>
              </View>
              <View style={style.facility}>
                <Icon name="bathtub-outline" size={18} color={COLORS().dark} />
                <Text style={style.facilityText}>
                  {house?.bathroom_no} Bathrooms
                </Text>
              </View>
              <View style={style.facility}>
                <Ionicons
                  name="md-repeat-sharp"
                  size={18}
                  color={COLORS().dark}
                />
                <Text style={style.facilityText}>{house?.area} ft2</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
const MyVisitsScreen = ({}) => {
  const navigation = useNavigation();
  const {mutate: GetmyProp, isLoading} = useMyPropertyApi();
  const userInfo = useSelector(state => state.userinfo.userInfo);
  const [data, setData] = useState([]);
  const {isDark} = useSelector(state => state.Home);

  const getMyVisits = async () => {
    const result = await api.post(
      `api/property_visits/${userInfo.partner_id}`,
      {},
    );
    //
    // console.log(result.data.result[0], 'result.data.result');
    setData(result.data.result);
  };
  useEffect(() => {
    // GetmyProp({partner_id: userInfo.partner_id});
    getMyVisits();
    return () => {};
  }, []);
  useEffect(() => {
    //
  }, []);
  const FirstRoute = () => (
    <View style={{flex: 1, backgroundColor: COLORS(isDark).blakvsgrey}}>
      <FlatList
        snapToInterval={width - 20}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginBottom: 50, marginHorizontal: 10}}
        vertical
        data={data}
        renderItem={({item}) => (
          <>
            <UpcommingVisitCard data={item} width="95%" />
          </>
        )}
        ListFooterComponent={<View style={{marginBottom: 60}}></View>}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              display: 'flex',
              backgroundColor: COLORS(isDark).blakvsgrey,
            }}>
            <Text
              style={{color: COLORS(isDark).blueVsBlack, fontWeight: 'bold'}}>
              No Data
            </Text>
          </View>
        )}
      />
    </View>
  );

  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: COLORS(isDark).blakvsgrey}}>
      <FlatList
        snapToInterval={width - 20}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginBottom: 50,
          marginHorizontal: 10,
        }}
        vertical
        data={data.filter(item => {
          const today = moment(new Date()).format('YYYY-MM-DD');
          const diff = moment(new Date()).diff(
            moment(item.date).format('YYYY-MM-DD'),
            'days',
          );

          return diff < 0 ? true : false;
        })}
        renderItem={({item}) => (
          <>
            <UpcommingVisitCard data={item} width="100%" />
          </>
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              display: 'flex',
              backgroundColor: COLORS(isDark).blakvsgrey,
              height: '100%',
            }}>
            <Text
              style={{color: COLORS(isDark).blueVsBlack, fontWeight: 'bold'}}>
              No Data
            </Text>
          </View>
        )}
      />
    </View>
  );
  const ThirdRoute = () => (
    <View style={{flex: 1, backgroundColor: COLORS(isDark).blakvsgrey}}>
      <FlatList
        snapToInterval={width - 20}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginBottom: 50,
          marginHorizontal: 10,
        }}
        vertical
        data={data.filter(item => {
          const today = moment(new Date()).format('YYYY-MM-DD');
          const diff = moment(new Date()).diff(
            moment(item.date).format('YYYY-MM-DD'),
            'days',
          );

          return diff > 0 ? true : false;
        })}
        renderItem={({item}) => (
          <>
            <UpcommingVisitCard data={item} width="100%" />
          </>
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              display: 'flex',
            }}>
            <Text
              style={{color: COLORS(isDark).blueVsBlack, fontWeight: 'bold'}}>
              No Data
            </Text>
          </View>
        )}
      />
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'All'},
    {key: 'second', title: 'Upcoming'},
    {key: 'third', title: 'Past'},
  ]);
  const renderTabBar = props => {
    // console.log(props.navigationState.isDark);
    return (
      <TabBar
        {...props}
        renderLabel={({focused, route}) => {
          return (
            <Text
              style={{
                fontSize: 15,
                color: focused ? COLORS().blue : 'grey',
              }}>
              {route.title}
            </Text>
          );
        }}
        indicatorStyle={style.indicatorStyle}
        style={[
          style.tabBar,
          {backgroundColor: COLORS(props.navigationState.isDark).blakvsgrey},
        ]}
      />
    );
  };

  if (isLoading) {
    return (
      <>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </>
    );
  }
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS(isDark).blakvsgrey,

        flex: 1,
      }}>
      {/* Customise status bar */}
      <Header title={'My Visits'} back />
      <TabView
        isDark={isDark}
        navigationState={{index, routes, isDark}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
  },
  indicatorStyle: {
    backgroundColor: COLORS().blue,
    padding: 1.5,
    // marginBottom: -2,
  },
  divider: {
    zIndex: 100,
    position: 'absolute',
    width: 1,
    height: 48,
    backgroundColor: 'black',
    alignSelf: 'center',
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  searchInputContainer: {
    height: 50,
    // backgroundColor: COLORS().light,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  sortBtn: {
    backgroundColor: COLORS().white,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  optionsCard: {
    height: 210,
    width: width / 2 - 30,
    elevation: 15,
    alignItems: 'center',
    backgroundColor: COLORS().white,
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  optionsCardImage: {
    height: 140,
    borderRadius: 10,
    width: '100%',
  },
  optionListsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryListText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: COLORS().grey,
  },
  activeCategoryListText: {
    color: COLORS().dark,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 40,
  },
  card: {
    height: 340,
    backgroundColor: COLORS().white,
    // elevation: 10,
    // width: width - 40,
    // marginRight: 20,
    padding: 10,
    borderRadius: 20,
    // borderBottomColor: COLORS().dark,
    // borderWidth: 1,
    // borderColor: '#fff',
  },

  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  facility: {flexDirection: 'row', marginRight: 15},
  facilityText: {marginLeft: 5, color: COLORS().dark, fontSize: 12},
  line: {
    borderBottomColor: COLORS().line,
    // borderColor: 'white',
    borderWidth: 0.5,
    opacity: 0.2,
    marginVertical: 20,
    // height: 10,
  },
  allIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 10,
    zIndex: 5,
    width: '100%',
  },
  allIconflex: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  twoIcon: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  icon: {
    color: COLORS().grey,
    backgroundColor: COLORS().white,
    borderRadius: 6,
    padding: 8,
    marginHorizontal: 3,
    fontWeight: 600,
    fontSize: 18,
  },
  bluebox: {
    width: '90%',

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
});
export default MyVisitsScreen;

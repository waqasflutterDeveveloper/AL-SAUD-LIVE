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
  BackHandler,
} from 'react-native';
import {COLORS} from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('screen');
import houses from '../consts/houses';
import {useHomeApi} from '../apis/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Skeleton from '../Components/Skeleton';
import {setHomeDetailedData} from '../Store/HomeData/HomeSlice';
import {api} from '../axios';

const HomeScreenGuest = ({route}) => {
  const {data, isLoading} = useHomeApi();
  const [AllLoved, setAllLoved] = useState([]);
  const HomeData = useSelector(state => state.Home.data);

  const {DontMakeAnotherCall} = useSelector(state => state.Home);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const dontRefresh = route.params;

  const handleHomeClick = house => {
    dispatch(setHomeDetailedData(house));
    navigation.navigate('DetailsScreenInStack');
  };

  const HandleFavClick = async id => {
    setAllLoved(old => [...old, id]);
    const oldfav = await AsyncStorage.getItem('Fav');
    let concated = '';
    if (!oldfav) {
      const fav = await AsyncStorage.setItem('Fav', id.toString());
      //

      return;
    }
    concated = oldfav.concat(',', id);

    const fav = await AsyncStorage.setItem('Fav', concated);
  };
  const Card = ({house}) => {
    return (
      <Pressable activeOpacity={0.8} onPress={() => handleHomeClick(house)}>
        <View style={style.card}>
          <View style={style.allIconflex}>
            <View style={style.allIcon}>
              <View></View>
              <View style={style.twoIcon}>
                <Ionicons name="push-outline" style={style.icon} size={18} />
                <Pressable onPress={() => HandleFavClick(house.id)}>
                  <View style={{...style.icon}}>
                    <Ionicons
                      name="heart"
                      style={{
                        color: AllLoved.includes(house.id) ? 'red' : 'grey',
                      }}
                      size={18}
                    />
                  </View>
                </Pressable>
              </View>
            </View>
          </View>

          <Image
            source={
              house.image_128
                ? {uri: `data:image/jpeg;base64,${house.image_128}`}
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
                Ref No. {house.code}
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
              {house.rent_value}
            </Text>
            <Text
              style={{
                color: COLORS().grey,
                fontSize: 12,
                marginTop: 5,
                fontWeight: '500',
                textAlign: 'left',
              }}>
              {house.building_id[1]} - {house.state_id[1]}
            </Text>
            {/* Facilities container */}
            <View style={{flexDirection: 'column'}}>
              <View style={{marginTop: 10, flexDirection: 'row'}}>
                <View style={style.facility}>
                  <Ionicons
                    name="bed-outline"
                    size={18}
                    color={COLORS().dark}
                  />
                  <Text style={style.facilityText}> {house.room_no} Rooms</Text>
                </View>
                <View style={style.facility}>
                  <Icon
                    name="bathtub-outline"
                    size={18}
                    color={COLORS().dark}
                  />
                  <Text style={style.facilityText}>
                    {house.bathroom_no} Bathrooms
                  </Text>
                </View>
                <View style={style.facility}>
                  <Ionicons
                    name="md-repeat-sharp"
                    size={18}
                    color={COLORS().dark}
                  />
                  <Text style={style.facilityText}>{house.area} ft2</Text>
                </View>
              </View>
              {/* <View style={style.bluebox}>
                <Text style={style.blueboxtext}>
                  <Ionicons
                    name="information-circle-outline"
                    size={12}
                    style={{marginHorizontal: 3}}
                    color={COLORS().blue}
                  />
                  You have already sent an Inquiry: 14th of July
                </Text>
              </View> */}
            </View>
          </View>
          <View style={style.line}></View>
        </View>
      </Pressable>
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
    <SafeAreaView style={{backgroundColor: COLORS().white, flex: 1}}>
      {/* Customise status bar */}
      <StatusBar
        translucent={false}
        backgroundColor={COLORS().white}
        barStyle="dark-content"
      />
      {/* Header container */}
      {/* <View style={style.header}>
        <View>
          <Text style={{color: COLORS().grey}}>Location</Text>
          <Text style={{color: COLORS().dark, fontSize: 20, fontWeight: 'bold'}}>
            Canada
          </Text>
        </View>
        <Image
          style={style.profileImage}
          source={require('../assets/person.jpg')}
        />
      </View> */}
      {/* Input and sort button container */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <View style={style.searchInputContainer}>
          {/* <Icon name="search" color={COLORS().grey} size={25} /> */}
          {/* <TextInput placeholder="Search address, city, location" /> */}
          <Text
            style={{
              fontWeight: '600',
              color: COLORS().dark,
              fontSize: 14,
            }}>
            {HomeData?.length} results
          </Text>
        </View>
        <Pressable onPress={() => navigation.navigate('FilterScreen')}>
          <View style={style.sortBtn}>
            <Icon
              name="tune-variant"
              color={COLORS().dark}
              style={{
                borderWidth: 1,
                padding: 5,
                borderColor: COLORS().grey,
                borderRadius: 4,
              }}
              size={18}
            />
          </View>
        </Pressable>
      </View>

      {/* Render list options */}
      {/* <ListOptions /> */}

      {/* Render categories */}
      {/* <ListCategories /> */}

      {/* Render Card */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          display: 'flex',
        }}>
        {HomeData.length > 0 ? (
          <FlatList
            snapToInterval={width - 20}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
            vertical
            data={HomeData}
            renderItem={({item}) => <Card house={item} />}
          />
        ) : (
          <Text style={{color: 'black', fontWeight: 'bold'}}>No Data</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
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
    width: width - 40,
    marginRight: 20,
    padding: 0,
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
export default HomeScreenGuest;

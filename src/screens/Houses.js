import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import SCREEN from '../../Layout';
import {ImageBackground} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import FirstInput from '../Components/Inputs/FirstInput';
import LargeHomeCard from '../Components/Cards/LargeHomeCard';
import BottomSheet from '../Components/Sheets/New_BottomSheet';
import BasicBtn from '../Components/Buttons/BasicButton';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  propertybytypeApi,
  useHomeApi,
  useReviewsApi,
  usesearchApi,
  propertybyprojectApi,
  useFilterRoomsPriceTypesApi,
  useAllFilterApi,
  useHomeProperties_pagersApi,
} from '../apis/Home';
import {useSelector, useDispatch} from 'react-redux';
import {setHomeData, setHomeDetailedData} from '../Store/HomeData/HomeSlice';
import Skeleton from '../Components/Skeleton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from '../Components/Spinner';
import {api} from '../axios';
import FilterSection from '../Components/Filtersection/index';
import {COLORS} from '../consts/colors';
import NewHomeCard from '../Components/Cards/NewHomeCard';
const Houses = ({route}) => {
  const {mutate: propertybytypeCall} = propertybytypeApi();
  const {mutate: propertybyprojectCall} = propertybyprojectApi();
  const {mutate: AllFilterCall} = useAllFilterApi();
  //
  const {isDark} = useSelector(state => state.Home);

  const [typefilter, settypefilter] = useState('All');
  const [roomfilter, setroomfilter] = useState('All');
  const [pricefilter, setpricefilter] = useState('All');
  const [pricefilterfrom, setpricefilterfrom] = useState('All');
  const [pricefilterto, setpricefilterto] = useState('All');
  const navigation = useNavigation();

  const {mutate: CallPagination, isLoading: isLoadingPagination} =
    useHomeProperties_pagersApi();
  const [page, setPage] = useState(1);
  const [dataProducts, setdataProducts] = useState([]);

  const dispatch = useDispatch();
  const {type, id, title} = route.params;
  const IsFocused = useIsFocused();

  const getAllFilter = async data => {
    const res = await api.post('api/filter_properties', {
      params: data,
    });
    // console.log(res.data?.result, 'reess');
    setdataProducts(res.data?.result);
  };
  const Getpropertybytype = async data => {
    // console.log(data, 'page page');
    try {
      const res = await api.post(
        `api/get_properties_pagers_by_type/${data.id}/page/${
          data?.page ? data.page : 1
        }`,
        {},
      );
      console.log(res.data?.result?.length);
      setdataProducts([...dataProducts, ...res.data?.result]);
    } catch (error) {
      // console.log(error.response, 'ress');
    }
  };
  const Gepropertybyproject = async data => {
    // console.log(data);
    const res = await api.post(
      `api/get_property_by_state_pagers/${data.id}/page/${
        data?.page ? data.page : 1
      }`,
      {},
    );
    // console.log(res.data?.result,"v");
    setdataProducts([...dataProducts, ...res.data?.result]);
  };
  useEffect(() => {
    if (type && type == 'property_by_type') {
      Getpropertybytype({refreshing, id, page});
    } else if (type && type == 'property_by_state') {
      // propertybyprojectCall({id});
      Gepropertybyproject({refreshing, id, page});
    }
  }, [page, type]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const ItemExtractorKey = (item, index) => {
    return index.toString();
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = React.useState(null);
  const [number, onChangeNumber] = React.useState('');
  const {userInfo} = useSelector(state => state.userinfo);

  const [callOnEndReached, setcallOnEndReached] = React.useState(false);

  const {
    data: HomeData,
    search: searchResults,
    property_by_type,
    property_by_project,
    isLoading,
  } = useSelector(state => state.Home);
  const {mutate: useReviews} = useReviewsApi();
  const {mutate: searchCall} = usesearchApi();
  const handleSearchChange = e => {
    setSearch(e);
  };
  useEffect(() => {
    // console.log(HomeData, 'HomeData');
    if (HomeData?.length > 0) {
      setdataProducts(HomeData);
    }
  }, [HomeData]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchCall({text: search});
      //
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);
  const {data: FilterRoomsPriceTypesCall} = useFilterRoomsPriceTypesApi();

  // const handleHomeClick = house => {
  //   dispatch(setHomeDetailedData(house));
  //   useReviews(house);
  //   navigation.navigate('Details_Screen');
  // };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  // useEffect(() => {
  //
  // }, [property_by_type]);
  const refRB = useRef();
  const RefRooms = useRef();
  const RefPrice = useRef();
  const HandleOpenModal = ref => {
    //
    ref.current.open();
  };
  const handleCloseModal = () => {
    refRB.current.close();
  };
  const handleCloseModalroom = () => {
    RefRooms.current.close();
  };
  const handleCloseModalPrice = () => {
    RefPrice.current.close();
  };
  const handleHomeClick = house => {
    dispatch(setHomeDetailedData(house));
    useReviews(house);
    navigation.navigate('Details_Screen', {id: house?.id});
  };
  const Item = ({house}) => (
    <TouchableOpacity onPress={() => handleHomeClick(house)}>
      <NewHomeCard
        width={SCREEN.WHITE}
        data={house}
        horizontal={false}
        isFav={false}
        onPress={() => handleHomeClick(house)}
      />
    </TouchableOpacity>
  );

  const HandleSelectedFilter = (type, value) => {
    if (type == 'flatfilter') {
      settypefilter(value);
      handleCloseModal();
    } else if (type == 'roomsfilter') {
      setroomfilter(value);
      handleCloseModalroom();
    } else {
      const arr = value.split('-');
      setpricefilter(value);
      handleCloseModalPrice();
      setpricefilterto(arr[1]);
      setpricefilterfrom(arr[0]);
    }
  };
  useEffect(() => {
    const obj = {
      ...(typefilter != 'All' && {type_id: typefilter}),
      ...(roomfilter != 'All' && {room_no: roomfilter}),
      ...(pricefilterto != 'All' && {price_to: pricefilterto}),
      ...(pricefilterfrom != 'All' && {price_from: pricefilterfrom}),
    };
    if (
      typefilter != 'All' ||
      roomfilter != 'All' ||
      pricefilterto != 'All' ||
      pricefilterfrom != 'All'
    ) {
      // console.log(obj, 'obj');

      getAllFilter(obj);
    }
  }, [typefilter, roomfilter, pricefilterto, pricefilterfrom]);

  const RenderItem = useCallback(
    item => {
      return <Item house={item} />;
    },
    [dataProducts],
  );
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
    // <ScrollView>
    <View
      resizeMode="cover"
      style={[styles.container, {backgroundColor: COLORS(isDark).dark}]}
      source={require('../assets/city.png')}>
      <StatusBar translucent backgroundColor="black" />

      <View style={styles.searchbox}>
        <TouchableOpacity
          style={{width: '80%', height: '100%'}}
          onPress={() => navigation.navigate('Search')}>
          <FirstInput
            text="Search by Name or Ref No. "
            disabled={true}
            Icon={
              <Feather
                name="search"
                style={{marginLeft: 5}}
                color={SCREEN.DARKGREY}
                size={20}
              />
            }
            width={130}
            height={42}
            bgcolor={'white'}
            fun={e => handleSearchChange(e)}
          />
        </TouchableOpacity>

        <View style={styles.orangeboxmain}>
          <TouchableOpacity onPress={() => navigation.navigate('Filtration')}>
            <View style={styles.orangebox}>
              <Image
                style={{height: '50%', width: '50%'}}
                source={require('../assets/filterwhite.png')}
              />
              {/* <Entypo name="chevron-right" color={'white'} size={30} /> */}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.orangeboxmain}>
          <TouchableOpacity
            onPress={() => navigation.navigate('FullMapFilter')}>
            <View style={styles.orangebox}>
              <Image
                style={{height: '55%', width: '50%'}}
                source={require('../assets/location.png')}
              />
              {/* <Entypo name="chevron-right" color={'white'} size={30} /> */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <>
        <FilterSection setdataProducts={setdataProducts} title={{title, id}} showPrice={false}/>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            width: SCREEN.WIDTH * 0.91,
            marginVertical: 3,
          }}>
          <Text style={styles.textGrey}>{dataProducts?.length} Flats</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            display: 'flex',
            // height: SCREEN.HEIGHT,
          }}>
          {isLoadingPagination ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                display: 'flex',
                height: SCREEN.HEIGHT,
              }}>
              <Spinner />
            </View>
          ) : dataProducts?.length > 0 ? (
            <FlatList
              snapToInterval={SCREEN.WIDTH - 20}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingVertical: 20}}
              vertical
              data={dataProducts}
              keyExtractor={ItemExtractorKey}
              // removeClippedSubviews={true}
              initialNumToRender={20} // Reduce initial render amount
              // maxToRenderPerBatch={1} // Reduce number in each render batch
              // updateCellsBatchingPeriod={100} // Increase time between renders
              // windowSize={7} // Reduce the window size
              renderItem={({item}) => RenderItem(item)}
              // onRefresh={onRefresh}
              // refreshing={refreshing}
              scrollEnabled={!isLoadingPagination}
              // onEndReached={loadMore}
              // onMomentumScrollStart={() => setcallOnEndReached(true)}
              onEndReached={() => {
                loadMore();
                // setcallOnEndReached(false);
              }}
              onEndReachedThreshold={0.2}
              ListFooterComponent={
                isLoadingPagination ? (
                  <Spinner />
                ) : (
                  <View
                    style={{
                      width: '100%',
                      height: 100,
                    }}></View>
                )
              }
            />
          ) : (
            <Text>No Data</Text>
          )}
          {/* {
             
          )} */}
        </View>
        {/* <View>
              <FlatList
                data={[0, 1, 1]}
                vertical
                showsHorizontalScrollIndicator={false}
                renderItem={Item}
                keyExtractor={item => item}
              />
            </View> */}
      </>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: SCREEN.WIDTH,
    // width: SCREEN.WIDTH * 0.91,

    position: 'relative',
    // marginBottom: 50,
    paddingTop: StatusBar.currentHeight + 10,
    backgroundColor: SCREEN.WHITE,
    alignSelf: 'center',
  },
  textGrey: {
    color: SCREEN.DARKGREY,
    fontSize: 14,
    marginHorizontal: 2,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    color: SCREEN.GREY,
  },
  text: {
    color: SCREEN.BLUE,
    fontSize: 12,
    fontWeight: 'bold',
  },
  outerbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    width: '90%',
    zIndex: 55,
    // height: '100%',
  },
  secondbox: {
    height: SCREEN.WIDTH * 0.775 * 0.185,
    width: SCREEN.WIDTH * 0.91,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderRadius: SCREEN.RADIUS * 0.5,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: SCREEN.WIDTH * 0.775 * 0.145 * 0.48,
    // overflow: 'hidden',
    width: '25%',
  },
  searchbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN.WIDTH * 0.92,
    marginVertical: 15,
  },
  orangeboxmain: {
    // width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  orangebox: {
    height: 45,
    width: 45,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  /**************************************** */
  searchouter: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    height: SCREEN.HEIGHT,
    alignItems: 'flex-start',
    width: '90%',
  },
  recent: {
    color: SCREEN.DARKGREY,
    fontWeight: 'bold',
    fontSize: 16,
  },
  flat: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  popularbox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  search2: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 15,
    width: '100%',
    flexWrap: 'wrap',
  },
  search3: {
    color: SCREEN.DARKGREY,
    fontWeight: 'bold',
    fontSize: 16,
  },
  search4: {
    color: SCREEN.BLUE,
    borderColor: SCREEN.BLUE,
    borderRadius: 8,
    borderWidth: 1,
    padding: 7,
    paddingHorizontal: 15,
    marginHorizontal: 3,
    marginVertical: 3,
  },
  search6: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  clearfilter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:"red"
    width: '90%',
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomColor: '#E8E8E8',
    borderWidth: 2,
    // alignSelf: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
    // textAlign: 'center',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  search7: {
    color: '#000000',
    marginHorizontal: 10,
    fontSize: 18,
    // fontWeight: 'bold',

    // paddingBottom: 15,
    // marginBottom: 15,
  },
  search8: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    borderColor: SCREEN.GREY,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    height: 50,
    marginVertical: 5,
  },
  searchcenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    borderColor: SCREEN.GREY,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 15,
    height: 50,
    marginVertical: 5,
  },
});
export default Houses;

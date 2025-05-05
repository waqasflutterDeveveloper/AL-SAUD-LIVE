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
import SCREEN from '../../../Layout';

import BottomSheet from '../Sheets/New_BottomSheet';
import {api} from '../../axios';
import {useSelector} from 'react-redux';
import {useFilterRoomsPriceTypesApi} from '../../apis/Home';
import {useDispatch} from 'react-redux';
import {setHomeData} from '../../Store/HomeData/HomeSlice';
import {COLORS} from '../../consts/colors';
import {setGlobalFilters} from '../../Store/Filters';

function Filter({setdataProducts, title,showPrice = true}) {
  const {data: FilterRoomsPriceTypesCall} = useFilterRoomsPriceTypesApi();
  const [FirstFilter, setFirstFilter] = useState(null);
  const {filteres} = useSelector(state => state.GlobalFilters);
  const {data: HomeData} = useSelector(state => state.Home);

  const [typefilter, settypefilter] = useState({'Type Name': 'All'});
  const [roomfilter, setroomfilter] = useState('All');
  const [pricefilter, setpricefilter] = useState('All');
  const [pricefilterfrom, setpricefilterfrom] = useState('All');
  const [pricefilterto, setpricefilterto] = useState('All');
  const {allFilters, types} = useSelector(state => state.HomeTypes);
  useEffect(() => {
    if (title) {
      setFirstFilter({'Type Name': title.title, id: title?.id});
      // settypefilter({'Type Name': title.title, id: title?.id});
    }
  }, [title]);
  const ResetFilter = filter => {
    // console.log({...filteres, ...filter}, '{...filteres, ...filter}');
    getAllFilter({...filteres, ...filter});
  };
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
  const HandleSelectedFilter = (type, value) => {
    if (type == 'flatfilter') {
      // console.log({...filteres, type_id: value.id}, 'length');
      // type: value
      settypefilter(value);
      dispatch(setGlobalFilters({...filteres, type: value, type_id: value.id}));
      handleCloseModal();
      getAllFilter({...filteres, type_id: value.id});
    } else if (type == 'roomsfilter') {
      setroomfilter(value);
      dispatch(setGlobalFilters({...filteres, room_no: value}));

      handleCloseModalroom();
      getAllFilter({...filteres, room_no: value});
    } else {
      const arr = value.split('-');
      setpricefilter(value);
      handleCloseModalPrice();
      setpricefilterto(arr[1]);

      setpricefilterfrom(arr[0]);
      dispatch(
        setGlobalFilters({...filteres, price_to: arr[1], price_from: arr[0]}),
      );
      getAllFilter({...filteres, price_to: arr[1], price_from: arr[0]});
    }
  };
  const dispatch = useDispatch();

  const getAllFilter = async data => {
    const res = await api.post('api/filter_properties', {
      params: data,
    });

    dispatch(setHomeData(res.data?.result));

    setdataProducts(res.data?.result);
  };
  useEffect(() => {
    dispatch(setGlobalFilters({...filteres, fromFilterScreen: false}));
  }, []);
  useEffect(() => {
    if (filteres?.fromFilterScreen) {
      getAllFilter(filteres);
    }
  }, [filteres]);
  const {isDark} = useSelector(state => state.Home);

  return (
    <View
      style={[
        styles.secondbox,
        {
          backgroundColor: COLORS(isDark).dark,
          borderColor: COLORS(isDark).greyForDark,
          borderWidth: 1,
        },
      ]}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => HandleOpenModal(refRB)}>
          <Text style={styles.text}>Type</Text>
          <View style={styles.textContainer}>
            <Text style={styles.textGrey}>
              {filteres?.type ? filteres?.type?.['Type Name'] : 'all'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <BottomSheet
        call={false}
        onPress={refRB}
        Item={null}
        Height={500}
        width={'25%'}
        Content={
          <View style={styles.search6}>
            <View style={styles.clearfilter}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    setGlobalFilters({
                      ...filteres,
                      type: null,
                      type_id: null,
                    }),
                  );
                  ResetFilter({type: null, type_id: null});
                  handleCloseModal();
                }}>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../assets/png/closeblack.png')}
                />
              </TouchableOpacity>
              <Text style={styles.search7}>Property Type</Text>
            </View>
            {types?.map(item => (
              <TouchableOpacity
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',

                  height: 50,
                  marginVertical: 5,
                }}
                onPress={() => HandleSelectedFilter('flatfilter', item)}>
                <View
                  style={{
                    ...styles.search8,
                    borderColor:
                      filteres?.type?.['Type Name'] == item['Type Name']
                        ? SCREEN.BLUE
                        : SCREEN.GREY,
                    backgroundColor:
                      filteres?.type?.['Type Name'] == item['Type Name']
                        ? '#FAFAFA'
                        : SCREEN.WHITE,
                  }}>
                  <Image
                    style={{height: 25, width: 25}}
                    source={{uri: `data:image/png;base64,${item?.Image}`}}
                  />
                  <Text
                    style={{
                      color: SCREEN.DARKGREY,
                      marginHorizontal: 10,
                      fontSize: 14,
                    }}>
                    {item['Type Name']}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            {/* <BasicBtn type="basic" text="Done" width={190} /> */}
          </View>
        }
      />
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => HandleOpenModal(RefRooms)}>
          <Text style={styles.text}>Rooms</Text>
          <View style={styles.textContainer}>
            <Text style={styles.textGrey}>
              {filteres?.room_no ? filteres?.room_no : 'All'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <BottomSheet
        call={false}
        onPress={RefRooms}
        Item={null}
        width={'25%'}
        Content={
          <View style={styles.search6}>
            <View style={styles.clearfilter}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(setGlobalFilters({...filteres, room_no: null}));
                  handleCloseModalroom();
                  ResetFilter({room_no: null});
                }}>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../assets/png/closeblack.png')}
                />
              </TouchableOpacity>
              <Text style={styles.search7}>Rooms Number</Text>
            </View>
            <ScrollView style={{width: '100%', marginBottom: 100}}>
              <View>
                {allFilters?.rooms?.map(item => (
                  <TouchableOpacity
                    onPress={() => HandleSelectedFilter('roomsfilter', item)}>
                    <View
                      style={{
                        ...styles.searchcenter,
                        borderColor:
                          filteres?.room_no == item ? SCREEN.BLUE : SCREEN.GREY,
                        backgroundColor:
                          filteres?.room_no == item ? '#FAFAFA' : SCREEN.WHITE,
                      }}>
                      <Text
                        style={{
                          color: SCREEN.DARKGREY,
                          marginHorizontal: 10,
                          fontSize: 14,
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}>
                        {item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* <BasicBtn type="basic" text="Done" width={190} /> */}
          </View>
        }
      />

      {showPrice && (
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => HandleOpenModal(RefPrice)}>
            <Text style={styles.text}>Price</Text>
            <View style={styles.textContainer}>
              <Text style={styles.textGrey}>
                {filteres?.price_from
                  ? `${filteres?.price_from} - ${filteres?.price_to}`
                  : 'all'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
{/*
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => HandleOpenModal(RefPrice)}>
          <Text style={styles.text}>Price</Text>
          <View style={styles.textContainer}>
            <Text style={styles.textGrey}>
              {filteres?.price_from
                ? `${filteres?.price_from} - ${filteres?.price_to}`
                : 'all'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
*/}
      <BottomSheet
        call={false}
        onPress={RefPrice}
        Item={null}
        width={'25%'}
        Content={
          <View style={styles.search6}>
            <View style={styles.clearfilter}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    setGlobalFilters({
                      ...filteres,
                      price_to: null,
                      price_from: null,
                    }),
                  );
                  ResetFilter({price_to: null, price_from: null});

                  handleCloseModalPrice();
                }}>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../assets/png/closeblack.png')}
                />
              </TouchableOpacity>
              <Text style={styles.search7}>Price</Text>
            </View>
            <ScrollView style={{width: '100%', marginBottom: 100}}>
              <View>
                {allFilters?.price?.map(item => (
                  <TouchableOpacity
                    onPress={() => HandleSelectedFilter('pricefilter', item)}>
                    <View
                      style={{
                        ...styles.searchcenter,
                        borderColor:
                          `${filteres?.price_from} - ${filteres?.price_to}` ==
                          item
                            ? SCREEN.BLUE
                            : SCREEN.GREY,
                        backgroundColor:
                          `${filteres?.price_from} - ${filteres?.price_to}` ==
                          item
                            ? '#FAFAFA'
                            : SCREEN.WHITE,
                      }}>
                      <Text
                        style={{
                          color: SCREEN.DARKGREY,
                          marginHorizontal: 10,
                          fontSize: 14,
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}>
                        {item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        }
      />

      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => {
            dispatch(
              setGlobalFilters({
                ...filteres,
                order_by: filteres?.order_by == `id asc` ? `id desc` : `id asc`,
              }),
            );
            setTimeout(() => {
              getAllFilter(filteres);
            }, 500);
          }}>
          <Image
            style={{width: 20, height: 20}}
            source={require('../../assets/arrow.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
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
    marginBottom: 10,
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
export default Filter;

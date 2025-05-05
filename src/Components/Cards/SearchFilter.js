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
import BottomSheet from '../Components/Sheets/New_BottomSheet';

import React, {useEffect, useRef, useState} from 'react';
import SCREEN from '../../Layout';
import {ImageBackground} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import FirstInput from '../Components/Inputs/FirstInput';
import LargeHomeCard from '../Components/Cards/LargeHomeCard';
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
} from '../apis/Home';
import {useSelector, useDispatch} from 'react-redux';
import {setHomeDetailedData} from '../Store/HomeData/HomeSlice';
import Skeleton from '../Components/Skeleton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Houses = ({route}) => {
  const {mutate: propertybytypeCall} = propertybytypeApi();
  const {mutate: propertybyprojectCall} = propertybyprojectApi();
  const {mutate: AllFilterCall} = useAllFilterApi();
  const {allFilters, types} = useSelector(state => state.HomeTypes);
  //

  const {type, id} = route.params;
  const IsFocused = useIsFocused();
  useEffect(() => {
    if (type && type == 'property_by_type') {
      propertybytypeCall({refreshing, id});
    } else if (type && type == 'property_by_project') {
      //
      propertybyprojectCall({id});
    }
  }, [type, IsFocused]);
  useEffect(() => {}, [allFilters]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = React.useState(null);

  const {mutate: searchCall} = usesearchApi();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchCall({text: search});
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const navigation = useNavigation();

  const refRB = useRef();
  const RefRooms = useRef();
  const RefPrice = useRef();
  const HandleOpenModal = ref => {
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

  const [typefilter, settypefilter] = useState({'Type Name': 'All'});
  const [roomfilter, setroomfilter] = useState('All');
  const [pricefilter, setpricefilter] = useState('All');
  const [pricefilterfrom, setpricefilterfrom] = useState(null);
  const [pricefilterto, setpricefilterto] = useState(null);

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

    const obj = {
      ...(typefilter?.['Type Name'] != 'All' && {type_id: typefilter?.id}),
      ...(roomfilter != 'All' && {room_no: roomfilter}),
      ...(pricefilterto != 'All' && {price_to: pricefilterto}),
      ...(pricefilterfrom != 'All' && {price_from: pricefilterfrom}),
    };
    AllFilterCall(obj);
  };

  return (
    <>
      <View style={styles.secondbox}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => HandleOpenModal(refRB)}>
            <Text style={styles.text}>Type</Text>
            <View style={styles.textContainer}>
              <Text style={styles.textGrey}>{typefilter?.['Type Name']}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <BottomSheet
          call={false}
          onPress={refRB}
          Item={null}
          width={'25%'}
          Content={
            <View style={styles.search6}>
              <Text style={styles.search7}>Property Type</Text>
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
                        typefilter['Type Name'] == item['Type Name']
                          ? SCREEN.BLUE
                          : SCREEN.GREY,
                      backgroundColor:
                        typefilter['Type Name'] == item['Type Name']
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
              <Text style={styles.textGrey}>{roomfilter}</Text>
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
              <Text style={styles.search7}>Rooms Number</Text>
              <ScrollView style={{width: '100%', marginBottom: 100}}>
                <View>
                  {allFilters?.rooms?.map(item => (
                    <TouchableOpacity
                      onPress={() => HandleSelectedFilter('roomsfilter', item)}>
                      <View
                        style={{
                          ...styles.searchcenter,
                          borderColor:
                            roomfilter == item ? SCREEN.BLUE : SCREEN.GREY,
                          backgroundColor:
                            roomfilter == item ? '#FAFAFA' : SCREEN.WHITE,
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
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => HandleOpenModal(RefPrice)}>
            <Text style={styles.text}>Price</Text>
            <View style={styles.textContainer}>
              <Text style={styles.textGrey}>{pricefilter}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <BottomSheet
          call={false}
          onPress={RefPrice}
          Item={null}
          width={'25%'}
          Content={
            <View style={styles.search6}>
              <Text style={styles.search7}>Price</Text>
              <ScrollView style={{width: '100%', marginBottom: 100}}>
                <View>
                  {allFilters?.price?.map(item => (
                    <TouchableOpacity
                      onPress={() => HandleSelectedFilter('pricefilter', item)}>
                      <View
                        style={{
                          ...styles.searchcenter,
                          borderColor:
                            pricefilter == item ? SCREEN.BLUE : SCREEN.GREY,
                          backgroundColor:
                            pricefilter == item ? '#FAFAFA' : SCREEN.WHITE,
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

        <View style={styles.imageContainer}>
          <Image
            style={{width: 20, height: 20}}
            source={require('../assets/arrow.png')}
          />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
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
});
export default Houses;

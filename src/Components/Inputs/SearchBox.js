import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import BottomSheet from '../Sheets/New_BottomSheet';
import {useNavigation} from '@react-navigation/native';
import FilterSection from '../Filtersection/index';
import React, {useEffect, useRef, useState} from 'react';
import FirstInput from './FirstInput';
import SCREEN from '../../../Layout';
import AntDesign from 'react-native-vector-icons/AntDesign';
import font from '../../consts/font';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {StatusBar} from 'native-base';
import {useAllFilterApi, useFilterRoomsPriceTypesApi} from '../../apis/Home';
const SearchBox = ({
  editable = true,
  onPress,
  title,
  value,
  onChangeText,
  color,
  styleInput,
  styleInputContainer,
  location = true,
  map = true,
  onFocus,
  onSubmitEditing,
  markdata,
  setmarkdata,
  settext,
}) => {
  const {allFilters, types} = useSelector(state => state.HomeTypes);
  const {data: FilterRoomsPriceTypesCall} = useFilterRoomsPriceTypesApi();
  const {mutate: AllFilterCall} = useAllFilterApi();
  const {data: HomeData} = useSelector(state => state.Home);
  let marks = [];
  const makeMarks = () => {
    for (let index = 0; index < HomeData.length; index++) {
      if (HomeData[index]?.location) {
        const arr = HomeData[index]?.location.split(',');
        // console.log(HomeData[index]?.location, 'locatiion', arr);
        // console.log();
        if (HomeData[index]?.location != 'Test location') {
          marks.push({
            latitude: arr[0],
            longitude: arr[1],
            _id: HomeData[index]?.id,
            name: HomeData[index]?.name,
            code: HomeData[index]?.code,
          });
        }
      }
    }
    setmarkdata(marks);
  };
  useEffect(() => {
    if (HomeData?.length > 0) {
      makeMarks();
    }
    if (HomeData?.length == 0) {
      setmarkdata([]);
    }
  }, [HomeData]);
  useEffect(() => {}, [markdata, HomeData]);

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

  const [typefilter, settypefilter] = useState('All');
  const [roomfilter, setroomfilter] = useState('All');
  const [pricefilter, setpricefilter] = useState(100);
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
      ...(typefilter != 'All' && {type_id: typefilter}),
      ...(roomfilter != 'All' && {room_no: roomfilter}),
      ...(pricefilterto != 'All' && {price_to: pricefilterto}),
      ...(pricefilterfrom != 'All' && {price_from: pricefilterfrom}),
    };
    AllFilterCall(obj);
  };
  const navigation = useNavigation();
  useEffect(() => {
    const obj = {
      ...(typefilter != 'All' && {type_id: typefilter}),
      ...(roomfilter != 'All' && {room_no: roomfilter}),
      ...(pricefilterto != 'All' && {price_to: pricefilterto}),
      ...(pricefilterfrom != 'All' && {price_from: pricefilterfrom}),
    };
    AllFilterCall(obj);
  }, []);
  return (
    <>
      <View style={styles.searchbox}>
        {location && (
          <View style={styles.orangeboxmain}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.orangebox}>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../assets/png/closeblack.png')}
                />
                {/* <Entypo name="chevron-right" color={'white'} size={30} /> */}
              </View>
            </TouchableOpacity>
          </View>
        )}
        <View
          // onPress={onPress}
          style={{
            flexDirection: 'row',
            borderRadius: 8,
            alignItems: 'center',
            paddingHorizontal: 10,
            marginHorizontal: 10,
            ...styleInputContainer,
            backgroundColor: 'white',
          }}>
          <AntDesign name="search1" color={'black'} size={12} />
          <TextInput
            style={{
              width: font.width * 0.55,
              paddingVertical: 8,
              fontSize: 11,
              color: 'black',
              ...styleInput,
              backgroundColor: 'white',
              borderRadius: 10,
            }}
            value={value}
            placeholderTextColor={SCREEN.DARKGREY}
            placeholder={title}
            onChangeText={value => onChangeText(value)}
            onSubmitEditing={e => onSubmitEditing(e)}
            underlineColorAndroid="transparent"
            editable={editable}
            onFocus={onFocus}
          />
        </View>
        {map && (
          <View style={styles.orangeboxmain}>
            <TouchableOpacity onPress={() => navigation.navigate('Filtration')}>
              <View style={styles.orangebox}>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../assets/png/filterblue.png')}
                />
                {/* <Entypo name="chevron-right" color={'white'} size={30} /> */}
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <FilterSection setdataProducts={() => {}} showPrice={false} />
    </>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  orangeboxmain: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orangebox: {
    height: 45,
    width: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  searchbox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: '100%',
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
    backgroundColor: 'white',
    borderRadius: SCREEN.RADIUS * 0.5,
    // display: 'none',
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

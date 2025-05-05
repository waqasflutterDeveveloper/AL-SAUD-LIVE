import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import CloseHeader from '../Components/CloseHeader';
import {COLORS} from '../consts/colors';
import ButtonGroup from '../Components/Filter/ButtonGroup';
import PropertyTypes from '../Components/Filter/PropertyTypes';
import PriceRange from '../Components/Filter/PriceRange';
import RentType from '../Components/Filter/RentType';
import Rooms from '../Components/Filter/Rooms';
import Bathrooms from '../Components/Filter/Bathrooms';
import Rating from '../Components/Filter/Rating';
import SquareMeter from '../Components/Filter/SquareMeter';
import City from '../Components/Filter/City';
import Area from '../Components/Filter/Area';
import Amenities from '../Components/Filter/Amenities';
import Skeleton from '../Components/Skeleton';
import {api} from '../axios';
import {useAllFilterApi, useFilterRoomsPriceTypesApi} from '../apis/Home';
import Footer from '../Components/Filter/Footer';
import {useNavigation, useRoute} from '@react-navigation/native';
import {setGlobalFilters} from '../Store/Filters';
import {useDispatch} from 'react-redux';

const FiltrationScreen = () => {
  const [selectedBtn, setSelectedBtn] = useState(1);
  const [selectedPropertyType, setSelectedPropertyType] = useState(1);
  const [selectedRentType, setSelectedRentType] = useState(0);
  const [selectedRooms, setSelectedRooms] = useState(4);
  const [selectedBathrooms, setSelectedBathrooms] = useState(4);
  const [selectedRating, setSelectedRating] = useState(3);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 0]);
  const [selectedSquareMeter, setSelectedSquareMeter] = useState(['', '']);
  const [amenities, setamenities] = useState(null);

  const [area, setArea] = useState(null);

  const [MinMaxPrice, setMinMaxPrice] = useState([0, 300]);
  const [RoomsOptions, setRoomsOptions] = useState([]);
  const [PropertyTypeOptions, setPropertyTypeOptions] = useState([]);
  const navigation = useNavigation();
  const {data, isLoading} = useFilterRoomsPriceTypesApi();
  const [selectedCity, setSelectedCity] = useState();

  const Reset = () => {
    setSelectedPropertyType(null);
    setSelectedRooms(null);
    setSelectedBathrooms(null);
    setSelectedRating(null);
    // setMinMaxPrice([0, 0]);
    // setSelectedSquareMeter(['', '']);
    // setMinMaxPrice([0, 0]);
    setSelectedCity(null);
    setArea(null);
    dispatch(setGlobalFilters({fromFilterScreen: true}));
    navigation.goBack();
  };

  const [Cities, setCities] = useState([]);
  const [areas, setareas] = useState([]);
  const allCities = async () => {
    const res = await api.post('/api/emirates_states_only', {});
    setCities(res.data.result);
  };
  const allAreas = async () => {
    const res = await api.post('/api/emirates_areas', {
      params: {
        state_id: selectedCity?.id,
      },
    });
    // console.log(res.data.result, 'res.data');

    setareas(res.data.result);
  };
  useEffect(() => {
    allCities();

    return () => {};
  }, []);
  useEffect(() => {
    if (Cities.length > 0) {
      allAreas();
    }
    return () => {};
  }, [selectedCity]);
  const route = useRoute();

  useEffect(() => {
    if (data?.data?.result) {
      if (data?.data?.result?.rooms?.length > 0) {
        const min = data?.data?.result?.price[0]?.split('-')[0].trim();
        const max = data?.data?.result?.price[
          data?.data?.result?.price?.length - 1
        ]
          ?.split('-')[1]
          .trim();
        setMinMaxPrice([0, 500000]);
        setSelectedPriceRange([0, 500000]);
        // console.log(max, min, 'minnn');
      }
      if (data?.data?.result?.rooms?.length > 0) {
        setRoomsOptions(data?.data?.result?.rooms);
      }
      if (data?.data?.result?.types?.length > 0) {
        setPropertyTypeOptions(data?.data?.result?.types);
      }
    }
  }, [data]);
  const {mutate: AllFilterCall} = useAllFilterApi();
  const dispatch = useDispatch();
  const Submit = async () => {
    function addKeyValueIfDefined(object, key, value) {
      if (value !== undefined && value !== null && value !== '') {
        object[key] = value;
      }
    }

    const result = {};

    addKeyValueIfDefined(result, 'price_from', `${selectedPriceRange[0]}`);
    addKeyValueIfDefined(result, 'price_to', `${selectedPriceRange[1]}`);
    addKeyValueIfDefined(result, 'room_no', selectedRooms);
    addKeyValueIfDefined(result, 'type_id', selectedPropertyType.id);
    addKeyValueIfDefined(result, 'state_id', selectedCity?.id);
    addKeyValueIfDefined(result, 'area_id', area?.id);
    addKeyValueIfDefined(result, 'bathroom_no', selectedBathrooms);
    addKeyValueIfDefined(result, 'amenities', amenities);
    addKeyValueIfDefined(result, 'square_from', selectedSquareMeter[0]);
    addKeyValueIfDefined(result, 'square_to', selectedSquareMeter[1]);
    addKeyValueIfDefined(result, 'rating', selectedRating);

    dispatch(setGlobalFilters({...result, fromFilterScreen: true}));

    // console.log(result, 'obj');
    AllFilterCall(result);
    navigation.navigate('houses', {type: 'none'});
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
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <CloseHeader title={'Filter Options'} />
        {/* <ButtonGroup
          selectedBtn={selectedBtn}
          setSelectedBtn={setSelectedBtn}
        /> */}
        {/* <PropertyTypes
          selectedPropertyType={selectedPropertyType}
          setSelectedPropertyType={setSelectedPropertyType}
          PropertyTypeOptions={PropertyTypeOptions}
        /> */}
        {/* <PriceRange
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          MinMaxPrice={MinMaxPrice}
        /> */}
        {/* <RentType
          selectedRentType={selectedRentType}
          setSelectedRentType={setSelectedRentType}
        /> */}
        <Rooms
          selectedRooms={selectedRooms}
          setSelectedRooms={setSelectedRooms}
          RoomsOptions={RoomsOptions}
        />
        {/* <Bathrooms
          selectedBathrooms={selectedBathrooms}
          setSelectedBathrooms={setSelectedBathrooms}
        />
        <Rating
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        /> */}
        {/* <SquareMeter
          selectedSquareMeter={selectedSquareMeter}
          setSelectedSquareMeter={setSelectedSquareMeter}
        /> */}
        <City
          selectedCity={selectedCity}
          data={Cities}
          setSelectedCity={setSelectedCity}
        />
        <Area area={area} data={areas} setArea={setArea} />
        {/* <Amenities setamenities={setamenities} amenities={amenities} /> */}
        <Footer Submit={Submit} Reset={Reset} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    paddingVertical: 25,
    backgroundColor: COLORS().white,
    flexGrow: 1,
  },
});

export default FiltrationScreen;

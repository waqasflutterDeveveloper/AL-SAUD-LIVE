import React, {useCallback, useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import RangeSlider from 'rn-range-slider';
import SelectBox from '../Components/Inputs/SelectBox';
import {COLORS} from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserInfoCard from '../Components/Cards/UserInfoCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BasicButton from '../Components/Buttons/BasicButton';
import Thumb from '../Components/Slider/Thumb';
import Rail from '../Components/Slider/Rail';
import RailSelected from '../Components/Slider/RailSelected';
import Label from '../Components/Slider/Label';
import Notch from '../Components/Slider/Notch';
import {api} from '../axios';
import {useNavigation} from '@react-navigation/native';
const {width} = Dimensions.get('screen');
import houses from '../consts/houses';
import {Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {setHomeData, setDontMakeAnotherCall} from '../Store/HomeData/HomeSlice';
import Header from '../Components/Header';
const FilterScreen = ({}) => {
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100000);
  const [room_no, setroom_no] = useState(0);
  const [Cities, setCities] = useState([]);
  const [areas, setareas] = useState([]);

  const [isLoading, setisLoading] = useState(false);
  const [isLoadingReset, setisLoadingReset] = useState(false);

  const [state_id, setstate_id] = useState(1);
  const [bath_id, setBath_id] = useState(1);
  const [bed_id, setBed_id] = useState(1);

  const [area_id, setarea_id] = useState(1);
  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
  const navigation = useNavigation();
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);
  const dispatch = useDispatch();

  const reset = async () => {
    setisLoadingReset(true);

    const res = await api.post('/api/generic/property.flat', {});

    dispatch(setHomeData(res.data.result));
    dispatch(setDontMakeAnotherCall(false));
    if (res) {
      setisLoadingReset(false);
    }
    navigation.navigate('HomeInstak');
  };
  const allCities = async () => {
    const res = await api.post('/api/emirates_states_only', {});
    setCities(res.data.result);
  };
  const allAreas = async () => {
    const res = await api.post('/api/emirates_areas', {
      params: {
        state_id: state_id,
      },
    });

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
  }, [state_id]);

  const getFilters = async () => {
    setisLoading(true);
    const res = await api.post('/api/filter_properties', {
      params: {
        price_to: high,
        price_from: low,
        room_no: bed_id,
        state_id: state_id,
        area_id: area_id,
        bathroom_no: bath_id,
      },
    });
    //
    if (res) {
      setisLoading(false);
    }
    // dispatch(setHomeData(res.data.result));
    // dispatch(setDontMakeAnotherCall(true));

    navigation.navigate('HomeDataFilter', {Data: res.data.result});
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS().white,
        flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'center',
      }}>
      {/* Customise status bar */}
      <StatusBar
        translucent={false}
        backgroundColor={COLORS().backgroundblue}
        barStyle="dark-content"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              marginHorizontal: 20,
            }}>
            <SelectBox
              data={Cities}
              Type="Select City"
              settype={setstate_id}
              title={'city'}
            />

            <SelectBox
              data={areas}
              title={'Area'}
              Type="Select Area"
              settype={setarea_id}
            />

            {/* <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 20,
                marginBottom: 10,
                color: COLORS().dark,
              }}>
              Type
            </Text> */}
            {/* <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                maxWidth: width - 20,
              }}>
              <Text
                style={{
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: COLORS().backgroundblue,
                  color: COLORS().blue,
                  width: 120,
                  borderColor: '#185894',
                  fontWeight: 'bold',
                  borderWidth: 2,
                  marginHorizontal: 5,
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  alignContent: 'center',
                }}>
                <Icon name="home-outline" size={20} color="#185894" />
                <Text>Apartment</Text>
              </Text>
              <Text
                style={{
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: COLORS().white,
                  color: COLORS().dark,
                  borderColor: COLORS().grey,
                  fontWeight: 'bold',
                  borderWidth: 1,
                  marginHorizontal: 5,
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  alignContent: 'center',
                }}>
                <Icon name="home-outline" size={20} color={COLORS().dark} />
                <Text>House</Text>
              </Text>
              <Text
                style={{
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: COLORS().white,
                  color: COLORS().dark,
                  borderColor: COLORS().grey,
                  fontWeight: 'bold',
                  borderWidth: 1,
                  marginHorizontal: 5,
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  alignContent: 'center',
                }}>
                <Fontisto
                  name="holiday-village"
                  size={20}
                  color={COLORS().dark}
                />
                <Text>Villa</Text>
              </Text>
            </View> */}
            <View
              style={{
                padding: 15,
                borderRadius: 10,
                backgroundColor: COLORS().backgroundblue,
                color: COLORS().dark,
                borderColor: COLORS().backgroundblue,
                fontWeight: 'bold',
                borderWidth: 1,
                marginHorizontal: 5,
                marginTop: 20,
                textAlign: 'center',
                display: 'flex',
                //   justifyContent: 'center',
                //   alignItems: 'center',
                //   alignSelf: 'center',
                //   alignContent: 'center',
              }}>
              {/* <Text
                style={{
                  fontWeight: 'bold',
                  color: COLORS().dark,
                  fontSize: 15,
                  // marginBottom: 20,
                }}>
                Price Range
              </Text> */}
              {/* <RangeSlider
                style={style.slider}
                min={0}
                max={100000}
                step={1}
                floatingLabel
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                renderLabel={renderLabel}
                renderNotch={renderNotch}
                onValueChanged={handleValueChange}
              /> */}
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 15,
                }}>
                {/* <TextInput
                  editable
                  multiline
                  numberOfLines={1}
                  maxLength={40}
                  keyboardType="numeric"
                  onChangeText={text => setLow(text)}
                  value={low}
                  placeholder={'From'}
                  style={{
                    marginHorizontal: 5,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS().white,
                    color: COLORS().dark,
                    width: '50%',

                    fontWeight: 'bold',
                  }}
                />
                <TextInput
                  editable
                  multiline
                  numberOfLines={1}
                  maxLength={40}
                  keyboardType="numeric"
                  onChangeText={text => setHigh(text)}
                  value={high}
                  placeholder={'To'}
                  style={{
                    marginHorizontal: 5,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS().white,
                    color: COLORS().dark,
                    width: '50%',

                    fontWeight: 'bold',
                  }}
                /> */}
              </View>
            </View>
            {/* <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 20,
                marginBottom: 10,
                color: COLORS().dark,
              }}>
              Neighborhood
            </Text> */}
            {/* <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: COLORS().backgroundblue,
                  color: COLORS().blue,
                  width: 120,
                  borderColor: '#185894',
                  fontWeight: 'bold',
                  borderWidth: 2,
                  marginHorizontal: 5,
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  alignContent: 'center',
                }}>
                Jumeirah
              </Text>
              <Text
                style={{
                  marginHorizontal: 5,
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: COLORS().white,
                  color: COLORS().blue,
                  width: 120,
                  borderColor: COLORS().grey,
                  fontWeight: 'bold',
                  borderWidth: 1,
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  alignContent: 'center',
                }}>
                Dubai Marina
              </Text>
            </View> */}

            <SelectBox
              title={'Bedrooms'}
              data={[
                {id: 1, name: '+1'},
                {id: 2, name: '+2'},
                {id: 3, name: '+3'},
                {id: 4, name: '+4'},
                {id: 5, name: '+5'},
                {id: 6, name: '+6'},
                {id: 7, name: '+7'},
              ]}
              Type="Select Bedrooms"
              settype={setBed_id}
            />

            <SelectBox
              title={'Bathrooms'}
              data={[
                {id: 1, name: '+1'},
                {id: 2, name: '+2'},
                {id: 3, name: '+3'},
                {id: 4, name: '+4'},
                {id: 5, name: '+5'},
                {id: 6, name: '+6'},
                {id: 7, name: '+7'},
              ]}
              Type="Select Bathrooms"
              settype={setBath_id}
            />

            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexDirection: 'row',
              }}>
              <BasicButton
                styleText={{fontSize: 15}}
                height={50}
                text={
                  isLoadingReset ? (
                    <ActivityIndicator size="large" color="white" />
                  ) : (
                    'Reset'
                  )
                }
                width={250}
                onPress={() => {
                  //
                  reset();
                }}
                type="filter"
                color={COLORS().blue}
              />
              <BasicButton
                styleText={{fontSize: 15}}
                text={
                  isLoading ? (
                    <ActivityIndicator size="large" color="white" />
                  ) : (
                    'Apply'
                  )
                }
                height={50}
                width={250}
                onPress={() => {
                  //
                  getFilters();
                  // navigation.navigate('HomeInstak');
                }}
                type="filter"
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
export default FilterScreen;

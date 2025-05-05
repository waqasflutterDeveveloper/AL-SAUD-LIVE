import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import styles from './styles';
import LargeCadList from '../../Components/Lists/LargeCardList';
import {COLORS} from '../../consts/colors';
import Header from '../../Components/Header';
import SearchInput from '../../Components/Inputs/SearchInput';
import font from '../../consts/font';
import BasicBtn from '../../Components/Buttons/BasicButton';
import BottomSheet from '../../Components/Sheets/New_BottomSheet';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

import SearchCategory from '../../Components/Cards/SearchCategory';
import SCREEN from '../../../Layout';
import RecentCardList from '../../Components/Lists/RecentCardList';
import PopularCardList from '../../Components/Lists/PopularCardList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {usesearchApi} from '../../apis/Home/index';
import {log} from 'react-native-reanimated';
import {api} from '../../axios';
import FilterSection from '../../Components/Filtersection/index';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Spinner from '../../Components/Spinner';
import {useIsFocused} from '@react-navigation/native';
import {setGlobalFilters} from '../../Store/Filters';

const SearchScreen = ({navigation}) => {
  const searchData = useSelector(state => state.Home.search);
  const refRB = useRef();
  const HandleOpenModal = () => {
    //
    refRB.current.open();
  };
  const {isDark} = useSelector(state => state.Home);

  const [text, settext] = useState(false);
  const [recentSearch, setrecentSearch] = useState([]);
  const {mutate: searchapiCall, isLoading} = usesearchApi();
  const onChangeText = e => {
    settext(e);
  };
  const [activeInput, setActiveInput] = useState(false);

  const [dataProducts, setdataProducts] = useState([]);

  const onSubmitEditing = async e => {
    const recents = await AsyncStorage.getItem('recentSearch');
    const parsed = JSON.parse(recents);

    let keywords = [];
    if (parsed) {
      keywords = parsed;
    }
    keywords.push(text);
    //

    await AsyncStorage.setItem('recentSearch', JSON.stringify(keywords));
    searchapiCall({text});
    setActiveInput(false);
  };
  const [PopularSearch, setPopularSearch] = useState([]);
  const getPopularSearch = async () => {
    const res = await api.post('api/popular_search', {});
    setPopularSearch(res?.data?.result);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('tesssssssssst');
    dispatch(
      setGlobalFilters({
        price_to: null,
        price_from: null,
        type: null,
        type_id: null,
      }),
    );
  }, []);

  useEffect(async () => {
    getPopularSearch();
    const recents = await AsyncStorage.getItem('recentSearch');
    const parsed = JSON.parse(recents);
    setrecentSearch(parsed);
  }, []);
  const clearRecentSearch = async () => {
    const recents = await AsyncStorage.removeItem('recentSearch');
    setrecentSearch([]);
  };
  const callApiWhenClick = async e => {
    settext(e);

    searchapiCall({text: e});
    setActiveInput(false);
  };
  useEffect(() => {
    if (searchData?.length > 0) {
      setdataProducts(searchData);
    }
  }, [searchData]);
  // useEffect(() => {
  //   console.log(text, searchData, 'texxxxt');

  //   onSubmitEditing();
  // }, [text]);

  // const isFocused = useIsFocused();
  // useEffect(() => {
  //   setdataProducts([]);
  // }, [isFocused]);

  return (
    <SafeAreaView
      style={{
        marginTop: StatusBar.currentHeight,
        backgroundColor: COLORS(isDark).cardForDark,
      }}>

      <StatusBar translucent backgroundColor="black" />

      <Header
        display={
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              // marginBottom: 30,
              // backgroundColor: 'blue',
            }}>
            <Icon
              name="chevron-back"
              size={20}
              color={'black'}
              // style={styles.back}
            />
            <SearchInput
              styleInputContainer={{backgroundColor: COLORS().bgInput}}
              styleInput={{width: font.width * 0.45}}
              title={'Search by Name or Ref No... '}
              onFocus={() => setActiveInput(true)}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitEditing}
              value={text}
            />
          </View>
        }
      />
      {activeInput ? (
        <>
          <RecentCardList
            settext={callApiWhenClick}
            data={recentSearch}
            onPress={clearRecentSearch}
            title={'Recent Search'}
          />
          <PopularCardList
            settext={callApiWhenClick}
            data={PopularSearch.filter(item => item.name)}
            title={'Popular Searches'}
          />
        </>
      ) : (
        <>
          {isLoading ? (
            <Spinner />
          ) : (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 30,
                width: '100%',
                marginTop: 10,
                backgroundColor: COLORS(isDark).cardForDark,
              }}>
              <LargeCadList
                data={dataProducts}
                navigation={navigation}
                ListHeaderComponent={
                  <FilterSection setdataProducts={setdataProducts} showPrice={false}/>
                }
                horizontal={false}
                ListFooterComponent={() => (
                  <View
                    style={{
                      height: 300,
                      width: '100%',
                      // backgroundColor: 'red',
                    }}></View>
                )}
              />
            </View>
          )}
        </>
      )}

      <View style={styles.down} />
    </SafeAreaView>
  );
};

export default SearchScreen;

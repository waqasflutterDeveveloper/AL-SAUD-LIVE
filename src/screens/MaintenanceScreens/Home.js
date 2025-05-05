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
import {COLORS} from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeTopCard from '../../Components/Cards/HomeTopCard';
import {useDispatch, useSelector} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('screen');
import houses from '../../consts/houses';
import {
  RecommendPropertiesApi,
  UpcommingVisitApi,
  useHomeApi,
  useHomeProjectsApi,
  useHomeTypesApi,
} from '../../apis/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Skeleton from '../../Components/Skeleton';
import {setHomeDetailedData} from '../../Store/HomeData/HomeSlice';
import SmallCadList from '../../Components/Lists/SmallCadList';
import MediumCadList from '../../Components/Lists/MediumCadList';
import MaintenanceNavDesign from '../../Components/Navigation/MaintenanceNavDesign';
import LargeCadList from '../../Components/Lists/LargeCardList';
import UpcommingVisitCard from '../../Components/Cards/UpcommingVisitCard';
import font from '../../consts/font';
// import font from '../consts/font';

const HomeScreen = ({route}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  // const {data, isLoading} = useHomeApi(refreshing);
  const [AllLoved, setAllLoved] = useState([]);

  const [dummy, setDummy] = useState([
    {
      id: 1,
      title: 'Project',
      image: 'https://static.thenounproject.com/png/2085889-200.png',
      dec: '55 Projects',
      bg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Burj_Khalifa_2021.jpg/1200px-Burj_Khalifa_2021.jpg',
    },
    {
      id: 2,

      title: 'Project',
      image: 'https://static.thenounproject.com/png/2085889-200.png',
      dec: '55 Projects',
      bg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Burj_Khalifa_2021.jpg/1200px-Burj_Khalifa_2021.jpg',
    },
    {
      id: 3,

      title: 'Project',
      image: 'https://static.thenounproject.com/png/2085889-200.png',
      dec: '55 Projects',
      bg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Burj_Khalifa_2021.jpg/1200px-Burj_Khalifa_2021.jpg',
    },
    {
      id: 4,

      title: 'Project',
      image: 'https://static.thenounproject.com/png/2085889-200.png',
      dec: '55 Projects',
      bg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Burj_Khalifa_2021.jpg/1200px-Burj_Khalifa_2021.jpg',
    },
  ]);
  const {userInfo} = useSelector(state => state.userinfo);
  const {
    data: HomeData,
    upcomingVisits,
    recommend_properties,
  } = useSelector(state => state.Home);
  const Homeprojects = useSelector(state => state.HomeProjects.projects);
  const HomeTypes = useSelector(state => state.HomeTypes.types);

  const {DontMakeAnotherCall} = useSelector(state => state.Home);
  const {data: Homeprojectsapi, isLoading: isLoadingHome} =
    useHomeProjectsApi();
  const {data: HomeTypesapi, isLoading: isLoadingTypes} = useHomeTypesApi();

  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    //
  }, [Homeprojects]);
  const handleHomeClick = house => {
    dispatch(setHomeDetailedData(house));
    // navigation.navigate('DetailsScreenInStack');
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const {mutate: UpcommingVisitCall} = UpcommingVisitApi();
  const {mutate: RecommendPropertiesCall} = RecommendPropertiesApi();

  useEffect(() => {
    RecommendPropertiesCall();
  }, []);
  useEffect(() => {
    if (userInfo?.partner_id) {
      UpcommingVisitCall(userInfo?.partner_id);
    }
  }, [userInfo]);
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS().white,
        flex: 1,
        height: '100%',
      }}>
      <ScrollView>
        <HomeTopCard user={userInfo} />
        {userInfo && upcomingVisits?.length > 0 && (
          <View style={style.margin}>
            <Text style={style.headText}>Upcoming visits</Text>
            <UpcommingVisitCard data={upcomingVisits} />
          </View>
        )}
        {isLoadingHome || isLoadingTypes ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <>
            <SmallCadList data={HomeTypes} />
            {Homeprojects?.length > 0 && (
              <MediumCadList data={Homeprojects} headText={'Popular Areas'} />
            )}
            {recommend_properties?.length > 0 && (
              <LargeCadList
                data={recommend_properties}
                headText={'Recommended'}
              />
            )}

            <View style={style.down} />
          </>
        )}
      </ScrollView>

      <MaintenanceNavDesign navigation={navigation} index={0} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  margin: {
    marginVertical: 15,
  },
  container: {marginHorizontal: 20},
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
  headText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS().black,
    marginVertical: 15,
    marginHorizontal: 15,
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
  down: {height: font.height * 0.18},
});
export default HomeScreen;

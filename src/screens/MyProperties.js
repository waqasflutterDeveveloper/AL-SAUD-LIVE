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
} from 'react-native';
import {COLORS} from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropertyCard from '../Components/Cards/PropertyCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Skeleton from '../Components/Skeleton';

const {width} = Dimensions.get('screen');
import houses from '../consts/houses';
import {useMyPropertyApi} from '../apis/Home';
import NewNavDesign from '../Components/Navigation/NewNavDesign';
import Header from '../Components/Header';
import font from '../consts/font';
import Spinner from '../Components/Spinner';
import {useLanguage} from '../Helpers/LanguageContext';
import {arTranslations} from '../translations/ar';
import {enTranslations} from '../translations/en';

const MyProperties = ({}) => {
  const {isDark} = useSelector(state => state.Home);

  const navigation = useNavigation();
  const {mutate: GetmyProp, isLoading} = useMyPropertyApi();
  const userInfo = useSelector(state => state.userinfo.userInfo);
  const IsFocused = useIsFocused();
  const MyPropertiesData = useSelector(
    state => state.MyProperties.myproperties,
  );
  useEffect(() => {
    GetmyProp({partner_id: userInfo?.partner_id});
    return () => {};
  }, [userInfo, IsFocused]);

  const [data, setData] = useState([
    {
      name: 'Flat/SNA - 101 Block B view',
      project_id: {name: 'hello'},
      code: '122',
      contract: {
        total_value: 10,
        rent_period_type: 2,
        date_to: '10/2/2',
        id: 10,
      },
    },
  ]);
  const {language, switchLanguage} = useLanguage();

  const translations = language === 'ar' ? arTranslations : enTranslations;
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS(isDark).dark,
        flex: 1,
      }}>
      {/* Customise status bar */}
      <StatusBar
        translucent={true}
        backgroundColor={COLORS().white}
        barStyle="dark-content"
      />
      <Header title={translations['My Properties']} />
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          snapToInterval={width - 20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{marginVertical: 10, marginHorizontal: 10}}
          vertical
          data={MyPropertiesData}
          renderItem={({item}) => <PropertyCard navigate={true} item={item} />}
          ListFooterComponent={() => <View style={style.down} />}
        />
      )}

      {/* <NewNavDesign navigation={navigation} index={2} /> */}
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
  down: {height: font.height * 0.07},
});
export default MyProperties;

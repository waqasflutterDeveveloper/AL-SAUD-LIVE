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
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NewBottomSheet from '../Components/Sheets/NewBottomSheet';
import Spinner from '../Components/Spinner';
import MaintenanceCard from '../Components/Cards/MaintenanceCard';

import {COLORS} from '../consts/colors';
import BasicButton from '../Components/Buttons/BasicButton';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const {width} = Dimensions.get('screen');
import {useMaintianenceApi, useMyPropertyApi} from '../apis/Home';
import NewNavDesign from '../Components/Navigation/NewNavDesign';
import Header from '../Components/Header';
import font from '../consts/font';
import {SCREEN_HEIGHT} from '@gorhom/bottom-sheet';

const AllMaintenances = ({route}) => {
  const {isDark} = useSelector(state => state.Home);

  const navigation = useNavigation();
  const {mutate: MaintianenceApi, isLoading} = useMaintianenceApi();
  const IsFocused = useIsFocused();
  const [disable, setdisable] = useState(false);
  const {hasLegalCase} = route.params;
  console.log(hasLegalCase, 'hasLegalCase');
  const userInfo = useSelector(state => state.userinfo.userInfo);
  const selectedProp = useSelector(state => state.MyProperties.selectedProp);
  const {Maintainence} = useSelector(state => state.Maintainence);
  const [MaintainenceSelceted, setMaintainenceSelceted] = useState({});
  useEffect(() => {
    MaintianenceApi({
      partner_type:
        'tenant' || userInfo?.partner[0].is_tenant ? 'tenant' : 'owner',
      partner: userInfo.partner_id,
      flat: selectedProp.id,
    });

    return () => {};
  }, [IsFocused]);
  // console.log(Maintainence?.[0]?.attachments, 'Maintainence');
  const [openModal, setOpenModal] = useState(false);
  const sheetRef = React.useRef(null);
  const handleNavigation = item => {
    navigation.navigate('MaintenanceDetails', {
      MaintainenceSelceted: item,
      hasLegalCase,
    });
  };
  const handleCloseModal = () => {
    sheetRef.current.snapTo(2);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS(isDark).cardForDark,
        flex: 1,
      }}>
      {/* Customise status bar */}
      <StatusBar
        translucent={true}
        backgroundColor={COLORS().white}
        barStyle="dark-content"
      />
      <Header title={' Maintianences'} back />
      {console.log(hasLegalCase, 'hasLegalCase')}
      {hasLegalCase || Maintainence.length == 0 ? (
        <View
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            style={{width: 100, margin: 10}}
            onPress={() => {
              navigation.navigate('CreateRequestScreen');
              setdisable(true);
              setTimeout(() => {
                setdisable(false);
              }, 1000);
            }}>
            <View
              style={{
                backgroundColor: COLORS().red,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5,
              }}>
              <AntDesign color={COLORS().white} size={22} name="plus" />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      <ScrollView
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          display: 'flex',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            display: 'flex',
          }}>
          {isLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                display: 'flex',
                height: SCREEN_HEIGHT,
              }}>
              <Spinner />
            </View>
          ) : Maintainence && Maintainence.length > 0 ? (
            <FlatList
              snapToInterval={width - 20}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                marginTop: 10,
              }}
              vertical
              ListFooterComponent={
                <View style={{marginBottom: 60, width: '100%'}}></View>
              }
              data={Maintainence}
              renderItem={({item}) => (
                <MaintenanceCard
                  openModal={openModal}
                  item={item}
                  hasLegalCase={hasLegalCase}
                  setOpenModal={setOpenModal}
                  setMaintainenceSelceted={setMaintainenceSelceted}
                  handleNavigation={() => handleNavigation(item)}
                  MaintainenceSelceted={MaintainenceSelceted}
                />
              )}
            />
          ) : (
            <Text style={{color: 'black', fontWeight: 'bold'}}>No Data</Text>
          )}

          {/* <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
            }}>
            <NewBottomSheet
              openModal={openModal}
              setOpenModal={setOpenModal}
              sheetRef={sheetRef}
              handleCloseModal={handleCloseModal}
              MaintainenceSelceted={MaintainenceSelceted}
            />
          </View> */}
        </View>
      </ScrollView>
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
export default AllMaintenances;

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
import AntDesign from 'react-native-vector-icons/AntDesign';
import NewBottomSheet from '../Components/Sheets/NewBottomSheet';
import Spinner from '../Components/Spinner';
import MaintenanceCard from '../Components/Cards/MaintenanceCard';
import MiniPaymentCard from '../Components/Cards/MiniPaymentCard';

import {COLORS} from '../consts/colors';
import BasicButton from '../Components/Buttons/BasicButton';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const {width} = Dimensions.get('screen');
import {
  useMaintianenceApi,
  useMyPropertyApi,
  usePaymentsForTenantApi,
} from '../apis/Home';
import NewNavDesign from '../Components/Navigation/NewNavDesign';
import Header from '../Components/Header';
import font from '../consts/font';
import {useLanguage} from '../Helpers/LanguageContext';
import {arTranslations} from '../translations/ar';
import {enTranslations} from '../translations/en';

const AllPayments = ({route}) => {
  const navigation = useNavigation();
  const userInfo = useSelector(state => state.userinfo.userInfo);
  const {hasLegalCase} = route.params;
  const selectedProp = useSelector(state => state.MyProperties.selectedProp);
  const {mutate: PaymentsForTenantApi, isLoading} = usePaymentsForTenantApi();
  const {Payments} = useSelector(state => state.Payments);
  useEffect(() => {
    PaymentsForTenantApi({
      partner_type:
        'tenant' || userInfo?.partner[0].is_tenant ? 'tenant' : 'owner',
      partner: userInfo.partner_id,
      flat: selectedProp.id,
    });

    return () => {};
  }, []);
  const [paidCount, setpaidCount] = useState(null);
  //
  const [upcommingCount, setupcommingCount] = useState(null);

  useEffect(() => {
    const count = Payments?.filter(element => {
      if (
        element.state == 'posted' ||
        (element.state != 'posted' && element?.amount == 0)
      ) {
        return true;
      }

      return false;
    }).length;
    setpaidCount(count);
    const countUpcomming = Payments?.filter(element => {
      if (
        element.state != 'posted' &&
        element?.amount > 0 &&
        element.state != 'draft'
      ) {
        return true;
      }

      return false;
    }).length;
    setupcommingCount(countUpcomming);
  }, [Payments]);
  const {language, switchLanguage} = useLanguage();
  const translations = language === 'ar' ? arTranslations : enTranslations;
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS().white,
        flex: 1,
      }}>
      {/* Customise status bar */}
      <StatusBar
        translucent={true}
        backgroundColor={COLORS().white}
        barStyle="dark-content"
      />
      <Header title={' All Payments'} back />
      <>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            // display: 'flex',
          }}>
          {isLoading ? (
            <Spinner />
          ) : Payments?.length > 0 ? (
            <ScrollView contentContainerStyle={styles.row}>
              <MiniPaymentCard
                image={require('../assets/png/calnder_blue.png')}
                title="Upcoming Payments"
                index={0}
                hasLegalCase={hasLegalCase}
                contract={null}
                text={`${upcommingCount} payments`}
              />
              <MiniPaymentCard
                image={require('../assets/png/righttik.png')}
                title="Paid Payments"
                text={`${paidCount} payments`}
                contract={null}
                hasLegalCase={hasLegalCase}
                index={1}
              />
            </ScrollView>
          ) : (
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              {' '}
              {translations['No Data']}
            </Text>
          )}
        </View>
      </>

      {/* <NewNavDesign navigation={navigation} index={2} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    marginTop: 0,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS().light,
    marginHorizontal: 15,
    borderRadius: 8,
    // paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AllPayments;

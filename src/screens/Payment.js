import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import PropertyCard from '../Components/Cards/PropertyCard';
import Header from '../Components/Header';
import {COLORS} from '../consts/colors';

import Tabs from './Tabs/index';
import {useLanguage} from '../Helpers/LanguageContext';
import {arTranslations} from '../translations/ar';
import {enTranslations} from '../translations/en';
import ContractCard from '../Components/Cards/ContractCard';
import Spinner from '../Components/Spinner';
import axios from 'axios';
const {width} = Dimensions.get('screen');

const PaymentScreen = ({route, navigation}) => {
  // const selectedProp = useSelector(state => state.MyProperties.selectedProp);

  const {item, parent} = route.params;
  const {isDark} = useSelector(state => state.Home);
  const {language, switchLanguage} = useLanguage();
  const translations = language === 'ar' ? arTranslations : enTranslations;
  const [notificationData, setNotificationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    if (route?.params?.id) {
      setIsLoading(true);

      try {
        const res = await axios.post(
          `https://odooerp-ae-property.odoo.com/api/get_contract_details/${route?.params?.id}`,
          {},
        );
        // console.log(res?.data?.result[0], 'res');
        setNotificationData(res.data.result[0]);
        setIsLoading(false);
      } catch (error) {
        // console.log(error, 'error');
      }

      // console.log(route?.params?.id, 'route?.params?.id');
    }
  }, [route?.params?.id]);
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS(isDark).white,
        flex: 1,
        justifyContent: 'center',
      }}>
      {isLoading ? (
        <Spinner />
      ) : (
        <ScrollView>
          <StatusBar
            translucent={true}
            backgroundColor={COLORS().white}
            barStyle="dark-content"
          />
          <Header back title={translations['Property Details']} />
          {/* <PropertyCard item={parent} /> */}
          {/* {console.log(item, 'contract')} */}
          <ContractCard
            navigate={true}
            parent={parent}
            item={notificationData ? notificationData?.contracts?.[0] : item}
          />
          <View style={{height: 500, marginVertical: 20}}>
            <Tabs
              index={route?.params?.index ? route?.params?.index : 1}
              contract={
                notificationData
                  ? notificationData?.contracts?.[0]?.id
                  : item?.id
              }
              isDark={isDark}
              item={notificationData ? notificationData?.contracts?.[0] : item}
            />
          </View>

          <View style={style.down} />
        </ScrollView>
      )}

      {/* */}
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
  down: {height: 20},
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
export default PaymentScreen;

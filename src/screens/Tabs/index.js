import React, {useRef, useState, useEffect} from 'react';

import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Text,
  Button,
  FlatList,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../consts/colors';
const {width} = Dimensions.get('screen');
import houses from '../../consts/houses';
import MaintenanceCard from '../../Components/Cards/MaintenanceCard';
import BasicButton from '../../Components/Buttons/BasicButton';
import DocumentCard from '../../Components/Cards/DocumentCard';
import BottomSheet from '../../Components/Sheets/BottomSheet';
import {useNavigation} from '@react-navigation/native';
import NewBottomSheet from '../../Components/Sheets/NewBottomSheet';
import {
  useGetContractDocument,
  useMaintianenceApi,
  usePaymentsForTenantApi,
} from '../../apis/Home';

import {useIsFocused} from '@react-navigation/native';

import {useSelector} from 'react-redux';
import Spinner from '../../Components/Spinner';
import MiniPaymentCard from '../../Components/Cards/MiniPaymentCard';
import CommonCard from '../../Components/Cards/DocumentsCards/commonCard';
import {useLanguage} from '../../Helpers/LanguageContext';
import {arTranslations} from '../../translations/ar';
import {enTranslations} from '../../translations/en';
const FirstRoute = props => {
  // console.log(props.route, 'propsssss');
  const userInfo = useSelector(state => state.userinfo.userInfo);
  const selectedProp = useSelector(state => state.MyProperties.selectedProp);
  const {mutate: PaymentsForTenantApi, isLoading} = usePaymentsForTenantApi();
  const {Payments} = useSelector(state => state.Payments);

  useEffect(() => {
    PaymentsForTenantApi({
      partner_type:
        'tenant' || userInfo?.partner[0].is_tenant ? 'tenant' : 'owner',
      partner: userInfo.partner_id,
      flat: selectedProp?.id,
      contract: props?.route?.contract,
    });

    return () => {};
  }, []);
  const [paidCount, setpaidCount] = useState(null);
  //
  const [upcommingCount, setupcommingCount] = useState(null);

  useEffect(() => {
    // console.log(Payments, 'Payments');
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
            {/* <FlatList
              snapToInterval={width - 20}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginVertical: 10, marginHorizontal: 10}}
              vertical
              data={Payments} // dummy
              renderItem={({item}) => <PaymentCard Item={item} />}
            /> */}
            <MiniPaymentCard
              image={require('../../assets/png/calnder_blue.png')}
              title={translations['Upcoming Payments']}
              index={0}
              contract={props?.route?.contract}
              text={`${upcommingCount} payments`}
            />
            <MiniPaymentCard
              image={require('../../assets/png/righttik.png')}
              title={translations['Paid Payments']}
              text={`${paidCount} payments`}
              contract={props?.route?.contract}
              index={1}
            />
          </ScrollView>
        ) : (
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            {translations['No Data']}
          </Text>
        )}
      </View>
    </>
  );
};

const ThirdRoute = props => {
  const refRBSheet = useRef();
  const selectedProp = useSelector(state => state.MyProperties.selectedProp);
  const {language, switchLanguage} = useLanguage();
  const translations = language === 'ar' ? arTranslations : enTranslations;
  const {item} = props?.route;
  const navigation = useNavigation();
  // console.log(item, props?.route.contract, 'item item');

  return (
    <View style={{height: 900, overflow: 'scroll'}}>
      <FlatList
        snapToInterval={width - 20}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginVertical: 10}}
        vertical
        data={[
          {
            display_name: 'internal Tenancy Report',

            print_name: 'internal_tenancy_report',
            contract_id: props?.route.contract,
          },
          {
            display_name: 'Tenancy receipt',
            print_name: 'tenancy_receipt',
            contract_id: props?.route.contract,
          },
          {
            print_name: 'tax_invoice',
            display_name: 'Tax Invoice ',

            contract_id: props?.route.contract,
          },
          {
            print_name: 'cheque_report',
            display_name: 'Cheque Report  ',

            contract_id: props?.route.contract,
          },
          {
            print_name: 'tc_report_wizard',
            display_name: 'TC Report Wizard  ',

            contract_id: props?.route.contract,
          },
        ]} //  [{name: 'dummy', date: '2023-02-23 12:44:51'}]
        renderItem={({item}) => (
          <Pressable onPress={() => navigation.navigate('PdfView', item)}>
            <DocumentCard item={item} />
          </Pressable>
        )}
      />
      <View
        style={{
          height: 200,
          width: 100,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: 'red',
        }}></View>
    </View>
  );
};
export default class TabViewExample extends React.Component {
  state = {
    index: this.props.index,
    contract: this.props?.contract,
    isDark: this?.props?.isDark,
    routes: [
      {
        id: 0,
        key: 'first',
        contract: this.props?.contract,
        isDark: this?.props?.isDark,

        icon: (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              color={COLORS().blue}
              size={15}
              name="credit-card-outline"
            />
            <Text
              style={{
                color: COLORS(this?.props?.isDark).red,
                fontWeight: 'bold',
                fontSize: 13,
              }}>
              Payments
            </Text>
          </View>
        ),
      },
      // {
      //   id: 1,

      //   key: 'second',
      //   icon: (
      //     <View
      //       style={{
      //         flexDirection: 'row',
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //       }}>
      //       <MaterialCommunityIcons
      //         color={COLORS().blue}
      //         size={15}
      //         name="hammer-screwdriver"
      //       />
      //       <Text
      //         style={{
      //           color: COLORS().dark,
      //           fontWeight: 'bold',
      //           fontSize: 13,
      //         }}>
      //         Maintenance
      //       </Text>
      //     </View>
      //   ),
      // },
      {
        id: 1,
        contract: this.props?.contract,
        item: this.props?.item,
        isDark: this?.props?.isDark,

        key: 'second',
        icon: (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              color={COLORS().blue}
              size={15}
              name="file-document-multiple-outline"
            />
            <Text
              style={{
                color: COLORS(this?.props?.isDark).red,
                fontWeight: 'bold',
                fontSize: 13,
              }}>
              Documents
            </Text>
          </View>
        ),
      },
    ],
  };

  _handleIndexChange = index => this.setState({index});

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    console.log(props?.navigationState?.isDark, 'props ');
    return (
      <View
        style={[
          styles.tabBar,
          {backgroundColor: COLORS(props?.navigationState?.isDark).cardForDark},
        ]}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => this.setState({index: i})}>
              <Animated.Text
                style={{
                  opacity,
                  backgroundColor: this.state.index == i ? COLORS().gray : null,
                  padding: 7,
                  borderRadius: 8,
                  color: COLORS().red,
                }}>
                <Text style={{color: COLORS().red}}>
                  {route.icon}
                  {route.title}
                </Text>
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = SceneMap({
    first: FirstRoute,
    second: ThirdRoute,
  });

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
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

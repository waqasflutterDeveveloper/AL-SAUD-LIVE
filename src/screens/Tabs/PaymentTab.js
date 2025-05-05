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
  Image,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {COLORS} from '../../consts/colors';
const {width} = Dimensions.get('screen');
import PaymentCard from '../../Components/Cards/paymentsCard';
import {useMaintianenceApi, usePaymentsForTenantApi} from '../../apis/Home';
import {useSelector} from 'react-redux';
import Spinner from '../../Components/Spinner';

const FirstRoute = props => {
  const userInfo = useSelector(state => state.userinfo.userInfo);
  const selectedProp = useSelector(state => state.MyProperties.selectedProp);
  const {mutate: PaymentsForTenantApi, isLoading} = usePaymentsForTenantApi();
  const {Payments} = useSelector(state => state.Payments);
  useEffect(() => {
    // console.log(selectedProp?.id, 'selectedProp', props?.route);
    PaymentsForTenantApi({
      partner_type:
        'tenant' || userInfo?.partner[0].is_tenant ? 'tenant' : 'owner',
      partner: userInfo.partner_id,
      flat: props?.route?.item?.flat_ids?.[0]
        ? props?.route?.item?.flat_ids?.[0]
        : selectedProp?.id,
      contract: props?.route?.item?.contract_id?.[0]
        ? props?.route?.item?.contract_id?.[0]
        : props?.route?.contract,
    });

    return () => {};
  }, []);
  //
  const [upcomming, setupcomming] = useState(null);

  useEffect(() => {
    const countUpcomming = Payments?.filter(element => {
      if (
        element.state != 'posted' &&
        element?.amount > 0 &&
        element.state != 'draft'
      ) {
        return element;
      }

      return false;
    });
    setupcomming(countUpcomming);
  }, [Payments]);
  const {isDark} = useSelector(state => state.Home);

  const [SortedData, setSortedData] = useState([]);
  useEffect(() => {
    if (upcomming?.length > 0) {
      const sortedData = [...upcomming];

      sortedData?.sort((a, b) => {
        const order = {
          done: 0,
          posted: 1,
          to_be_ret: 2,
        };
        return order[a.state] - order[b.state];
      });
      setSortedData(sortedData);
    }
  }, [upcomming]);
  const flatListRef = useRef(null);

  // useEffect(() => {
  //   // Use navigation params or state to determine which card to scroll to
  //   const targetCardIndex = 3; //props?.route?.item?.cheque_ref;

  //   if (targetCardIndex !== undefined && upcomming) {
  //     setTimeout(() => scrollToIndex(3), 10000);
  //   }
  // }, [props?.route?.item?.cheque_ref, upcomming]);

  // const scrollToIndex = index => {
  //   // console.log('flatListRef flatListRef', flatListRef?.current);

  //   if (flatListRef?.current) {
  //     flatListRef?.current?.scrollToIndex({index, animated: true});
  //   }
  // };
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          // display: 'flex',
          backgroundColor: COLORS(isDark).blakvsgrey,
        }}>
        {isLoading ? (
          <Spinner />
        ) : SortedData?.length > 0 ? (
          <ScrollView contentContainerStyle={styles.row}>
            <FlatList
              ref={flatListRef}
              snapToInterval={width - 20}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginVertical: 10, marginHorizontal: 10}}
              vertical
              scr
              ListFooterComponent={
                <View style={{width: '100%', height: 50}}></View>
              }
              data={SortedData} // dummy
              renderItem={({item}) => (
                <PaymentCard
                  active={props?.route?.item?.cheque_ref}
                  hasLegalCase={props.route?.hasLegalCase}
                  Item={item}
                />
              )}
            />
          </ScrollView>
        ) : (
          <Text style={{color: 'black', fontWeight: 'bold'}}>No Data</Text>
        )}
      </View>
    </>
  );
};
const SecondRoute = props => {
  const userInfo = useSelector(state => state.userinfo.userInfo);
  const selectedProp = useSelector(state => state.MyProperties.selectedProp);
  const {mutate: PaymentsForTenantApi, isLoading} = usePaymentsForTenantApi();
  const {Payments} = useSelector(state => state.Payments);
  useEffect(() => {
    PaymentsForTenantApi({
      partner_type:
        'tenant' || userInfo?.partner[0].is_tenant ? 'tenant' : 'owner',
      partner: userInfo.partner_id,
      flat: props?.route?.item?.flat_ids?.[0]
        ? props?.route?.item?.flat_ids?.[0]
        : selectedProp?.id,
      contract: props?.route?.item?.contract_id?.[0]
        ? props?.route?.item?.contract_id?.[0]
        : props?.route?.contract,
    });

    return () => {};
  }, []);
  const [paid, setpaid] = useState([]);
  //

  useEffect(() => {
    const count = Payments?.filter(element => {
      if (
        element.state == 'posted' ||
        (element.state != 'posted' && element?.amount == 0)
      ) {
        return element;
      }

      return false;
    });
    setpaid(count);
  }, [Payments]);
  const [SortedData, setSortedData] = useState([]);
  useEffect(() => {
    if (paid?.length > 0) {
      const sortedData = [...paid];

      sortedData?.sort((a, b) => {
        const order = {
          done: 0,
          posted: 1,
          to_be_ret: 2,
        };
        return order[a.state] - order[b.state];
      });
      setSortedData(sortedData);
    }
  }, [paid]);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Use navigation params or state to determine which card to scroll to
    const targetCardIndex = 5; //props?.route?.item?.cheque_ref;

    if (targetCardIndex !== undefined) {
      scrollToIndex(targetCardIndex);
    }
  }, [props?.route?.item?.cheque_ref]);

  const scrollToIndex = index => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index, animated: true});
    }
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          // display: 'flex',
          backgroundColor: COLORS(props?.route?.isDark).white,
        }}>
        {isLoading ? (
          <Spinner />
        ) : SortedData?.length > 0 ? (
          <ScrollView contentContainerStyle={styles.row}>
            <FlatList
              snapToInterval={width - 20}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginVertical: 10, marginHorizontal: 10}}
              vertical
              data={SortedData} // dummy
              ListFooterComponent={
                <View style={{width: '100%', height: 50}}></View>
              }
              renderItem={({item}) => (
                <PaymentCard
                  Item={item}
                  active={props?.route?.item?.cheque_ref}
                  hasLegalCase={props.route?.hasLegalCase}
                />
              )}
            />
          </ScrollView>
        ) : (
          <Text style={{color: 'black', fontWeight: 'bold'}}>No Data</Text>
        )}
      </View>
    </>
  );
};
const ThirdRoute = props => {
  const userInfo = useSelector(state => state.userinfo.userInfo);
  const selectedProp = useSelector(state => state.MyProperties.selectedProp);
  const {mutate: PaymentsForTenantApi, isLoading} = usePaymentsForTenantApi();
  const {Payments} = useSelector(state => state.Payments);
  useEffect(() => {
    PaymentsForTenantApi({
      partner_type:
        'tenant' || userInfo?.partner[0].is_tenant ? 'tenant' : 'owner',
      partner: userInfo.partner_id,
      flat: props?.route?.item?.flat_ids?.[0]
        ? props?.route?.item?.flat_ids?.[0]
        : selectedProp?.id,
      contract: props?.route?.item?.contract_id?.[0]
        ? props?.route?.item?.contract_id?.[0]
        : props?.route?.contract,
    });

    return () => {};
  }, []);
  //

  const [others, setOthers] = useState([]);

  const Diff = date => {
    const currentDate = new Date();
    const futureDate = new Date(date);
    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear();
    // let currentDate = `${year}-${month}-${day}`;
    const diffTime = Math.abs(futureDate - currentDate);

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  useEffect(() => {
    const count = Payments?.filter(element => {
      if (element.state != 'paid' && Diff(element.date) <= 0) {
        return element;
      }

      return false;
    });
    setOthers(count);
  }, [Payments]);
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          // display: 'flex',
          backgroundColor: COLORS(props?.route?.isDark).white,
        }}>
        {isLoading ? (
          <Spinner />
        ) : others?.length > 0 ? (
          <ScrollView
            contentContainerStyle={[
              styles.row,
              {backgroundColor: COLORS(props?.route?.isDark).white},
            ]}>
            <FlatList
              snapToInterval={width - 20}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginVertical: 10, marginHorizontal: 10}}
              vertical
              data={others} // dummy
              renderItem={({item}) => (
                <PaymentCard
                  Item={item}
                  active={props?.route?.item?.cheque_ref}
                  hasLegalCase={props.route?.hasLegalCase}
                />
              )}
            />
          </ScrollView>
        ) : (
          <Text style={{color: 'black', fontWeight: 'bold'}}>No Data</Text>
        )}
      </View>
    </>
  );
};
export default class TabViewExample extends React.Component {
  state = {
    index: this.props.index,
    hasLegalCase: this.props.hasLegalCase,
    isDark: this.props.isDark,
    item: this.props?.item,

    routes: [
      {
        id: 0,
        key: 'first',
        contract: this.props?.contract,
        isDark: this.props.isDark,
        hasLegalCase: this.props.hasLegalCase,
        item: this.props?.item,

        icon: (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={styles.icon}
              source={require('../../assets/png/calnder_blue.png')}
              resizeMode="contain"
            />

            <Text
              style={{
                color: COLORS().red,
                fontWeight: 'bold',
                fontSize: 13,
              }}>
              Upcoming Payments
            </Text>
          </View>
        ),
      },
      {
        id: 1,
        contract: this.props?.contract,
        isDark: this.props.isDark,
        hasLegalCase: this.props.hasLegalCase,
        item: this.props?.item,
        key: 'second',
        icon: (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={styles.icon}
              source={require('../../assets/png/righttik.png')}
              resizeMode="contain"
            />
            <Text
              style={{
                color: COLORS().red,
                fontWeight: 'bold',
                fontSize: 13,
              }}>
              Paid Payments
            </Text>
          </View>
        ),
      },
      {
        id: 2,
        contract: this.props?.contract,
        isDark: this.props.isDark,
        hasLegalCase: this.props.hasLegalCase,
        item: this.props?.item,

        key: 'third',
        icon: (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Image
              style={styles.icon}
              source={require('../../assets/png/righttik.png')}
              resizeMode="contain"
            /> */}
            <Text
              style={{
                color: COLORS().red,
                fontWeight: 'bold',
                fontSize: 13,
              }}>
              Others
            </Text>
          </View>
        ),
      },
    ],
  };

  _handleIndexChange = index => this.setState({index});

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    // console.log(props, 'is dark');
    return (
      <View
        style={[
          styles.tabBar,
          {
            backgroundColor: COLORS(props.navigationState.isDark).blakvsgrey,
          },
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
              style={[
                styles.tabItem,
                {
                  backgroundColor: COLORS(props.navigationState.isDark)
                    .blakvsgrey,
                },
              ]}
              onPress={() => this.setState({index: i})}>
              <Animated.Text
                style={{
                  opacity,
                  backgroundColor:
                    this.state.index == i
                      ? COLORS(props.navigationState.isDark).gray
                      : null,
                  padding: 7,
                  borderRadius: 8,
                  // paddingHorizontal: 15,
                  width: '100%',
                  // paddingRight: 4,
                }}>
                <Text>
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
    second: SecondRoute,
    third: ThirdRoute,
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

    marginHorizontal: 5,
    // paddingHorizontal: 10,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'space-between',
    flexDirection: 'row',
    // paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    // flex: 1,
    alignItems: 'center',
    paddingVertical: 5,

    // width: '40%',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    height: 20,
    width: 20,
    backgroundColor: COLORS().white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
});

// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   StatusBar,
//   FlatList,
//   ScrollView,
//   TextInput,
//   Dimensions,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
import SCREEN from '../../Layout';
// import {TabView, SceneMap} from 'react-native-tab-view';

// import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// import {COLORS} from '../consts/colors';
// import Header from '../Components/Header';
import NotificationCardList from '../Components/Lists/NotificationCardList';
import moment from 'moment';

import React, {useRef, useState, useEffect, useCallback} from 'react';

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
  Linking,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';

import {TabView, SceneMap} from 'react-native-tab-view';

import {COLORS} from '../consts/colors';

import {useSelector} from 'react-redux';
import Header from '../Components/Header';
import font from '../consts/font';
const FirstRoute = props => {
  const [search, setSearch] = React.useState(null);
  const [number, onChangeNumber] = React.useState('');
  const {Notifications} = useSelector(state => state.Home);
  const ArrangeArr = () => {
    let arr = [
      {id: 1, title: 'Today', notification: []},
      {id: 2, title: 'Yesterday', notification: []},
    ];

    for (let index = 0; index < Notifications?.length; index++) {
      const diff = moment(new Date()).diff(
        moment(Notifications?.[index]?.create_date).format('YYYY-MM-DD'),
        'days',
      );
      if (diff == 0) {
        arr[0].notification?.push({
          id: index,
          title: Notifications?.[index]?.display_name,
          time: moment(Notifications?.[index]?.notification_date).format('LLL'),
          desc: Notifications?.[index]?.message,
          image:
            'https://www.zetta.net.au/wp-content/uploads/2018/02/maintenance-icon-14.png',
          review: false,
        });
      } else {
        arr.push({
          id: index,
          title: Notifications?.[index]?.display_name,
          time: moment(Notifications?.[index]?.notification_date).format('LLL'),
          desc: Notifications?.[index]?.message,
          image:
            'https://www.zetta.net.au/wp-content/uploads/2018/02/maintenance-icon-14.png',
          review: false,
        });
      }
    }
    return arr;
  };

  const [Maintenances, setMaintenance] = useState([]);

  const navigation = useNavigation();

  const [dummy, setDummy] = useState([]);

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          // display: 'flex',
          backgroundColor: COLORS().white,
        }}>
        {!Notifications ? (
          <Spinner />
        ) : Notifications?.length > 0 ? (
          <NotificationCardList type={'maintenance.request'} />
        ) : (
          <Text style={{color: 'black', fontWeight: 'bold'}}>No Data</Text>
        )}
      </View>
    </>
  );
};

const SecondRoute = props => {
  const [search, setSearch] = React.useState(null);
  const [number, onChangeNumber] = React.useState('');
  const {Notifications} = useSelector(state => state.Home);
  const ArrangeArr = () => {
    let arr = [
      {id: 1, title: 'Today', notification: []},
      {id: 2, title: 'Yesterday', notification: []},
    ];

    for (let index = 0; index < Notifications?.length; index++) {
      const diff = moment(new Date()).diff(
        moment(Notifications?.[index]?.create_date).format('YYYY-MM-DD'),
        'days',
      );
      if (diff == 0) {
        arr[0].notification?.push({
          id: index,
          title: Notifications?.[index]?.display_name,
          time: moment(Notifications?.[index]?.notification_date).format('LLL'),
          desc: Notifications?.[index]?.message,
          image:
            'https://www.zetta.net.au/wp-content/uploads/2018/02/maintenance-icon-14.png',
          review: false,
        });
      } else {
        arr.push({
          id: index,
          title: Notifications?.[index]?.display_name,
          time: moment(Notifications?.[index]?.notification_date).format('LLL'),
          desc: Notifications?.[index]?.message,
          image:
            'https://www.zetta.net.au/wp-content/uploads/2018/02/maintenance-icon-14.png',
          review: false,
        });
      }
    }
    return arr;
  };
  const [contracts, setcontracts] = useState([]);

  useEffect(() => {
    if (Notifications) {
      setDummy(ArrangeArr());
    }
  }, [Notifications]);

  const [dummy, setDummy] = useState([]);

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          // display: 'flex',
          backgroundColor: COLORS().white,
        }}>
        {!Notifications ? (
          <Spinner />
        ) : Notifications?.length > 0 ? (
          <ScrollView
            contentContainerStyle={[
              styles.row,
              {backgroundColor: COLORS().white},
            ]}>
            <NotificationCardList type={'property.contract'} />
          </ScrollView>
        ) : (
          <Text style={{color: 'black', fontWeight: 'bold'}}>No Data</Text>
        )}
      </View>
    </>
  );
};
const ThirdRoute = props => {
  const [search, setSearch] = React.useState(null);
  const [number, onChangeNumber] = React.useState('');
  const {Notifications} = useSelector(state => state.Home);
  const ArrangeArr = () => {
    let arr = [
      {id: 1, title: 'Today', notification: []},
      {id: 2, title: 'Yesterday', notification: []},
    ];

    for (let index = 0; index < Notifications?.length; index++) {
      const diff = moment(new Date()).diff(
        moment(Notifications?.[index]?.create_date).format('YYYY-MM-DD'),
        'days',
      );
      if (diff == 0) {
        arr[0].notification?.push({
          id: index,
          title: Notifications?.[index]?.display_name,
          time: moment(Notifications?.[index]?.notification_date).format('LLL'),
          desc: Notifications?.[index]?.message,
          image:
            'https://www.zetta.net.au/wp-content/uploads/2018/02/maintenance-icon-14.png',
          review: false,
        });
      } else {
        arr.push({
          id: index,
          title: Notifications?.[index]?.display_name,
          time: moment(Notifications?.[index]?.notification_date).format('LLL'),
          desc: Notifications?.[index]?.message,
          image:
            'https://www.zetta.net.au/wp-content/uploads/2018/02/maintenance-icon-14.png',
          review: false,
        });
      }
    }
    return arr;
  };
  // console.log(Notifications, 'Notifications');
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (Notifications) {
      setPayments(
        Notifications?.filter(item => item?.model_id == 'account.payment'),
      );
      setDummy(ArrangeArr());
    }
  }, [Notifications]);
  const {isDark} = useSelector(state => state.Home);

  const navigation = useNavigation();

  const [dummy, setDummy] = useState([]);

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          // display: 'flex',
          backgroundColor: COLORS().white,
        }}>
        {!Notifications ? (
          <Spinner />
        ) : Notifications?.length > 0 ? (
          <ScrollView
            contentContainerStyle={[
              styles.row,
              {backgroundColor: COLORS().white},
            ]}>
            <NotificationCardList type="account.payment" />
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
    index: 0,
    routes: [
      {
        id: 0,
        key: 'first',

        icon: (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 30,
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 13,
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              Maintenance
            </Text>
          </View>
        ),
      },
      {
        id: 1,

        key: 'second',
        icon: (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 30,
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 13,
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              Contracts
            </Text>
          </View>
        ),
      },
      {
        id: 2,

        key: 'third',
        icon: (
          <View
            style={{
              flexDirection: 'row',

              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 30,
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 13,
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              Payments
            </Text>
          </View>
        ),
      },
    ],
  };

  _handleIndexChange = index => this.setState({index});

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View
        style={[
          styles.tabBar,
          {
            backgroundColor: COLORS().blakvsgrey,
          },
        ]}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={[
                styles.tabItem,
                {
                  backgroundColor: COLORS().blakvsgrey,
                },
              ]}
              onPress={() => this.setState({index: i})}>
              <Animated.Text
                style={{
                  backgroundColor:
                    this.state?.index == i ? COLORS().gray : null,
                  padding: 7,
                  borderRadius: 8,
                  // paddingHorizontal: 15,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: 40,
                  // paddingRight: 4,
                }}>
                <Text>{route.icon}</Text>
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
      <SafeAreaView style={{backgroundColor: COLORS().white, flex: 1}}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <Header title={'Notifications'} back />
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
      </SafeAreaView>
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
    backgroundColor: COLORS().white,
    // paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    width: '30%',
  },
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
  // tabItem: {
  //   // flex: 1,
  //   alignItems: 'center',
  //   paddingVertical: 5,

  //   width: '40%',
  // },
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
  bluetext: {
    color: SCREEN.BLUE,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  codebox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    marginBottom: 40,
  },
  code: {color: SCREEN.DARKGREY},
  header: {
    color: 'black',
  },
  name: {
    color: COLORS().dark,
    fontWeight: 'bold',
  },

  secboxtext: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 10,
    // backgroundColor: 'white',
    marginTop: 10,
    marginVertical: 10,
    padding: 10,
  },
  line: {
    borderBottomColor: SCREEN.MIDDLEGREY,
    borderRightColor: 'transparent',
    height: 5,
    borderWidth: 1,
    width: '100%',
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    marginVertical: 15,
    marginBottom: 40,
  },
});

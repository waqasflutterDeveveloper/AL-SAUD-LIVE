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
  useMaintianenceApi,
  useMainttenanceUserData,
  usePaymentsForTenantApi,
} from '../../apis/Home';
import {useIsFocused} from '@react-navigation/native';

import {useSelector} from 'react-redux';
import Spinner from '../../Components/Spinner';
import MiniPaymentCard from '../../Components/Cards/MiniPaymentCard';
import CommonCard from '../../Components/Cards/DocumentsCards/commonCard';

const FirstRoute = () => {
  const IsFocused = useIsFocused();

  const userInfo = useSelector(state => state.userinfo.userInfo);

  const [MaintainenceSelceted, setMaintainenceSelceted] = useState({});
  const {mutate: MainttenanceUserData, isLoading: isLoadingData} =
    useMainttenanceUserData();
  const {MaintainenceUserData} = useSelector(state => state.Maintainence);

  useEffect(() => {
    MainttenanceUserData({partner_id: userInfo?.uid});
    return () => {};
  }, [userInfo, IsFocused]);

  const [openModal, setOpenModal] = useState(false);
  const navigation = useNavigation();
  const sheetRef = React.useRef(null);
  const handleNavigation = item => {
    navigation.navigate('MaintenanceDetails', {MaintainenceSelceted: item});
  };
  const handleCloseModal = () => {
    sheetRef.current.snapTo(2);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        display: 'flex',
      }}>
      {isLoadingData ? (
        <Spinner />
      ) : MaintainenceUserData && MaintainenceUserData.length > 0 ? (
        <FlatList
          snapToInterval={width - 20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginVertical: 10,
          }}
          vertical
          data={MaintainenceUserData?.filter(
            item => item.stages_ids[`${3}`] == true,
          )}
          renderItem={({item}) => (
            <MaintenanceCard
              openModal={openModal}
              item={item}
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

      <View
        style={{position: 'absolute', bottom: 0, left: 0, right: 0, top: 0}}>
        <NewBottomSheet
          openModal={openModal}
          setOpenModal={setOpenModal}
          sheetRef={sheetRef}
          handleCloseModal={handleCloseModal}
          MaintainenceSelceted={MaintainenceSelceted}
        />
      </View>
    </View>
  );
};
const SecondRoute = () => {
  const IsFocused = useIsFocused();

  const userInfo = useSelector(state => state.userinfo.userInfo);

  const [MaintainenceSelceted, setMaintainenceSelceted] = useState({});
  const {mutate: MainttenanceUserData, isLoading: isLoadingData} =
    useMainttenanceUserData();
  const {MaintainenceUserData} = useSelector(state => state.Maintainence);

  useEffect(() => {
    MainttenanceUserData({partner_id: userInfo?.uid});
    return () => {};
  }, [userInfo, IsFocused]);
  const [openModal, setOpenModal] = useState(false);
  const navigation = useNavigation();
  const sheetRef = React.useRef(null);
  const handleNavigation = item => {
    navigation.navigate('MaintenanceDetails', {MaintainenceSelceted: item});
  };
  const handleCloseModal = () => {
    sheetRef.current.snapTo(2);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        display: 'flex',
      }}>
      {isLoadingData ? (
        <Spinner />
      ) : MaintainenceUserData && MaintainenceUserData.length > 0 ? (
        <FlatList
          snapToInterval={width - 20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginVertical: 10,
          }}
          vertical
          data={MaintainenceUserData?.filter(item => item.stage_id[0] == 1)}
          renderItem={({item}) => (
            <MaintenanceCard
              openModal={openModal}
              item={item}
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

      <View
        style={{position: 'absolute', bottom: 0, left: 0, right: 0, top: 0}}>
        <NewBottomSheet
          openModal={openModal}
          setOpenModal={setOpenModal}
          sheetRef={sheetRef}
          handleCloseModal={handleCloseModal}
          MaintainenceSelceted={MaintainenceSelceted}
        />
      </View>
    </View>
  );
};
const ThirdRoute = () => {
  const IsFocused = useIsFocused();

  const userInfo = useSelector(state => state.userinfo.userInfo);

  const [MaintainenceSelceted, setMaintainenceSelceted] = useState({});
  const {mutate: MainttenanceUserData, isLoading: isLoadingData} =
    useMainttenanceUserData();
  const {MaintainenceUserData} = useSelector(state => state.Maintainence);

  useEffect(() => {
    MainttenanceUserData({partner_id: userInfo?.uid});
    return () => {};
  }, [userInfo, IsFocused]);
  const [openModal, setOpenModal] = useState(false);
  const navigation = useNavigation();
  const sheetRef = React.useRef(null);
  const handleNavigation = item => {
    navigation.navigate('MaintenanceDetails', {MaintainenceSelceted: item});
  };
  const handleCloseModal = () => {
    sheetRef.current.snapTo(2);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        display: 'flex',
      }}>
      {isLoadingData ? (
        <Spinner />
      ) : MaintainenceUserData && MaintainenceUserData.length > 0 ? (
        <FlatList
          snapToInterval={width - 20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginVertical: 10,
          }}
          vertical
          data={MaintainenceUserData?.filter(item => item.stage_id[0] == 2)}
          renderItem={({item}) => (
            <MaintenanceCard
              openModal={openModal}
              item={item}
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

      <View
        style={{position: 'absolute', bottom: 0, left: 0, right: 0, top: 0}}>
        <NewBottomSheet
          openModal={openModal}
          setOpenModal={setOpenModal}
          sheetRef={sheetRef}
          handleCloseModal={handleCloseModal}
          MaintainenceSelceted={MaintainenceSelceted}
        />
      </View>
    </View>
  );
};

export default class TabViewExample extends React.Component {
  state = {
    index: this.props.index,
    routes: [
      {
        id: 0,
        key: 'first',
        icon: (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              color={COLORS().green}
              size={15}
              name="hammer-screwdriver"
            />
            <Text
              style={{
                color: COLORS().green,
                fontWeight: 'bold',
                fontSize: 13,
                marginHorizontal: 4,
              }}>
              Repaired
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
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              color={COLORS().blue}
              size={15}
              name="hammer-screwdriver"
            />
            <Text
              style={{
                color: COLORS().blue,
                fontWeight: 'bold',
                fontSize: 13,
                marginHorizontal: 4,
              }}>
              New
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
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              color={COLORS().dark}
              size={15}
              name="hammer-screwdriver"
            />
            <Text
              style={{
                color: COLORS().dark,
                fontWeight: 'bold',
                fontSize: 13,
                marginHorizontal: 4,
              }}>
              Inprogress
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
      <View style={styles.tabBar}>
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
                  backgroundColor:
                    this.state.index == i ? COLORS().white : null,
                  padding: 7,
                  borderRadius: 8,
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

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
} from 'react-native';

import {TabView, SceneMap} from 'react-native-tab-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ScreenWidth = Dimensions.get('window').width;
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../consts/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Accordian from '../Components/Accordian';
import HelpCenterCard from '../Components/Accordian/HelpCenterCard';
import {useSelector} from 'react-redux';
import Header from '../Components/Header';
import font from '../consts/font';
const FirstRoute = () => {
  const {HelpCenter} = useSelector(state => state.HelpCenter);

  //   useEffect(() => {

  //     return () => {};
  //   }, []);
  // HelpCenter
  return (
    <>
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            display: 'flex',
          }}>
          <View>
            {HelpCenter?.help_center?.map(item => {
              return (
                <Accordian
                  key={item.id}
                  title={item.title}
                  body={item.content}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </>
  );
};
const SecondRoute = () => {
  const {HelpCenter} = useSelector(state => state.HelpCenter);
  //
  const handlePress = async url => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    await Linking.openURL(url);
  };
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
        {HelpCenter?.company_id?.[0].customer_service && (
          <HelpCenterCard
            text="Custome Service"
            icon={
              <AntDesign
                style={{fontWeight: 'bold', marginRight: 10}}
                name="customerservice"
                color={COLORS().blue}
                size={22}
              />
            }
          />
        )}
        {HelpCenter?.company_id?.[0].whatsapp && (
          <TouchableOpacity
            onPress={() => handlePress(HelpCenter?.company_id?.[0].whatsapp)}>
            <HelpCenterCard
              value={HelpCenter?.company_id?.[0].whatsapp}
              text="whatsapp"
              icon={
                <FontAwesome
                  style={{fontWeight: 'bold', marginRight: 10}}
                  name="whatsapp"
                  color={COLORS().blue}
                  size={22}
                />
              }
            />
          </TouchableOpacity>
        )}
        {HelpCenter?.company_id?.[0].facebook && (
          <TouchableOpacity
            onPress={() => handlePress(HelpCenter?.company_id?.[0].facebook)}>
            <HelpCenterCard
              value={HelpCenter?.company_id?.[0].facebook}
              text="facebook"
              icon={
                <FontAwesome
                  style={{fontWeight: 'bold', marginRight: 10}}
                  name="facebook"
                  color={COLORS().blue}
                  size={22}
                />
              }
            />
          </TouchableOpacity>
        )}
        {HelpCenter?.company_id?.[0].twitter && (
          <TouchableOpacity
            onPress={() => handlePress(HelpCenter?.company_id?.[0].twitter)}>
            <HelpCenterCard
              value={HelpCenter?.company_id?.[0].twitter}
              text="twitter"
              icon={
                <FontAwesome
                  style={{fontWeight: 'bold', marginRight: 10}}
                  name="twitter"
                  color={COLORS().blue}
                  size={22}
                />
              }
            />
          </TouchableOpacity>
        )}
        {HelpCenter?.company_id?.[0].instagram && (
          <TouchableOpacity
            onPress={() => handlePress(HelpCenter?.company_id?.[0].instagram)}>
            <HelpCenterCard
              text="instagram"
              value={HelpCenter?.company_id?.[0].instagram}
              icon={
                <FontAwesome
                  style={{fontWeight: 'bold', marginRight: 10}}
                  name="instagram"
                  color={COLORS().blue}
                  size={22}
                />
              }
            />
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
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
              justifyContent: 'center',
              alignItems: 'center',
              width: font.width * 0.5,
            }}>
            <Text
              style={{
                color: COLORS().dark,
                fontWeight: 'bold',
                marginHorizontal: 5,
              }}>
              FAQ
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
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: font.width * 0.5,
            }}>
            <Text
              style={{
                color: COLORS().dark,
                fontWeight: 'bold',
                marginHorizontal: 5,
              }}>
              Contact Us
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
                  paddingBottom: 10,
                  width: font.width * 0.5,
                  borderBottomColor:
                    this.state.index == i
                      ? COLORS().blue
                      : COLORS().bottomBorder,
                  borderBottomWidth: 1,
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
  });

  render() {
    return (
      <SafeAreaView style={{backgroundColor: COLORS().white, flex: 1}}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <Header title={'Help Center'} back />
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
  },
});

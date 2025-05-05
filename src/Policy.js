import {View, Text, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native';
import {COLORS} from './consts/colors';
import {useSelector} from 'react-redux';
import Header from './Components/Header';
import HTMLView from 'react-native-htmlview';

const Policy = () => {
  const {HelpCenter} = useSelector(state => state.HelpCenter);
  const {isDark} = useSelector(state => state.Home);

  return (
    <SafeAreaView style={{backgroundColor: COLORS().white, flex: 1}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Header title={'Privacy & Policy'} back />
      <ScrollView>
        <View style={{paddingTop: 20, paddingHorizontal: 20, color: 'grey'}}>
          <HTMLView
            stylesheet={styles}
            value={`${HelpCenter?.company_id?.[0].privacy_policy}`}
          />
        </View>
        {/* 
          <View style={{marginTop: 40, marginHorizontal: 15}}>
            <Text style={{color: COLORS().red, fontSize: 17}}>
              {' '}
              Lorem Ipsum is simply dummy text of the printing{' '}
            </Text>
            <Text style={{marginTop: 10, color: COLORS().dark}}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </View>

          <View style={{marginTop: 40, marginHorizontal: 15}}>
            <Text style={{color: COLORS().red, fontSize: 17}}>
              {' '}
              Lorem Ipsum is simply dummy text of the printing{' '}
            </Text>
            <Text style={{marginTop: 10, color: COLORS().dark}}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Policy;
const styles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
  p: {
    color: 'black',
  },
});

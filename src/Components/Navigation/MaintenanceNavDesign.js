import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SCREEN from '../../../Layout';

const MaintenanceNavDesign = ({navigation, index}) => {
  const {userInfo} = useSelector(state => state.userinfo);
  return (
    <>
      <View style={styles.container}>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('MyProperties')}
          style={styles.itemSearch}>
          <Image source={require('../../assets/Search.png')} />
        </TouchableOpacity> */}
        <View style={styles.AllItems}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Main')}>
            {/* <Image source={require('../../assets/home.png')} /> */}

            {index == 0 ? (
              <Image source={require('../../assets/png/home2.png')} />
            ) : (
              <Image source={require('../../assets/png/home.png')} />
            )}
            <Text style={index == 0 ? styles.text : styles.textgrey}>Home</Text>
            {index == 0 && <View style={{...styles.dot}}></View>}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              userInfo?.partner_id
                ? navigation.navigate('Settings')
                : navigation.navigate('login')
            }
            style={styles.item}>
            {index == 4 ? (
              <Image source={require('../../assets/png/more2.png')} />
            ) : (
              <Image source={require('../../assets/png/more.png')} />
            )}
            <Text style={index == 4 ? styles.text : styles.textgrey}>More</Text>
            {index == 4 && <View style={{...styles.dot}}></View>}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 50,
    width: SCREEN.WIDTH,
    backgroundColor: 'white',

    bottom: 0,
    position: 'absolute',
  },
  text: {color: SCREEN.OREANGE},
  ImageBackground: {
    position: 'absolute',
    bottom: -30,
    left: 0,
    right: 0,
    height: 120,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  AllItems: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSearch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    bottom: 40,
  },
  dot: {
    padding: 2,
    backgroundColor: SCREEN.OREANGE,
    borderRadius: 50,
  },
  textgrey: {
    color: SCREEN.DARKGREY,
  },
});
export default MaintenanceNavDesign;

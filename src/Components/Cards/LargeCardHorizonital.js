import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import SCREEN from '../../../Layout';
import {COLORS} from '../../consts/colors';
const LargeCardHorizonital = ({house, orinteation}) => {
  return (
    <View
      style={{
        ...styles.container,
        flexDirection: orinteation == 'horzintal' ? 'row' : 'column',
      }}>
      <View style={styles.box}>
        <Image
          style={styles.image}
          //source={require('../../assets/card_image.png')}
          source={
            house?.image_128
              ? {uri: `data:image/jpeg;base64,${house?.image_128}`}
              : require('../../assets/card_image.png')
          }
        />
      </View>
      <View style={styles.middlebox}>
        <Text style={{...styles.text, color: COLORS().dark}}>
          {house?.name}
        </Text>
        <View
          style={{
            ...styles.text,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            flexDirection: 'row',
          }}>
          <View
            style={{
              ...styles.text,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '80%',
              flexDirection: 'row',
            }}>
            <Text style={{...styles.text}}>Code: {house?.code}</Text>

            <Text style={styles.textminy}>{house?.type}</Text>
          </View>
        </View>
        <Text style={{...styles.fontlarge, color: 'black'}}>
          {house?.floor_id?.[1]} -{house?.building_id[1]} -{' '}
          {house?.country_id?.[1]}
        </Text>
        <View style={styles.secondbox}>
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/bed.png')} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{house?.room_no}</Text>
              <Text style={styles.textGrey}>Rooms</Text>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/bathroom.png')} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{house?.bathroom_no}</Text>
              <Text style={styles.textGrey}>Bath</Text>
            </View>
          </View>
          {/* <View style={styles.imageContainer}>
          <Image source={require('../../assets/stairs.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{house?.stairs}</Text>
            <Text style={styles.textGrey}>Stairs</Text>
          </View>
        </View> */}
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/area.png')} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {parseFloat(house?.area).toFixed(2)}
              </Text>
              <Text style={styles.textGrey}>m2</Text>
            </View>
          </View>
        </View>
        <View style={styles.lastbox}>
          {/* <Text style={{...styles.fontextralarge, color: SCREEN.OREANGE}}>
            {house?.rent_value} AED
          </Text> */}
          {/* <Text
            style={{
              ...styles.textGrey,
              marginHorizontal: 10,
              ...styles.fontlarge,
            }}>
            {house?.rent_type}
          </Text> */}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 145,
    width: SCREEN.WIDTH * 0.91,
    backgroundColor: SCREEN.WHITE,
    borderColor: '#EEEEEE',
    borderRadius: SCREEN.RADIUS,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    width: '90%',
    overflow: 'hidden',
  },
  box: {
    height: 130,
    width: SCREEN.WIDTH * 0.3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
    borderRadius: SCREEN.RADIUS - 4,
    width: '20%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: SCREEN.RADIUS - 4,
  },
  secondbox: {
    height: SCREEN.WIDTH * 0.775 * 0.185,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderRadius: SCREEN.RADIUS * 0.5,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: SCREEN.WIDTH * 0.775 * 0.145 * 0.48,
    // overflow: 'hidden',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    color: SCREEN.GREY,
  },
  text: {
    color: SCREEN.BLUE,
    fontSize: 12,
    fontWeight: 'bold',
  },
  textminy: {
    color: SCREEN.BLUE,
    fontSize: 10,
    backgroundColor: SCREEN.GREY,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  fontlarge: {
    fontSize: 10,
    color: SCREEN.DARKGREY,
  },
  fontextralarge: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textGrey: {
    color: SCREEN.DARKGREY,
    fontSize: 10,
    marginHorizontal: 2,
  },
  middlebox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // width: '80%',
    // height: SCREEN.WIDTH * 0.775 * 0.28,
    // width: SCREEN.WIDTH * 0.91 * 0.92,
    // backgroundColor: 'red',
    marginHorizontal: 10,
    width: '80%',
  },
  lastbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
});
export default LargeCardHorizonital;

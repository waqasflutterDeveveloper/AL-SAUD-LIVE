import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import SCREEN from '../../../Layout';
import {useSelector} from 'react-redux';
import {COLORS} from '../../consts/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LargeHomeCard = ({house}) => {
  const [floor, setFloor] = useState(null);
  const {isDark} = useSelector(state => state.Home);
  const [AllLoved, setAllLoved] = useState([]);

  useEffect(() => {
    if (house?.floor_id?.[1]) {
      const inputString = house?.floor_id?.[1];

      // Use a regular expression to extract the number from the string
      const match = inputString.match(/\d+/);

      if (match) {
        // 'match' is an array containing the matched number
        const number = parseInt(match[0], 10);
        console.log(number); // This will output 266
        setFloor(number);
      } else {
        // console.log('No number found in the input string');
      }
    }
  }, [house]);
  const HandleFavClick = async id => {
    setAllLoved(old => [...old, id]);
    const oldfav = await AsyncStorage.getItem('Fav');
    let concated = '';
    if (!oldfav) {
      const fav = await AsyncStorage.setItem('Fav', id.toString());
      //

      return;
    }
    concated = oldfav.concat(',', id);

    const fav = await AsyncStorage.setItem('Fav', concated);
  };
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: COLORS(isDark).greyForDark,

          backgroundColor: COLORS(isDark).cardForDark,
        },
      ]}>
      <View style={styles.box}>
        <View style={styles.allIconflex}>
          <View style={styles.allIcon}>
            {/* <Text>ttttttt</Text> */}
            <View style={styles.twoIcon}>
              <Ionicons name="push-outline" style={styles.icon} size={18} />
              <Pressable onPress={() => HandleFavClick(house.id)}>
                <View style={{...styles.icon}}>
                  <Ionicons
                    name="heart"
                    style={{
                      color: AllLoved.includes(house.id) ? 'red' : 'grey',
                    }}
                    size={18}
                  />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
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
        <Text style={{...styles.text, ...styles.fontlarge}}>{house?.name}</Text>
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
              width: '70%',
              flexDirection: 'row',
            }}>
            <Text style={{...styles.text}}>Code: {house?.code}</Text>

            <Text
              style={[
                styles.textminy,
                {marginTop: 5, backgroundColor: COLORS(isDark).greyForDark},
              ]}>
              {house?.type}
            </Text>
          </View>
        </View>
        <Text style={{...styles.fontlarge, color: COLORS(isDark).WhiteForDark}}>
          {house?.floor_id?.[1]} -{house?.building_id[1]} -{' '}
          {house?.country_id?.[1]}
        </Text>
      </View>
      <View
        style={[
          styles.secondbox,
          {
            borderColor: COLORS(isDark).greyForDark,
            borderWidth: 1,
            backgroundColor: COLORS(isDark).cardForDark,
          },
        ]}>
        <View style={[styles.imageContainer]}>
          <Image source={require('../../assets/bed.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{house?.room_no}</Text>
            <Text style={styles.textGrey}>Rooms</Text>
          </View>
        </View>
        <View
          style={[
            styles.imageContainer,
            {
              borderLeftWidth: 1,
              paddingHorizontal: 5,
              borderColor: COLORS(isDark).greyForDark,
            },
          ]}>
          <Image source={require('../../assets/bathroom.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{house?.bathroom_no}</Text>
            <Text style={styles.textGrey}>Bath</Text>
          </View>
        </View>
        <View
          style={[
            styles.imageContainer,
            {
              borderLeftWidth: 1,
              paddingHorizontal: 5,
              borderColor: COLORS(isDark).greyForDark,
            },
          ]}>
          <Image source={require('../../assets/stairs.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{floor}</Text>
            <Text style={styles.textGrey}>Floors</Text>
          </View>
        </View>
        <View
          style={[
            styles.imageContainer,
            {
              borderLeftWidth: 1,
              paddingHorizontal: 5,
              borderColor: COLORS(isDark).greyForDark,
            },
          ]}>
          <Image source={require('../../assets/area.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {' '}
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
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: SCREEN.WIDTH * 0.775,
    width: SCREEN.WIDTH * 0.91,
    backgroundColor: SCREEN.WHITE,
    borderColor: '#EEEEEE',
    borderRadius: SCREEN.RADIUS,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  box: {
    height: SCREEN.WIDTH * 0.775 * 0.365,
    width: SCREEN.WIDTH * 0.91 * 0.92,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
    borderRadius: SCREEN.RADIUS - 4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: SCREEN.RADIUS - 4,
  },
  secondbox: {
    height: SCREEN.WIDTH * 0.775 * 0.185,
    width: SCREEN.WIDTH * 0.91 * 0.92,
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
    fontSize: 14,
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
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '100%',
    height: SCREEN.WIDTH * 0.775 * 0.28,
    width: SCREEN.WIDTH * 0.91 * 0.92,
  },
  lastbox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
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
export default LargeHomeCard;

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SCREEN from '../../../Layout';
import {COLORS} from '../../consts/colors';
import font from '../../consts/font';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {useSelector} from 'react-redux';
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from '../../Helpers/FavHelpers';
import {setFavIds} from '../../Store/HomeData/HomeSlice';
import {useDispatch} from 'react-redux';
import {useLanguage} from '../../Helpers/LanguageContext';
import {arTranslations} from '../../translations/ar';
import {enTranslations} from '../../translations/en';

const NewHomeCard = ({data, horizontal, isFav = false, onPress}) => {
  const [AllLoved, setAllLoved] = useState([]);
  const favIds = useSelector(state => state.Home.favIds);
  const {language, switchLanguage} = useLanguage();
  const [floor, setFloor] = useState(null);
  useEffect(() => {
    if (data?.floor_id?.[1]) {
      const inputString = data?.floor_id?.[1];

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
  }, [data]);
  const translations = language === 'ar' ? arTranslations : enTranslations;
  const HandleFavClick = async id => {
    // console.log(id, 'id');
    // await AsyncStorage.setItem('Fav', id.toString());
    const oldfav = await AsyncStorage.getItem('Fav');

    // return;
    if (AllLoved.includes(id)) {
      const newarr = AllLoved.filter(item => item != id);
      // console.log(newarr, 'newarr');

      setAllLoved(newarr);
      const oldfav = await AsyncStorage.getItem('Fav');
      let concated = '';
      // console.log(oldfav, 'oldfav');

      if (!oldfav) {
        const fav = await AsyncStorage.setItem('Fav', id.toString());

        return;
      }
      if (oldfav.includes(`,${id}`)) {
        concated = oldfav.replace(`,${id}`, '');
      } else if (oldfav.includes(`${id},`)) {
        concated = oldfav.replace(`${id},`, '');
      } else {
        concated = oldfav.replace(`${id}`, '');
      }
      // console.log(concated, 'concated');

      const fav = await AsyncStorage.setItem('Fav', concated);
    } else {
      setAllLoved(old => [...old, id]);
      const oldfav = await AsyncStorage.getItem('Fav');
      let concated = '';
      if (!oldfav) {
        const fav = await AsyncStorage.setItem('Fav', id.toString());

        return;
      }
      if (!oldfav.includes(id)) {
        concated = oldfav.concat(',', id);

        const fav = await AsyncStorage.setItem('Fav', concated);
      }
    }
  };

  const generateLink = async id => {
    try {
      const link = await dynamicLinks().buildShortLink(
        {
          link: `https://alsaudrealestate.ae/details_screen?id=${id}`,
          domainUriPrefix: 'https://alsaudrealestate.ae',
          android: {
            packageName: 'com.alsaud.realestate',
          },
          // ios: {
          //   appStoreId: '123456789',
          //   bundleId: 'com.deepLinkingProjectBundleId',
          // },
        },
        dynamicLinks.ShortLinkType.DEFAULT,
      );
      // console.log('link:', link);
      return link;
    } catch (error) {
      // console.log('Generating Link Error:', error);
    }
  };
  const handleShare = async id => {
    const getLink = await generateLink(id);

    try {
      const result = await Share.share({
        message: getLink,
        url: getLink,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const {isDark} = useSelector(state => state.Home);
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          borderColor: COLORS(isDark).greyForDark,

          width: horizontal ? SCREEN.WIDTH * 0.76 : SCREEN.WIDTH * 0.9,
          backgroundColor: COLORS(isDark).cardForDark,
        },
      ]}>
      <View
        style={[
          styles.box,
          {
            width: horizontal
              ? SCREEN.WIDTH * 0.76 * 0.92
              : SCREEN.WIDTH * 0.9 * 0.92,
          },
        ]}>
        <Image
          style={styles.image}
          source={
            data?.image_128
              ? {uri: `data:image/jpeg;base64,${data?.image_128}`}
              : require('../../assets/card_image.png')
          }
        />
      </View>
      <View style={styles.middlebox}>
        <View
          style={{
            ...styles.text,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              ...styles.fontlarge,
              color: COLORS(isDark).WhiteForDark,
              fontWeight: '700',
              marginTop: 10,
              width: '80%',
            }}>
            {data?.name}
          </Text>
          <Text
            style={[
              styles.textminy,
              {marginTop: 5, backgroundColor: COLORS(isDark).greyForDark},
            ]}>
            {data?.type}
          </Text>
        </View>
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
            {/* <Text style={{...styles.text, marginTop: 5}}>
              {translations['Code']}: {data?.code}
            </Text> */}
          </View>
        </View>
        <Text
          style={{
            ...styles.fontlarge,
            color: COLORS(isDark).WhiteForDark,
            marginTop: 5,
          }}>
          {data?.floor_id?.[1]}
          {data?.building_id?.[1]}
        </Text>
      </View>
      <View
        style={[
          styles.secondbox,
          {
            width: horizontal
              ? SCREEN.WIDTH * 0.76 * 0.92
              : SCREEN.WIDTH * 0.9 * 0.92,
            borderColor: COLORS(isDark).greyForDark,

            backgroundColor: COLORS(isDark).cardForDark,
          },
        ]}>
        <View>
          <Ionicons name="bed" color={COLORS().blue} size={20} />
          <View style={styles.textContainer}>
            <Text style={styles.smallText}>{data?.room_no}</Text>
            <Text style={styles.textGrey}> {translations['Rooms']} </Text>
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
          <FontAwesome name="bathtub" color={COLORS().blue} size={20} />
          <View style={styles.textContainer}>
            <Text style={styles.smallText}>{data?.bathroom_no}</Text>
            <Text style={styles.textGrey}> {translations['Bath']} </Text>
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
          <MaterialCommunityIcons
            name="stairs"
            color={COLORS().blue}
            size={20}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{floor}</Text>
            <Text style={styles.textGrey}>{translations['Floors']} </Text>
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
          <Ionicons name="resize-sharp" color={COLORS().blue} size={20} />
          <View style={styles.textContainer}>
            <Text style={styles.smallText}>
              {' '}
              {parseFloat(data?.area).toFixed(2)}
            </Text>
            <Text style={styles.textGrey}> {translations['m2']}</Text>
          </View>
        </View>
      </View>
      <View style={styles.lastbox}>
        {/* <Text style={{...styles.fontextralarge, color: SCREEN.OREANGE}}>
          {data?.rent_value} {translations['AED']}
        </Text> */}
        {/* <Text
          style={{
            ...styles.textGrey,
            marginHorizontal: 10,
            ...styles.fontlarge,
          }}>
          {data?.rent_type}
        </Text> */}
      </View>

      <View
        style={[
          styles.overView,
          {
            width: horizontal
              ? SCREEN.WIDTH * 0.71 * 0.92
              : SCREEN.WIDTH * 0.85 * 0.92,
          },
        ]}>
        <View style={styles.lightColorStar}>
          <Image source={require('../../assets/png/star.png')} />
          <Text style={styles.space}>{data?.rate}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.lightColor}>
            <TouchableOpacity onPress={() => handleShare(data.id)}>
              <Entypo
                name="share-alternative"
                size={14}
                style={{color: 'white'}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.lightColor,
              {
                marginHorizontal: 5,
                backgroundColor: COLORS().tranparentWhite,
              },
            ]}>
            {isFav ? (
              <TouchableOpacity
                onPress={() =>
                  removeFavoriteProduct(data.id, arr =>
                    dispatch(setFavIds(arr)),
                  )
                }>
                <EvilIcons name="trash" size={24} color={COLORS().error} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  addFavoriteProduct(data.id, arr => dispatch(setFavIds(arr)))
                }>
                <AntDesign
                  name="heart"
                  style={{
                    color: favIds.includes(data.id)
                      ? 'red'
                      : COLORS().lightGrey,
                  }}
                  size={16}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // height: SCREEN.WIDTH * 0.775,
    alignSelf: 'center',
    backgroundColor: COLORS().white,
    borderColor: COLORS().bottomBorder,
    borderRadius: SCREEN.RADIUS,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 5,
  },
  box: {
    height: SCREEN.WIDTH * 0.775 * 0.365,
    display: 'flex',
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
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: SCREEN.GREY,
    borderRadius: SCREEN.RADIUS * 0.5,
    marginTop: 10,
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
    fontWeight: '700',
  },
  smallText: {fontSize: 9, color: SCREEN.BLUE},
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
  },
  lastbox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
  },
  overView: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 20,

    left: 15,
  },
  lightColorStar: {
    height: 24,
    width: 37,
    borderRadius: 8,
    backgroundColor: COLORS().tranparentWhite,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightColor: {
    height: 32,
    width: 32,
    borderRadius: 8,
    backgroundColor: COLORS().red,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {alignItems: 'center', flexDirection: 'row'},
});
export default NewHomeCard;

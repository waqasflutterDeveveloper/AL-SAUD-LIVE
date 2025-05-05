import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Animated,
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
  Linking,
} from 'react-native';
import SCREEN from '../../Layout';
import {useDispatch, useSelector} from 'react-redux';
import VideoPlayer from '../Components/Video/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import house from '../consts/houses';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TouchableOpacityBtn from '../Components/Buttons/TouchBtn';
import ImageModal from '../Components/Modal/ImageModal';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useNavigation} from '@react-navigation/native';
import BasicButton from '../Components/Buttons/BasicButton';
import {COLORS} from '../consts/colors';
const {width} = Dimensions.get('screen');
import ImageGallery from '../Components/Slider/ImageGallery';
import DetailScreenTab from '../Components/Tab/DetailScreenTab';
import NewBottomSheet from '../Components/Sheets/New_BottomSheet';
import {api} from '../axios';
import {setFavIds, setHomeDetailedData} from '../Store/HomeData/HomeSlice';
import Spinner from '../Components/Spinner';
import MapView, {Marker} from 'react-native-maps';
import {SCREEN_HEIGHT} from '@gorhom/bottom-sheet';
import {TouchableOpacity} from 'react-native';
import {useLanguage} from '../Helpers/LanguageContext';
import {arTranslations} from '../translations/ar';
import {enTranslations} from '../translations/en';
import {
  INFINITE_ANIMATION_ITERATIONS,
  LeafletView,
  AnimationType,
} from '@vgatica9/react-native-leaflet-maps';
import {addFavoriteProduct} from '../Helpers/FavHelpers';

const DetailsScreen = ({route}) => {
  const id = route.params?.id;
  const {language, switchLanguage} = useLanguage();

  const translations = language === 'ar' ? arTranslations : enTranslations;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const favIds = useSelector(state => state.Home.favIds);

  useEffect(async () => {
    // console.log(route.params, 'tttttt');

    if (id) {
      try {
        const res = await api.post(
          `https://odooerp-ae-property.odoo.com/api/get_property_details/${id}`,
          {},
        );
        // console.log(res?.data?.result[0], 'tttttt');

        dispatch(setHomeDetailedData(res?.data?.result[0]));
      } catch (err) {}
    }
  }, [id]);
  const whatsapp_message_Subject =
    'Inquiry about Property Availability and Details';
  const email_message = `
  Dear Al Saud Real-estate,
  I am writing to inquire about the availability and details of the property located at ${HomeDetailedData?.name} + https://alsaudrealestate.ae/details_screen?id=${HomeDetailedData?.id} .
  I am interested in learning more about the following aspects of the property:
  Size and layout of the property
  Number of bedrooms and bathrooms
  Amenities and features included
  Rental price
  Availability for viewing or inspection
  Additionally, I would like to know if there are any specific requirements or procedures for submitting an application or scheduling a visit to the property.
  I am very interested in this property and would appreciate any information or assistance you can provide. Please feel free to contact me 
  Thank you for your attention to this inquiry. I look forward to hearing from you soon.
  Best regards,`;
  const whatsapp_message = `Subject: Inquiry about Property Availability and Details
  Dear Al Saud Real-estate,
  I am writing to inquire about the availability and details of the property located at ${HomeDetailedData?.name} + https://alsaudrealestate.ae/details_screen?id=${HomeDetailedData?.id}  .
  I am interested in learning more about the following aspects of the property:
  Size and layout of the property
  Number of bedrooms and bathrooms
  Amenities and features included
  Rental price
  Availability for viewing or inspection
  Additionally, I would like to know if there are any specific requirements or procedures for submitting an application or scheduling a visit to the property.
  I am very interested in this property and would appreciate any information or assistance you can provide. Please feel free to contact me 
  Thank you for your attention to this inquiry. I look forward to hearing from you soon.
  Best regards,`;
  const navigation = useNavigation();
  const HomeDetailedData = useSelector(state => state.Home.Detailed);

  const {userInfo} = useSelector(state => state.userinfo);
  const [arr, setArr] = useState([]);
  const [images_urls, setimages_urls] = useState([]);
  const [videoId, setvideoId] = useState(null);
  const [latilong, setlatilong] = useState(null);
  const [amenties, setamenties] = useState([]);

  const [floor, setFloor] = useState(null);
  const {isDark} = useSelector(state => state.Home);

  useEffect(() => {
    if (HomeDetailedData) {
      var strarr = HomeDetailedData?.amenities_compile?.split(',');
      var IconsArr = HomeDetailedData?.amenities_icons_compile?.split(',');
      var newArr = [];
      for (let i = 0; i < strarr?.length; i++) {
        newArr.push({name: strarr[i], icon: IconsArr[i]});
      }
      setArr(newArr);
      if (HomeDetailedData?.images_urls) {
        var images = HomeDetailedData?.images_urls?.split(',');
        setimages_urls(images);
      }
      if (HomeDetailedData?.video_url) {
        var video_id = HomeDetailedData?.video_url?.split('v=')[1];
        var ampersandPosition = video_id.indexOf('&');
        if (ampersandPosition != -1) {
          video_id = video_id.substring(0, ampersandPosition);
        }
        // console.log(video_id, 'video_id');
        setvideoId(video_id);
      }
      let lat;
      setLoading(false);

      if (HomeDetailedData?.location) {
        lat = HomeDetailedData?.location.split(',');

        setlatilong(lat);
      }
    }
    if (HomeDetailedData?.floor_id?.[1]) {
      const inputString = HomeDetailedData?.floor_id?.[1];

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
    return () => {};
  }, [HomeDetailedData]);
  const HandleMap = () => {
    // openMap({latitude: 37.865101, longitude: -119.53833});
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${latilong?.[0]},${latilong?.[1]}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  const parsedImages = typeof house?.images_urls === 'string'
      ? house.images_urls.split(',') // split by comma
      : [];
  return (
    <SafeAreaView>
      <StatusBar translucent backgroundColor="transparent" />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ScrollView
            style={{backgroundColor: COLORS(isDark).dark}}
            showsVerticalScrollIndicator={false}>
            {/*
            {images_urls?.length > 0 ? (
              <View style={{height: 420}}>
                <ImageGallery Data={images_urls} />
              </View>
            ) : (
              <Image
                source={
                  house.image_128
                    ? {uri: `data:image/jpeg;base64,${house.image_128}`}
                    : require('../assets/card_image.png')
                }
                style={style.cardImage}
              />
            )}
            */}

            {parsedImages.length > 0 ? (
                    <View style={{ height: 420 }}>
                      <ImageGallery Data={parsedImages} />
                    </View>
                  ) : (
                    <Image
                      source={
                        house?.image_128
                          ? { uri: `data:image/jpeg;base64,${house.image_128}` }
                          : require('../assets/card_image.png')
                      }
                      style={style.cardImage}
                      resizeMode="cover"
                    />
                  )}

            <View style={style.favIcon}>
              <TouchableOpacity
                onPress={() =>
                  addFavoriteProduct(HomeDetailedData.id, arr =>
                    dispatch(setFavIds(arr)),
                  )
                }>
                <AntDesign
                  name="heart"
                  style={{
                    color: favIds.includes(HomeDetailedData.id)
                      ? 'red'
                      : COLORS().lightGrey,
                  }}
                  size={24}
                />
              </TouchableOpacity>
            </View>

            <View
              style={[
                style.detailsContainer,
                {backgroundColor: COLORS(isDark).dark},
              ]}>
              <View
                style={[
                  style.greyBox,
                  {backgroundColor: COLORS(isDark).cardForDark},
                ]}>
                <Text style={style.header}>{HomeDetailedData?.name}</Text>
                <View style={style.codebox}>
                  <Text style={style.code}>
                    {' '}
                    {translations['Code']}: {HomeDetailedData?.code}
                  </Text>
                  <Text style={{marginHorizontal: 15, color: SCREEN.DARKGREY}}>
                    <Ionicons name="star" size={16} color="gold" /> 5
                  </Text>
                </View>
                <View style={style.lastbox}>
                  {/* <Text
                    style={{...style.fontextralarge, color: SCREEN.OREANGE}}>
                    {HomeDetailedData?.rent_value} {translations['AED']}
                  </Text>
                  <Text
                    style={{
                      ...style.textGrey,
                      marginHorizontal: 10,
                      ...style.fontlarge,
                    }}>
                    {HomeDetailedData?.rent_type}
                  </Text> */}
                  <Text style={{...style.Residential, color: SCREEN.OREANGE}}>
                    {HomeDetailedData?.type}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  width: '100%',
                  display: 'flex',
                }}>
                <View style={styles.firstbox}>
                  <View style={styles.secondbox}>
                    <View style={styles.imageContainer}>
                      <Image source={require('../assets/bed.png')} />
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>
                          {HomeDetailedData?.room_no}
                        </Text>
                        <Text style={styles.textGrey}>
                          {translations['Rooms']}{' '}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.imageContainer}>
                      <Image source={require('../assets/bathroom.png')} />
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>
                          {HomeDetailedData?.bathroom_no}
                        </Text>
                        <Text style={styles.textGrey}>
                          {translations['Bath']}{' '}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.imageContainer}>
                      <Image source={require('../assets/stairs.png')} />
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>{floor}</Text>
                        <Text style={styles.textGrey}>
                          {translations['Floors']}{' '}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.imageContainer}>
                      <Image source={require('../assets/area.png')} />
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>
                          {parseFloat(HomeDetailedData?.area).toFixed(2)}
                        </Text>
                        <Text style={styles.textGrey}>
                          {translations['m2']}{' '}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {videoId && (
                  <View style={{height: 200, width: '90%', marginBlock: 20}}>
                    {videoId && <VideoPlayer videoId={videoId} />}
                  </View>
                )}

                {HomeDetailedData?.flat_plan && (
                  <TouchableOpacityBtn
                    color={SCREEN.WHITE}
                    text={`${translations['View Plans']}`}
                    width={'90%'}
                    style={{
                      borderRadius: 10,
                      paddingVertical: 12,
                      marginVertical: 15,
                    }}
                    textcolor={SCREEN.OREANGE}
                    outline={SCREEN.OREANGE}
                    type="basic"
                    textSize={14}
                    Icon={
                      <Image
                        style={styles.btnicon}
                        source={require('../assets/architect.png')}
                      />
                    }
                    onPress={() => setModalVisible(true)}
                  />
                )}

                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '90%',
                  }}>
                  {/* <Image
            style={styles.fullmap}
            source={require('../assets/fullmap.png')}
          /> */}
                  {latilong?.length > 0 && (
                    <View
                      style={{
                        justifyContent: 'center',
                        width: '100%',
                        height:
                          HomeDetailedData?.description && arr?.length > 0
                            ? 300
                            : 300,
                        borderRadius: 15,

                        backgroundColor: 'white',
                      }}>
                      {Platform.OS === 'ios' && latilong?.length > 0 && (
                        <LeafletView
                          style={{
                            height:
                              HomeDetailedData?.description && arr?.length > 0
                                ? 300
                                : 300,
                            width: '100%',
                            borderRadius: 15,
                          }}
                          onMessageReceived={e => {
                            // console.log('test', e);
                          }}
                          mapCenterPosition={{
                            lat: +latilong?.[0],
                            lng: +latilong?.[1],
                          }}
                          mapMarkers={[
                            {
                              id: HomeDetailedData?.id,
                              position: {
                                lat: [+latilong?.[0]],
                                lng: [+latilong?.[1]],
                              },
                              icon: () => <Entypo name="location-pin" />, // HTML element that will be displayed as the marker.  It can also be text or an SVG string.
                              size: [32, 32],
                              animation: {
                                duration: '.5',
                                delay: 0,
                                iterationCount: INFINITE_ANIMATION_ITERATIONS,
                                type: AnimationType.FADE,
                              },
                            },
                          ]}
                        />
                      )}
                      {Platform.OS != 'ios' && latilong?.length > 0 && (
                        <MapView
                          initialRegion={{
                            latitude: +latilong?.[0],
                            longitude: +latilong?.[1],
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                          }}
                          style={{
                            height:
                              HomeDetailedData?.description && arr?.length > 0
                                ? 300
                                : 300,
                            width: '100%',
                            borderRadius: 15,
                          }}>
                          <Marker
                            coordinate={{
                              latitude: +latilong?.[0],
                              longitude: +latilong?.[1],
                            }}
                            title="Custom Marker Title"
                            pinColor={'#E9612F'}
                            description="Custom Marker Description"
                          />
                        </MapView>
                      )}
                    </View>
                  )}
                  <View style={{marginTop: 10}}>
                    {/* Title and price container */}
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '500',
                            color: COLORS(isDark).WhiteForDark,
                            marginBottom: 10,
                          }}>
                          {translations['Location']}
                        </Text>
                        <Text
                          style={{
                            fontWeight: '500',
                            color: COLORS(isDark).WhiteForDark,
                            fontSize: 14,
                          }}>
                          {HomeDetailedData?.building_id?.[1]} -
                          {HomeDetailedData?.state_id?.[1]}
                        </Text>
                      </View>
                      {HomeDetailedData?.location && (
                        <MaterialIcons
                          name="directions"
                          onPress={HandleMap}
                          size={40}
                          color={COLORS().blue}
                        />
                      )}
                    </View>
                  </View>
                  {HomeDetailedData?.description && (
                    <>
                      <Text
                        style={[
                          styles.Description,
                          {color: COLORS(isDark).WhiteForDark},
                        ]}>
                        {translations['Description']}
                      </Text>

                      <Text
                        style={[
                          styles.longDescription,
                          {color: COLORS(isDark).WhiteForDark},
                        ]}>
                        {HomeDetailedData?.description}
                      </Text>
                    </>
                  )}

                  <View style={{marginTop: 10}}>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      {HomeDetailedData?.amenities_compile &&
                        arr?.length > 0 && (
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '500',
                              color: COLORS(isDark).WhiteForDark,
                              marginBottom: 10,
                            }}>
                            {translations['Amenities']}
                          </Text>
                        )}

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '100%',
                          flexWrap: 'wrap',
                          marginVertical: 5,
                        }}>
                        {HomeDetailedData?.amenities_compile &&
                          arr?.length > 0 &&
                          arr.map(e => {
                            return (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                  width: '50%',
                                  marginVertical: 10,
                                }}>
                                <Image
                                  size={20}
                                  style={{width: 30, height: 20}}
                                  color={COLORS().dark}
                                  source={{uri: e.icon}}
                                />
                                <Text
                                  style={{
                                    color: COLORS(isDark).WhiteForDark,
                                    fontSize: 16,
                                    marginHorizontal: 4,
                                  }}>
                                  {e.name}
                                </Text>
                              </View>
                            );
                          })}
                      </View>
                      <View
                        style={{
                          width: '100%',
                          // position: 'absolute',
                          // // bottom: SCREEN_HEIGHT,
                          // bottom: 0,
                          // left: 0,
                          // right: 0,
                          display: 'flex',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <NewBottomSheet
                          Height={200}
                          Content={
                            <View
                              style={{
                                ...style.flexboxcolumn,
                                width: '100%',
                              }}>
                              <View
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  width: '100%',
                                }}>
                                <Text
                                  style={{
                                    color: 'black',
                                    fontWeight: 'bold',
                                    marginVertical: 6,
                                  }}>
                                  {translations['Customer Service']}
                                </Text>
                              </View>
                              <View style={{...style.flexbox, width: '100%'}}>
                                <TouchableOpacity
                                  onPress={() => {
                                    const phoneNumber = '800257283'; // Replace with the WhatsApp number
                                    Linking.openURL(
                                      `whatsapp://send?text=${whatsapp_message}&phone=${phoneNumber}`,
                                    );
                                  }}>
                                  <View style={style.whatsapp}>
                                    <View>
                                      <Image
                                        source={require('../assets/png/whatsapp.png')}
                                      />
                                    </View>
                                    <Text style={{color: 'black'}}>
                                      {translations['whatsapp']}{' '}
                                    </Text>
                                  </View>
                                </TouchableOpacity>

                                <View style={style.whatsapp}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      const phoneNumber = '800 257 283';
                                      Linking.openURL(`tel:${phoneNumber}`);
                                    }}>
                                    <View>
                                      <Image
                                        source={require('../assets/png/call.png')}
                                      />
                                    </View>
                                    <Text style={{color: 'black'}}>
                                      {translations['Phone call']}{' '}
                                    </Text>
                                  </TouchableOpacity>
                                </View>

                                <View style={style.whatsapp}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      const emailAddress =
                                        'realestate@alsaud.ae'; // Replace with the desired email address
                                      Linking.openURL(
                                        `mailto:${emailAddress}?subject=${whatsapp_message_Subject}&body=${email_message}`,
                                      );
                                    }}>
                                    <View>
                                      <Image
                                        source={require('../assets/png/mail.png')}
                                      />
                                    </View>
                                    <Text style={{color: 'black'}}>
                                      {translations['Mail']}{' '}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          }
                        />
                        <TouchableOpacity
                          style={{
                            backgroundColor: 'rgba(24, 88, 148, 0.05)',
                            width: '45%',
                            borderRadius: 10,
                          }}
                          onPress={() =>
                            userInfo?.uid
                              ? navigation.navigate('LiveVisit', {
                                  id: HomeDetailedData?.id,
                                })
                              : navigation.navigate('login')
                          }>
                          <Text
                            style={{
                              color: SCREEN.BLUE,
                              paddingVertical: 15,
                              textAlign: 'center',
                            }}>
                            {translations['Live visit']}
                          </Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacityBtn
              color={}
              text=""
              width={'45%'}
              // height={80}
              // styleText={{paddingVertical: 10}}
              style={{
                borderRadius: 10,
                paddingVertical: 12,
                marginVertical: 15,
              }}
              textcolor={}
              type="basic"
              textSize={14}
            /> */}
                      </View>
                    </View>
                  </View>
                </View>
                {modalVisible && (
                  <ImageModal
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    image={HomeDetailedData?.flat_plan}
                  />
                )}
              </View>

              {/* <DetailScreenTab index={0} item={HomeDetailedData} /> */}
            </View>

            <View style={{display: 'none'}}>
              <BasicButton
                text={`${translations['Request']}`}
                width={150}
                style={{bottom: 60, width: 110, borderRadius: 100}}
                styleText={{fontSize: 14}}
              />
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  line: {
    borderBottomColor: SCREEN.MIDDLEGREY,
    borderRightColor: 'transparent',
    height: 2,
    borderWidth: 1,
    width: '100%',
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    marginVertical: 2,
  },
  favIcon: {
    position: 'absolute',
    top: 30,
    right: 20,
  },
  backgroundImageContainer: {
    elevation: 20,
    // marginHorizontal: 20,
    // marginTop: 20,
    alignItems: 'center',
    height: 350,
    zIndex: 1,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 20,

    zIndex: 55555,
    position: 'absolute',
    display: 'flex',
    width: '100%',
    left: 0,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS().white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  ratingTag: {
    height: 30,
    width: 35,
    backgroundColor: COLORS().blue,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  virtualTag: {
    top: -20,
    width: 120,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS().dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  footer: {
    height: 70,
    backgroundColor: COLORS().light,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  bookNowBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS().dark,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  detailsContainer: {
    // flex: 1,
    paddingHorizontal: 20,
    // marginTop: 40,
    //  position: 'absolute',
    // top: -80,
    // marginHorizontal:10,
    backgroundColor: COLORS().white,
    zIndex: 5,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 20,
    height: '100%',
    marginBottom: 70,
  },
  facility: {flexDirection: 'row', marginRight: 15},
  facilityText: {marginLeft: 5, color: COLORS().grey},
  twoIcon: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 8,
    zIndex: 55555,
    position: 'absolute',
    display: 'flex',
    right: 0,
    top: 30,
  },
  icon: {
    color: COLORS().grey,
    backgroundColor: COLORS().white,
    borderRadius: 6,
    marginHorizontal: 3,
    fontWeight: 600,
    fontSize: 18,
  },

  facility: {flexDirection: 'row', marginRight: 15},
  facilityText: {marginLeft: 5, color: COLORS().dark, fontSize: 12},
  line: {
    borderBottomColor: COLORS().line,
    // borderColor: 'white',
    borderWidth: 0.5,
    opacity: 0.2,
    marginVertical: 20,
    // height: 10,
  },
  dashline: {
    width: 50,
    height: 2,
    color: '#DCDCDC',
    borderWidth: 1.5,
    backgroundColor: '#DCDCDC',
    opacity: 0.6,
    borderRadius: 3,
    alignSelf: 'center',
    marginHorizontal: 'auto',
  },
  allIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
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
  callSupport: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  callSupportIcon: {
    backgroundColor: COLORS().red,
    padding: 8,
    borderRadius: 50,
  },

  container: {
    height: 50, // 400,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  greyBox: {
    backgroundColor: '#F9F9F9',
    width: SCREEN.WIDTH * 0.92,
    height: SCREEN.WIDTH * 0.92 * 0.34,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 10,
  },
  codebox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  code: {color: SCREEN.DARKGREY},
  header: {
    color: 'black',
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
  lastbox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  Residential: {
    paddingHorizontal: 8,
    backgroundColor: SCREEN.GREY,
    borderRadius: 5,
    paddingVertical: 5,
    marginHorizontal: 20,
  },
  flexbox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    flexDirection: 'row',
  },
  flexboxcolumn: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  whatsapp: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
});
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
  firstbox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  secondbox: {
    // height: SCREEN.WIDTH * 0.775 * 0.185,
    width: SCREEN.WIDTH * 0.92,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS().white,
    borderRadius: SCREEN.RADIUS * 0.5,
    marginTop: 10,
    paddingVertical: 10,

    marginBottom: 16,
  },
  thirdbox: {
    height: SCREEN.WIDTH * 0.775 * 0.185,
    width: (SCREEN.WIDTH * 0.91 * 0.92 * 2) / 3,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS().white,
    borderRadius: SCREEN.RADIUS * 0.5,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    height: SCREEN.WIDTH * 0.775 * 0.145 * 0.48,
    flexDirection: 'row',
    // overflow: 'hidden',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: SCREEN.GREY,
    marginHorizontal: 4,
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
    // height: SCREEN.WIDTH * 0.775 * 0.28,
    width: SCREEN.WIDTH * 0.91 * 0.92,
  },
  btnicon: {
    width: 20,
    height: 20,
  },
  fullmap: {
    width: '100%',
    height: 100,
  },
  seeMOre: {
    color: SCREEN.OREANGE,
    marginTop: 15,
    marginVertical: 25,
  },
  Description: {
    color: COLORS().dark,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  longDescription: {
    color: COLORS().dark,
    marginVertical: 5,
  },
  Amenities: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS().dark,
    marginBottom: 10,
  },
  Amenitiesbox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  Amenitiesinnerbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  secbox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderColor: SCREEN.MIDDLEGREY,
    borderWidth: 1,
    borderRadius: 10,
    width: SCREEN.WIDTH * 0.91 * 0.92,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  secboximage: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // marginHorizontal: 20,
    width: '100%',
    // backgroundColor: 'blue',
  },
  secboxtext: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 10,
    width: 100,
    // backgroundColor: 'white',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  codebox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  code: {color: SCREEN.DARKGREY},
  header: {
    color: 'black',
  },
  name: {
    color: COLORS().dark,
    fontWeight: 'bold',
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
  },
  dark: {
    color: COLORS().dark,
  },
});
export default DetailsScreen;

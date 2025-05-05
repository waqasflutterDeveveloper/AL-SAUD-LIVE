import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import {useSelector, useDispatch} from 'react-redux';

import MapView, {Marker} from 'react-native-maps';
import {SCREEN_HEIGHT} from '@gorhom/bottom-sheet';
import LargeHomeCard from '../../Components/Cards/LargeHomeCard';
import LargeCardHorizonital from '../../Components/Cards/LargeCardHorizonital';
import SearchBox from '../../Components/Inputs/SearchBox';
import {setHomeDetailedData} from '../../Store/HomeData/HomeSlice';
import {api} from '../../axios';
import {usesearchApi} from '../../apis/Home/index';

import {useReviewsApi} from '../../apis/Home';
import {
  INFINITE_ANIMATION_ITERATIONS,
  LeafletView,
  AnimationType,
} from '@vgatica9/react-native-leaflet-maps';
// import {
//   AnimationType,
//   INFINITE_ANIMATION_ITERATIONS,
//   LeafletView,
// } from '@charlespalmerbf/react-native-leaflet-js';
const FullMapFilter = ({navigation, route}) => {
  const HomeData = useSelector(state => state.Home.data);
  // const [selectedProp, setselectedProp] = useState(null);
  const {mutate: useReviews} = useReviewsApi();

  const refRB = useRef();
  const [markdata, setmarkdata] = useState([]);

  const dispatch = useDispatch();
  const HomeDetailedData = useSelector(state => state.Home.Detailed);

  const handleSelectedProp = async id => {
    try {
      const res = await api.post(
        `https://odooerp-ae-property.odoo.com/api/get_property_details/${id}`,
        {},
      );

      dispatch(setHomeDetailedData(res?.data?.result[0]));
    } catch (err) {}
  };
  const [text, settext] = useState(false);
  const {mutate: searchapiCall} = usesearchApi();

  const onChangeText = e => {
    settext(e);
  };
  const onSubmitEditing = async e => {
    searchapiCall({text});
  };
  const handleHomeClick = () => {
    // dispatch(setHomeDetailedData(house));
    useReviews(HomeDetailedData);
    navigation.navigate('Details_Screen');
  };
  const [region, setRegion] = useState({
    latitude: 33.8220918,
    longitude: -117.9199742,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const mapRef = useRef();
  // useEffect(() => {
  //   if (mapRef.current) {
  //     // list of _id's must same that has been provided to the identifier props of the Marker
  //     mapRef.current.fitToCoordinates(markdata.map(({_id}) => _id));
  //   }
  // }, [markdata]);
  useEffect(() => {
    // Zoom in to markers
    // console.log(markdata, 'markdata');

    if (markdata.length > 0 && mapRef.current) {
      // console.log(markdata);
      mapRef.current.fitToCoordinates(
        markdata.map(marker => marker._id),
        {
          edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
          animated: true,
        },
      );
    }
  }, [markdata]);
  const [activeInput, setActiveInput] = useState(false);
  var markers = [
    {
      latitude: 45.65,
      longitude: -78.9,
      title: 'Foo Place',
      subtitle: '1234 Foo Drive',
    },
  ];
  return (
    <SafeAreaView>
      <View
        style={{
          justifyContent: 'center',
          width: '100%',
          height: SCREEN_HEIGHT,
          borderRadius: 15,

          position: 'relative',
        }}>
        {Platform.OS === 'ios' ? (
          <LeafletView
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 15,
            }}
            onMessageReceived={e => {
              // console.log('test', e);
            }}
            mapCenterPosition={{lat: 25.23608, lng: 55.32026}}
            mapMarkers={markdata.map(item => {
              return {
                id: item?._id,
                position: {lat: [item?.latitude], lng: [item?.longitude]},
                icon: () => <Entypo name="location-pin" />,
                size: [52, 52],
                animation: {
                  duration: '.5',
                  delay: 0,
                  iterationCount: INFINITE_ANIMATION_ITERATIONS,
                  type: AnimationType.FADE,
                },
              };
            })}
          />
        ) : (
          <MapView
            ref={mapRef}
            initialRegion={{
              latitude: 25.15925,
              longitude: 55.33492,
              latitudeDelta: 0.922,
              longitudeDelta: 0.421,
            }}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 15,
            }}>
            {markdata.map(item => {
              return (
                <>
                  <Marker
                    key={item?._id}
                    // identifier={item?._id}
                    coordinate={{
                      latitude: +item?.latitude,
                      longitude: +item?.longitude,
                    }}
                    pinColor={'#E9612F'}
                    title={item?.name}
                    description={item?.code}
                    onPress={() => handleSelectedProp(item?._id)}
                  />
                </>
              );
            })}
            {/* {console.log(markdata, 'markdatamarkdata')} */}
          </MapView>
        )}

        <View
          style={{
            justifyContent: 'center',
            borderRadius: 15,
            position: 'absolute',
            top: 0,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <SearchBox
            onPress={undefined}
            title={'What are you looking for?'}
            value={text}
            onChangeText={onChangeText}
            color={undefined}
            styleInput={undefined}
            styleInputContainer={undefined}
            onSubmitEditing={onSubmitEditing}
            markdata={markdata}
            setmarkdata={setmarkdata}
            settext={settext}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            borderRadius: 15,
            position: 'absolute',
            bottom: StatusBar.currentHeight + 130,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            // left: 100,
          }}>
          {HomeDetailedData && (
            <TouchableOpacity onPress={handleHomeClick}>
              <LargeCardHorizonital
                house={HomeDetailedData}
                orinteation={'horzintal'}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FullMapFilter;

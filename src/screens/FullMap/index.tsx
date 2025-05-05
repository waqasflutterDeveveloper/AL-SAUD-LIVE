import {SafeAreaView, View, ScrollView, Text, Image} from 'react-native';
import React, {useState, useRef} from 'react';
// import styles from './styles';
import LargeCadList from '../../Components/Lists/LargeCardList';
import {COLORS} from '../../consts/colors';
import Header from '../../Components/Header';
import SearchInput from '../../Components/Inputs/SearchInput';
import font from '../../consts/font';
import BasicBtn from '../../Components/Buttons/BasicButton';
import BottomSheet from '../../Components/Sheets/New_BottomSheet';
import {useSelector, useDispatch} from 'react-redux';
import SearchCategory from '../../Components/Cards/SearchCategory';
import SCREEN from '../../../Layout';
import RecentCardList from '../../Components/Lists/RecentCardList';
import PopularCardList from '../../Components/Lists/PopularCardList';
import MapView from 'react-native-maps';
import {SCREEN_HEIGHT} from '@gorhom/bottom-sheet';
import LargeHomeCard from '../../Components/Cards/LargeHomeCard';
import LargeCardHorizonital from '../../Components/Cards/LargeCardHorizonital';

const FullMap = ({navigation, route}) => {
  const HomeData = useSelector(state => state.Home.data);
  const refRB = useRef();
  const HomeDetailedData = route.params.HomeDetailedData;
  const onChangeText = e => {
    
  };
  const [activeInput, setActiveInput] = useState(false);

  return (
    <SafeAreaView>
      <View
        style={{
          justifyContent: 'center',
          width: '100%',
          height: SCREEN_HEIGHT,
          borderRadius: 15,

          // backgroundColor: 'red',
        }}>
        <MapView
          initialRegion={{
            latitude: 30.033333,
            longitude: 31.23334,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 15,
          }}
        />
        <View
          style={{
            borderRadius: 15,
            bottom: 150,
          }}>
          <LargeCardHorizonital
            house={HomeDetailedData}
            orinteation={'horzintal'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FullMap;

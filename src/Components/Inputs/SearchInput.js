import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import FirstInput from './FirstInput';
import SCREEN from '../../../Layout';
import AntDesign from 'react-native-vector-icons/AntDesign';
import font from '../../consts/font';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../consts/colors';
import {useSelector} from 'react-redux';
const SearchInput = ({
  editable = true,
  onPress,
  title,
  value,
  onChangeText,
  color,
  styleInput,
  styleInputContainer,
  location = true,
  map = true,
  onFocus,
  onSubmitEditing,
}) => {
  const navigation = useNavigation();
  const {isDark} = useSelector(state => state.Home);

  return (
    <View style={styles.searchbox}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          borderRadius: 8,
          alignItems: 'center',
          paddingHorizontal: 10,
          marginHorizontal: 10,
          ...styleInputContainer,
        }}>
        <AntDesign name="search1" size={12} />
        <TextInput
          style={{
            width: font.width * 0.55,
            paddingVertical: 8,
            fontSize: 11,
            color: 'black',
            ...styleInput,
          }}
          value={value}
          placeholderTextColor={SCREEN.DARKGREY}
          placeholder={title}
          onChangeText={value => onChangeText(value)}
          onSubmitEditing={e => onSubmitEditing(e)}
          underlineColorAndroid="transparent"
          editable={editable}
          onFocus={onFocus}
        />
      </TouchableOpacity>
      {location && (
        <View style={styles.orangeboxmain}>
          <TouchableOpacity onPress={() => navigation.navigate('Filtration')}>
            <View style={styles.orangebox}>
              <Image
                style={{height: '110%', width: '110%'}}
                source={require('../../assets/filter.png')}
              />
              {/* <Entypo name="chevron-right" color={'white'} size={30} /> */}
            </View>
          </TouchableOpacity>
        </View>
      )}
      {map && (
        <View style={[styles.orangeboxmain]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('FullMapFilter')}>
            <View style={[styles.orangebox]}>
              <Image
                style={{height: '100%', width: '100%'}}
                source={require('../../assets/map.png')}
              />
              {/* <Entypo name="chevron-right" color={'white'} size={30} /> */}
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  orangeboxmain: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  orangebox: {
    height: 45,
    width: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchbox: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
});

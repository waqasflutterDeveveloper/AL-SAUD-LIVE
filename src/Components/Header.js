import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {COLORS} from '../consts/colors';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Header = ({title, back = false, style, display}) => {
  const navigation = useNavigation();
  const {isDark} = useSelector(state => state.Home);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
      style={[
        styles.container,
        {
          paddingHorizontal: back ? 0 : 15,
          ...style,
          backgroundColor: COLORS(isDark).white,
          marginTop: StatusBar.currentHeight,
        },
      ]}>
      {back && (
        <Icon
          name="chevron-back"
          size={20}
          color={'black'}
          style={styles.back}
        />
      )}
      {title && (
        <Text style={[styles.title, {color: COLORS(isDark).WhiteForDark}]}>
          {title}
        </Text>
      )}
      {display}
    </TouchableOpacity>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    // backgroundColor: 'green',
  },
  title: {fontWeight: 'bold', fontSize: 15, color: 'black'},
  back: {marginHorizontal: 10},
});

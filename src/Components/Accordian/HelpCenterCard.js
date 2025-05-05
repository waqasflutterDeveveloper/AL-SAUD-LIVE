import React from 'react';

import {View, Text, Dimensions, StyleSheet} from 'react-native';

const ScreenWidth = Dimensions.get('window').width;

import {COLORS} from '../../consts/colors';
import {useSelector} from 'react-redux';
const HelpCenterCard = ({icon, value, text}) => {
  const {isDark} = useSelector(state => state.Home);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconBox}>
          {icon}
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    width: ScreenWidth,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: '100%',
    width: ScreenWidth - 30,
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 20,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: COLORS().bottomBorder,
  },
  iconBox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  text: {color: 'black', fontWeight: 'bold'},
});
export default HelpCenterCard;

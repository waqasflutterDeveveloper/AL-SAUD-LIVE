import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../../consts/colors';

const Time = ({bgcolor, text, HandleTimeSelect, Timee}) => {
  //
  return (
    <TouchableOpacity onPress={() => HandleTimeSelect(text)}>
      <View
        style={{
          ...styles.timeBox,
          backgroundColor: Timee == text ? 'green' : bgcolor,
          color: Timee == text ? 'white' : 'black',
        }}>
        <Text
          style={{...styles.time, color: Timee == text ? 'white' : 'black'}}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  time: {
    fontWeight: 'bold',
  },
  timeBox: {
    paddingHorizontal: 15,
    borderColor: COLORS().grey,
    borderRadius: 10,
    paddingVertical: 10,
    margin: 5,
  },
});

export default Time;

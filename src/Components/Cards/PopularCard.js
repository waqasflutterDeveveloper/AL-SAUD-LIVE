import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../consts/colors';
const PopularCard = ({title, settext}) => {
  return (
    <TouchableOpacity style={styles.row} onPress={() => settext(title)}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PopularCard;

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: COLORS().lightBorder,
    borderRadius: 8,
    marginLeft: 10,
  },
  title: {marginHorizontal: 10, color: COLORS().blue, fontSize: 13},
});

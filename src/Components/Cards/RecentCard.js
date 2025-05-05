import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../consts/colors';
const RecentCard = ({title, settext}) => {
  return (
    <TouchableOpacity style={styles.row} onPress={() => settext(title)}>
      <AntDesign name="clockcircleo" size={13} color={COLORS().dark} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default RecentCard;

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  title: {marginHorizontal: 10, color: COLORS().dark, fontSize: 13},
});

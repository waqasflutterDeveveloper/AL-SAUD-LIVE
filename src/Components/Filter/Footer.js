import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../consts/colors';
const Footer = ({Submit, Reset}) => {
  return (
    <View style={styles.subsection}>
      <TouchableOpacity onPress={() => Reset()} style={styles.filledBtn}>
        <Text style={styles.filledText}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Submit()} style={styles.filledBtnOrange}>
        <Text style={styles.filledTextW}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  subsection: {
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    height: 100,
    flexDirection: 'row',
    backgroundColor: COLORS().white,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 130,
  },
  filledBtn: {
    flexDirection: 'row',
    backgroundColor: '#d0dde9',
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: 150,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  filledBtnOrange: {
    flexDirection: 'row',
    backgroundColor: '#E9612F',
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: 150,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  filledText: {
    color: COLORS().blue,
    textAlign: 'center',
  },
  filledTextW: {
    color: COLORS().white,
    textAlign: 'center',
  },
});

export default Footer;

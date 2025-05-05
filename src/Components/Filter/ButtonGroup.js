import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../consts/colors';

const ButtonGroup = ({selectedBtn, setSelectedBtn}) => {
  return (
    <View style={styles.btnGroup}>
      <TouchableOpacity
        onPress={() => setSelectedBtn(1)}
        style={selectedBtn ? styles.selectedBtn : styles.unselectedBtn}>
        <Text style={selectedBtn ? styles.selectedText : styles.unselectedText}>
          Building
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSelectedBtn(0)}
        style={!selectedBtn ? styles.selectedBtn : styles.unselectedBtn}>
        <Text
          style={!selectedBtn ? styles.selectedText : styles.unselectedText}>
          Projects
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnGroup: {
    width: '90%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS().light,
    height: 52,
    borderRadius: 10,
    marginVertical: 10,
  },
  selectedBtn: {
    backgroundColor: COLORS().white,
    paddingVertical: 10,
    width: '40%',
    borderRadius: 8,
    alignItems: 'center',
  },
  unselectedBtn: {
    backgroundColor: COLORS().light,
    paddingVertical: 10,
    width: '40%',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedText: {
    color: COLORS().blue,
  },
  unselectedText: {
    color: COLORS().black,
  },
});

export default ButtonGroup;

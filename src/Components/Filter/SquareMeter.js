import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {COLORS} from '../../consts/colors';

const SquareMeter = ({selectedSquareMeter, setSelectedSquareMeter}) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.title}>Square Meter (m2)</Text>
      <View style={styles.ending}>
        <TextInput
          style={styles.input}
          value={selectedSquareMeter[0]}
          placeholder="Min 60"
          placeholderTextColor={'gray'}
          keyboardType="numeric"
          onChange={e => {
            let arr = [...selectedSquareMeter];
            arr[0] = e.target.value;
            setSelectedSquareMeter(arr);
          }}
        />
        <Text style={styles.label}>m2</Text>
        <TextInput
          style={styles.input}
          value={selectedSquareMeter[1]}
          placeholder="Max 900"
          placeholderTextColor={'gray'}
          keyboardType="numeric"
          onChange={e => {
            let arr = [...selectedSquareMeter];
            arr[1] = e.target.value;
            setSelectedSquareMeter(arr);
          }}
        />
        <Text style={styles.label}>m2</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subsection: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  title: {
    color: COLORS().black,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 15,
  },
  input: {
    height: 40,
    padding: 10,
    paddingHorizontal: 30,
    maxWidth: 130,
    color: COLORS().blue,
    fontSize: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS().gray,
    textAlign: 'center',
  },
  label: {
    height: 40,
    padding: 10,
    color: COLORS().blue,
    fontSize: 15,
  },
  ending: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SquareMeter;

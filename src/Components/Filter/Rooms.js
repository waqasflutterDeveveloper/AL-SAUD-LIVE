import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../consts/colors';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const Rooms = ({selectedRooms: selected, setSelectedRooms, RoomsOptions}) => {
  const Types = [
    {name: 'All', value: 0},
    {name: '1', value: 1},
    {name: '2', value: 2},
    {name: '3', value: 3},
    {name: '+4', value: 4},
  ];
  const setSelectedlocal = e => {
    if (selected == e) {
      setSelectedRooms(null);
      return;
    }
    setSelectedRooms(e);
  };
  return (
    <View style={styles.subsection}>
      <Text style={styles.title}>Rooms</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.btnGroup}>
        {RoomsOptions.map((option, index) => (
          <TouchableOpacity
            key={option}
            onPress={() => setSelectedlocal(option)}
            style={option === selected ? styles.filledBtn : styles.outlineBtn}>
            <Text
              style={
                option === selected ? styles.filledText : styles.outlineText
              }>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  btnGroup: {
    flexDirection: 'row',
  },
  outlineBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS().white,
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS().gray,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  outlineText: {
    color: COLORS().gray1,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  filledBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS().white,
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS().blue,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  filledText: {
    color: COLORS().blue,
    marginHorizontal: 5,
    textAlign: 'center',
  },
});

export default Rooms;

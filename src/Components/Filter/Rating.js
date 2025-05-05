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

const Rating = ({selectedRating: selected, setSelectedRating}) => {
  const Types = [
    {name: '1', value: 0, icon: 'star'},
    {name: '2', value: 1, icon: 'star'},
    {name: '3', value: 2, icon: 'star'},
    {name: '4', value: 3, icon: 'star'},
    {name: '5', value: 4, icon: 'star'},
  ];
  const setSelectedlocal = e => {
    if (selected == e) {
      setSelectedRating(null);
      return;
    }
    setSelectedRating(e);
  };
  return (
    <View style={styles.subsection}>
      <Text style={styles.title}>Rating</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.btnGroup}>
        {Types.map(({name, value, icon}) => (
          <TouchableOpacity
            key={value}
            onPress={() => setSelectedlocal(value)}
            style={value === selected ? styles.filledBtn : styles.outlineBtn}>
            {icon && (
              <Icon
                name={icon}
                size={18}
                color={'#F2B004'}
                style={styles.back}
              />
            )}
            <Text
              style={
                value === selected ? styles.filledText : styles.outlineText
              }>
              {name}
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
    paddingHorizontal: 10,
    minWidth: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS().gray,
    alignItems: 'center',
    marginHorizontal: 6,
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
    paddingHorizontal: 10,
    minWidth: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS().blue,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  filledText: {
    color: COLORS().blue,
    marginHorizontal: 5,
    textAlign: 'center',
  },
});

export default Rating;

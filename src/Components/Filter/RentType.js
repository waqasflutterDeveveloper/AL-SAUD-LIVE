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

const RentType = ({selectedRentType: selected, setSelectedRentType}) => {
  const Types = [
    // {name: 'All', value: 0},
    {name: 'Residential', value: 1},
    {name: 'Commercial', value: 2},
  ];
  return (
    <View style={styles.subsection}>
      <Text style={styles.title}>Type</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.btnGroup}>
        {Types.map(({name, value, icon}) => (
          <TouchableOpacity
            key={value}
            onPress={() => setSelectedRentType(value)}
            style={value === selected ? styles.filledBtn : styles.outlineBtn}>
            {icon && (
              <Icon
                name={icon}
                size={18}
                color={value === selected ? 'white' : '#185894'}
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
    marginBottom: 10,
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
    minWidth: 50,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS().gray,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  outlineText: {
    color: COLORS().gray1,
    marginHorizontal: 5,
  },
  filledBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS().white,
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: 50,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS().blue,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  filledText: {
    color: COLORS().blue,
    marginHorizontal: 5,
  },
});

export default RentType;

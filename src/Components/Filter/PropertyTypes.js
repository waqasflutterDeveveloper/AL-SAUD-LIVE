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

const PropertyTypes = ({
  selectedPropertyType: selected,
  setSelectedPropertyType,
  PropertyTypeOptions,
}) => {
  const Types = [
    {name: 'All', value: 0},
    {name: 'Flat', value: 1, icon: 'business-outline'},
    {name: 'Villa', value: 2, icon: 'home-outline'},
    {name: 'Shop', value: 3, icon: 'today-sharp'},
    {name: 'Restaurant', value: 4, icon: 'fast-food-sharp'},
  ];
  const setSelectedlocal = e => {
    if (selected == e) {
      setSelectedPropertyType(null);
      return;
    }
    setSelectedPropertyType(e);
  };
  return (
    <View style={styles.subsection}>
      <Text style={styles.title}>Property Type</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.btnGroup}>
        {PropertyTypeOptions.map(({id, type_name, icon}) => (
          <TouchableOpacity
            key={id}
            onPress={() => setSelectedlocal({id, type_name})}
            style={
              type_name === selected?.type_name
                ? styles.filledBtn
                : styles.outlineBtn
            }>
            {icon && (
              <Icon
                name={icon}
                size={18}
                color={type_name === selected?.type_name ? 'white' : '#185894'}
                style={styles.back}
              />
            )}

            <Text
              style={
                type_name === selected?.type_name
                  ? styles.filledText
                  : styles.outlineText
              }>
              {type_name}
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
    minWidth: 50,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS().gray,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  outlineText: {
    color: COLORS().gray1,
    marginHorizontal: 5,
  },
  filledBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS().blue,
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: 50,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  filledText: {
    color: COLORS().white,
    marginHorizontal: 5,
  },
});

export default PropertyTypes;

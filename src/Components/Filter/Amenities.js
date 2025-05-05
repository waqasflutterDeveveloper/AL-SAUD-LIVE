import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {COLORS} from '../../consts/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const Amenities = ({setamenities, amenities}) => {
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: 'AC',
      value: 'AC',
      icon: () => (
        <Icon name="analytics-outline" size={18} color={COLORS().blue} />
      ),
    },
    {
      label: 'Wi-fi',
      value: 'Wi-fi',
      icon: () => <Icon name="wifi" size={18} color={'#F1948A'} />,
    },
    {
      label: 'Parking',
      value: 'Parking',
      icon: () => <Icon name="git-compare" size={18} color={'#F1C40F'} />,
    },
    {
      label: 'Gym',
      value: 'Gym',
      icon: () => <Icon name="barbell" size={18} color={'#7DCEA0'} />,
    },
    {
      label: 'Balcony',
      value: 'Balcony',
      icon: () => <Icon name="stop" size={18} color={'#D5DBDB'} />,
    },
    {
      label: 'Pool',
      value: 'Pool',
      icon: () => <Icon name="water" size={18} color={'#AED6F1'} />,
    },
  ]);

  return (
    <View style={styles.subsection}>
      <Text style={styles.title}>Amenities</Text>
      <View style={styles.ending}>
        <DropDownPicker
          open={open}
          value={amenities}
          items={items}
          setOpen={setOpen}
          setValue={setamenities}
          setItems={setItems}
          containerStyle={styles.containerStyle}
          style={styles.border}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          textStyle={styles.textStyle}
          badgeTextStyle={styles.badgeTextStyle}
          multiple={true}
          mode="BADGE"
          showBadgeDot={false}
          badgeColors={[
            COLORS().backgroundblue,
            '#F1948A',
            '#F1C40F',
            '#7DCEA0',
            '#D5DBDB',
            '#AED6F1',
          ]}
          listMode="MODAL"
          modalProps={{
            animationType: 'fade',
          }}
          modalTitle="Select Amenities"
          searchable
          searchPlaceholder="Search..."
          searchContainerStyle={{
            borderBottomColor: COLORS().gray,
          }}
          searchTextInputStyle={{
            borderColor: COLORS().gray,
          }}
        />
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
  ending: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    width: 300,
    zIndex: 9,
  },
  border: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS().gray,
  },
  dropDownContainerStyle: {
    backgroundColor: COLORS().white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS().gray1,
  },
  textStyle: {
    color: COLORS().gray1,
    fontSize: 14,
    textAlign: 'left',
  },
  badgeTextStyle: {
    color: COLORS().blue,
  },
});

export default Amenities;

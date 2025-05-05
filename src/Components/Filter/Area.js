import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {COLORS} from '../../consts/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const Area = ({setArea, area, data}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    // console.log(data, 'areas');
  }, [data]);
  // const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: 'Deira',
      value: 'Deira',
    },
    {
      label: 'Hatta',
      value: 'Hatta',
    },
  ]);

  return (
    <View style={styles.subsection}>
      <Text style={styles.title}>Area</Text>
      <View style={styles.ending}>
        <SelectDropdown
          data={data ? data : []}
          defaultValue={area}
          onSelect={(selectedItem, index) => {
            setArea(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem?.display_name;
          }}
          rowTextForSelection={(item, index) => {
            return item?.display_name;
          }}
          buttonStyle={styles.dropdown2BtnStyle}
          buttonTextStyle={styles.dropdown2BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return (
              <Icon
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                size={18}
                color={'#6B6B6B'}
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown2DropdownStyle}
          rowStyle={styles.dropdown2RowStyle}
          rowTextStyle={styles.dropdown2RowTxtStyle}
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
  dropdown2BtnStyle: {
    width: 300,
    height: 50,
    backgroundColor: COLORS().white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS().gray,
    zIndex: 9,
  },
  dropdown2BtnTxtStyle: {
    color: COLORS().gray1,
    fontSize: 14,
    textAlign: 'left',
  },
  dropdown2DropdownStyle: {
    backgroundColor: COLORS().white,
    marginTop: -22,
  },
  dropdown2RowStyle: {
    borderBottomColor: COLORS().gray,
    height: 40,
  },
  dropdown2RowTxtStyle: {
    color: COLORS().gray1,
    fontSize: 14,
    textAlign: 'left',
  },
});

export default Area;

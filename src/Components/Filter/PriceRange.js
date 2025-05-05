import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import RangeSlider from 'rn-range-slider';
import {COLORS} from '../../consts/colors';
import Thumb from '../Slider/Thumb';
import Rail from '../Slider/Rail';
import RailSelected from '../Slider/RailSelected';
import Label from '../Slider/Label';
import Notch from '../Slider/Notch';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const PriceRange = ({
  selectedPriceRange: selected,
  setSelectedPriceRange,
  MinMaxPrice,
}) => {
  const [low, setLow] = useState(selected[0]);
  const [high, setHigh] = useState(selected[1]);
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    setSelectedPriceRange([low, high]);
    setLow(low.toString());
    setHigh(high.toString());
  }, []);

  return (
    <View style={styles.subsection}>
      <View style={styles.heading}>
        <Text style={styles.title}>Price Range</Text>
        {/* <SelectDropdown
          data={['Annually', 'Monthly', 'Daily', 'Hourly']}
          defaultValueByIndex={0}
          onSelect={(selectedItem, index) => {
            
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown2BtnStyle}
          buttonTextStyle={styles.dropdown2BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return (
              <Icon
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                size={18}
                color={'#185894'}
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown2DropdownStyle}
          rowStyle={styles.dropdown2RowStyle}
          rowTextStyle={styles.dropdown2RowTxtStyle}
        /> */}
      </View>
      <RangeSlider
        style={styles.slider}
        low={selected[0]}
        high={selected[1]}
        min={MinMaxPrice[0]}
        max={MinMaxPrice[1]}
        step={10}
        // floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
      <View style={styles.ending}>
        <TextInput style={styles.input} value={`AED ${low}`} editable={false} />
        <Text style={styles.input}>-</Text>
        <TextInput
          style={styles.input}
          value={`AED ${high}`}
          editable={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subsection: {
    marginVertical: 15,
    marginHorizontal: 20,
  },
  title: {
    color: COLORS().black,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 15,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slider: {
    marginTop: -26,
  },
  input: {
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
  dropdown2BtnStyle: {
    width: 110,
    height: 25,
    backgroundColor: COLORS().backgroundblue,
    borderRadius: 8,
    zIndex: 9,
  },
  dropdown2BtnTxtStyle: {
    color: COLORS().blue,
    textAlign: 'center',
    fontSize: 14,
  },
  dropdown2DropdownStyle: {
    backgroundColor: 'rgba(24,88,148,0.85)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginTop: -22,
  },
  dropdown2RowStyle: {
    borderBottomColor: '#C5C5C5',
    height: 35,
  },
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default PriceRange;

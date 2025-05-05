import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {COLORS} from '../../consts/colors';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];

const Example = ({Type, data, settype, type, title}) => {
  const [service, setService] = React.useState('');
  //
  // console.log(type, 'tet');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        <SelectDropdown
          data={data}
          buttonStyle={{
            backgroundColor: 'white',
            borderColor: COLORS().lightGrey,
            borderWidth: 1,
            width: '100%',
            // marginTop: 15,
            borderRadius: 5,
            height: 55,
          }}
          buttonTextStyle={{color: COLORS().grey}}
          defaultButtonText={type?.name ? type?.name : Type}
          onSelect={(selectedItem, index) => {
            settype(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return type?.name;
          }}
          renderCustomizedRowChild={(item, index) => {
            return (
              <View
                style={{
                  width: '100%',
                  textAlign: 'left',
                  marginHorizontal: 20,
                }}>
                <Text style={{color: COLORS().grey}}>{item.name}</Text>
              </View>
            );
          }}
        />
        <View style={styles.fly}>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={18}
            color={COLORS().dark}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: COLORS().lightBorder,
  },
  fly: {position: 'absolute', top: 25, right: 20},
  container: {
    width: '99.5%',
    // backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -3,
    marginVertical: 3,
  },
});

export default Example;

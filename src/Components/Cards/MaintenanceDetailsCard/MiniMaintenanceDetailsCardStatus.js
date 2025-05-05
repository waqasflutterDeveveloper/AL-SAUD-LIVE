import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../../consts/colors';
import font from '../../../consts/font';
const ScreenWidth = Dimensions.get('window').width;

const MiniMaintenanceDetailsCardStatus = ({
  title,
  text,
  line,
  image,
  item,
  currentState,
  active,
}) => {
  return (
    <View style={style.container}>
      <View style={style.row}>
        {active ? (
          <Image style={style.icon} source={image} resizeMode="contain" />
        ) : (
          <View style={style.icongrey}></View>
        )}

        <View style={style.textbox}>
          <Text
            style={{
              ...style.text,
              color: active ? COLORS().blue : 'grey',
            }}
            numberOfLines={1}>
            {item?.['display_name']}
          </Text>
          {/* <Text style={{color: COLORS().grey, fontSize: 12}}>{item?.['create_date']}</Text> */}
        </View>
      </View>
      {line && <View style={style.line} />}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    // backgroundColor: COLORS().lightWhite,
    borderRadius: 12,
    marginVertical: 0,
    width: '100%',
    height: 70,
    // borderWidth: 1,
    // borderColor: COLORS().stock,
    paddingHorizontal: 14,
    flexDirection: 'column',
  },
  line: {
    borderWidth: 1,
    borderColor: COLORS().stock,
    height: '100%',
    marginLeft: 14,
    top: -2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  icon: {
    height: 18,
    width: 18,
    backgroundColor: COLORS().white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    marginVertical: 2,
  },
  icongrey: {
    height: 18,
    width: 18,
    backgroundColor: COLORS().lightGrey,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    marginVertical: 2,
  },
  textbox: {
    // marginHorizontal: 5,
    // width: font.width * 0.47,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
  },
  icon2: {
    marginHorizontal: 5,
    // backgroundColor: COLORS().white,
    padding: 6,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
  },
  icon3: {
    marginHorizontal: 5,
    backgroundColor: COLORS().white,
    padding: 6,
    borderRadius: 40,
    width: 15,
    height: 15,
  },
});

export default MiniMaintenanceDetailsCardStatus;

import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../../consts/colors';
import font from '../../../consts/font';
import {useSelector} from 'react-redux';
const ScreenWidth = Dimensions.get('window').width;

const MiniMaintenanceDetailsCard = ({
  title,
  text,
  subtitle,
  status,
  image,
  imagestatus,
  color,
  technician_id,
  schedule_date,
}) => {
  const {isDark} = useSelector(state => state.Home);

  return (
    <View
      style={[style.container, {backgroundColor: COLORS(isDark).cardForDark}]}>
      <View style={{position: 'absolute', top: 5, right: 5}}></View>
      <View style={style.row}>
        <Image style={style.icon} source={image} resizeMode="contain" />
        <View style={style.textbox}>
          {/* <Text style={style.text} numberOfLines={1}>
            {title}
          </Text> */}
          {schedule_date && (
            <Text
              style={{color: COLORS().grey, fontSize: 12, marginVertical: 5}}>
              Schedule Date : {schedule_date}
            </Text>
          )}
          <Text style={{color: COLORS().grey, fontSize: 12, marginVertical: 5}}>
            {text}
          </Text>
          <Text style={{color: COLORS().grey, fontSize: 12, marginVertical: 5}}>
            {subtitle}
          </Text>
          {technician_id && (
            <Text
              style={{color: COLORS().grey, fontSize: 12, marginVertical: 5}}>
              Technician : {technician_id}
            </Text>
          )}
        </View>
      </View>

      <View style={style.icon2}>
        <Image style={style.icon3} source={imagestatus} resizeMode="contain" />

        <Text style={{color: color, fontSize: 12}}>{status}</Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    backgroundColor: COLORS().lightWhite,
    borderRadius: 12,
    marginVertical: 10,
    width: ScreenWidth * 0.9,
    // height: 100,
    borderWidth: 1,
    borderColor: COLORS().stock,
    paddingHorizontal: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  icon: {
    height: 30,
    width: 30,
    backgroundColor: COLORS().white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  textbox: {marginHorizontal: 5, width: font.width * 0.47},
  text: {
    color: COLORS().blue,
    fontWeight: '500',
    fontSize: 14,
  },
  icon2: {
    marginHorizontal: 5,
    // backgroundColor: 'red',
    padding: 6,
    borderRadius: 40,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'row',
    display: 'flex',
    width: '50%',
    textAlign: 'right',
    paddingVertical: 15,
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

export default MiniMaintenanceDetailsCard;

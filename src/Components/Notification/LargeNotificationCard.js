import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import SCREEN from '../../../Layout';
import {COLORS} from '../../consts/colors';
import moment from 'moment-timezone';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LargeNotificationCard = ({image, title, desc, time, onPress, item}) => {
  const [timeZone, setTimeZone] = React.useState('');
  const [date, setDate] = React.useState('');

  useEffect(() => {
    // Request permission to access location
    getDeviceLocation();
  }, []);

  const getDeviceLocation = async () => {
    try {
      const res = await axios.get(
        'https://api.bigdatacloud.net/data/reverse-geocode-client',
      );
      const timeZoneCountry = res.data?.localityInfo?.informative.filter(
        item => item.order == 3,
      )[0];

      setTimeZone(timeZoneCountry?.name);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };
  useEffect(() => {
    if (timeZone) {
      setDate(moment.utc(time).tz(timeZone));
    }
  }, [timeZone]);
  return (
    <View style={styles.container}>
      <View>
        {item?.model_id == 'maintenance.request' && (
          <Text style={styles.icon}>
            <MaterialCommunityIcons
              size={25}
              color={COLORS().blue}
              name="hammer-screwdriver"
            />
          </Text>
        )}

        {(item?.model_id == 'account.payment' ||
          item?.model_id == 'pdc.wizard') && (
          <Text style={styles.icon}>
            <FontAwesome name="dollar" size={25} color={COLORS().blue} />
          </Text>
        )}
        {item?.model_id == 'property.contract' && (
          <Text style={styles.icon}>
            <Ionicons name="contract" size={25} color={COLORS().blue} />
          </Text>
        )}
      </View>
      <View style={styles.rightSide}>
        {item?.model_id == 'property.contract' && (
          <Text style={[styles.title, {color: COLORS().blueVsBlack}]}>
            New Updates on Contract
          </Text>
        )}
        {item?.model_id == 'account.payment' ||
          (item?.model_id == 'pdc.wizard' && (
            <Text style={[styles.title, {color: COLORS().blueVsBlack}]}>
              New Updates on cheques
            </Text>
          ))}
        {item?.model_id == 'maintenance.request' && (
          <Text style={[styles.title, {color: COLORS().blueVsBlack}]}>
            {' '}
            New Updates on Maintenance requests{' '}
          </Text>
        )}

        <Text style={styles.time}>
          {date ? moment(date)?.fromNow() : ''}
          {/* {item?.cheque_ref} -
          {item?.contract_id?.[0]} */}
        </Text>
        <Text style={[styles.desc, {color: COLORS().blueVsBlack}]}>
          {desc.slice(0, 70)}...
        </Text>
        {/* <Text style={styles.desc}>{item?.id}</Text> */}
        {/* <Text style={styles.desc}>{item?.res_id}</Text> */}

        {onPress && (
          <TouchableOpacity
            onPress={() => onPress(item?.res_id)}
            style={styles.btnContainer}>
            <Text style={styles.btnText}>View Details</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS().middlebox,
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  rightSide: {marginHorizontal: 2},
  image: {width: 40, height: 40, borderRadius: 70},
  title: {color: COLORS().dark, fontWeight: '700', fontSize: 12},
  time: {fontSize: 11, marginTop: 5, color: COLORS().lightGrey},
  desc: {marginTop: 10, fontSize: 12, color: COLORS().dark, width: '60%'},
  btnContainer: {
    backgroundColor: COLORS().tranparentBlue,
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: '45%',
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  btnText: {fontSize: 13, color: COLORS().blue},
  icon: {
    color: COLORS().dark,
    borderRadius: 30,
    padding: 15,
    // marginHorizontal: 3,
    fontSize: 18,
    backgroundColor: COLORS().tranparentBlue,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default LargeNotificationCard;

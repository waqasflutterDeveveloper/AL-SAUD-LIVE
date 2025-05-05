import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';

const THUMB_RADIUS_LOW = 9;
const THUMB_RADIUS_HIGH = 10;

const Thumb = ({name}) => {
  return <View style={name === 'high' ? styles.rootHigh : styles.rootLow} />;
};

const styles = StyleSheet.create({
  rootLow: {
    width: THUMB_RADIUS_LOW * 2,
    height: THUMB_RADIUS_LOW * 2,
    borderRadius: THUMB_RADIUS_LOW,
    borderWidth: 2,
    borderColor: '#E9612F',
    backgroundColor: '#E9612F',
  },
  rootHigh: {
    width: THUMB_RADIUS_HIGH * 2,
    height: THUMB_RADIUS_HIGH * 2,
    borderRadius: THUMB_RADIUS_HIGH,
    borderWidth: 1,
    borderColor: '#E9612F',
    backgroundColor: '#E9612F',
  },
});

export default memo(Thumb);

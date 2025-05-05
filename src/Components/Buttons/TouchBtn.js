import React from 'react';
import {COLORS} from '../../consts/colors';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LoadingDots from 'react-native-loading-dots';

const Example = ({
  text,
  width,
  type,
  onPress,
  color,
  Icon,
  disable,
  height = 55,
  styleText,
  style,
  outline,
  textcolor,
  textSize,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      height={height}
      disabled={disable}
      fontWeight="bold"
      fontSize={22}
      borderRadius={12}
      style={{
        backgroundColor: color ? color : COLORS().red,
        borderColor: outline ? outline : 'transparent',
        borderWidth: 1,
        ...style,
        width: width ? width : 150,
      }}>
      {isLoading ? (
        <View style={styles.iconBox}>
          <View style={styles.dotsWrapper}>
            <LoadingDots
              bounceHeight={5}
              colors={['white', 'white', 'white', 'white']}
              size={10}
            />
          </View>
        </View>
      ) : (
        <View style={styles.iconBox}>
          {Icon && Icon}
          {type && type == 'back' ? (
            <MaterialIcons
              name="arrow-back-ios"
              size={22}
              color={COLORS().white}
            />
          ) : null}
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: textSize ? textSize : 18,
              color: textcolor ? textcolor : COLORS().white,
              marginHorizontal: 8,
              ...styleText,
            }}>
            {text}
          </Text>
          {!type && !Icon && (
            <Ionicons name="arrow-forward" size={22} color={COLORS().white} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  iconBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dotsWrapper: {
    width: 50,
  },
});
export default Example;

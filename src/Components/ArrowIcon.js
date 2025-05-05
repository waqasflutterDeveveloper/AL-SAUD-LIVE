import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../consts/colors';
import {useSelector} from 'react-redux';
import {useLanguage} from '../Helpers/LanguageContext';
const ArrowIcon = ({title, icon, onPress}) => {
  const {isDark} = useSelector(state => state.Home);
  const {language, switchLanguage} = useLanguage();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingVertical: 15,
          paddingHorizontal: 2,
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {icon}
          <Text
            style={{color: COLORS(isDark).WhiteForDark, marginHorizontal: 10}}>
            {title}
          </Text>
        </View>
        <View>
          <FontAwesome
            name="angle-right"
            color={COLORS(isDark).WhiteForDark}
            size={18}
            style={{
              transform: [{rotate: language == 'ar' ? '180deg' : '0deg'}],
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArrowIcon;

const styles = StyleSheet.create({});

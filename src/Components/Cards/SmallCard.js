import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS} from '../../consts/colors';
import font from '../../consts/font';
import {propertybytypeApi} from '../../apis/Home';
import {useSelector} from 'react-redux';
import {useLanguage} from '../../Helpers/LanguageContext';
import {arTranslations} from '../../translations/ar';
import {enTranslations} from '../../translations/en';
const SmallCard = ({img, title, dec, style, styleImg, onPress}) => {
  const {isDark} = useSelector(state => state.Home);
  const {language, switchLanguage} = useLanguage();

  const translations = language === 'ar' ? arTranslations : enTranslations;
  return (
    <View style={[styles.container, {...style}]}>
      <TouchableOpacity onPress={onPress}>
        <Image source={img} style={[styles.img, {...styleImg}]} />
        <Text
          style={[styles.title, {color: COLORS(isDark).WhiteForDark}]}
          numberOfLines={1}>
          {title}
        </Text>
        <Text
          style={[styles.dec, {color: COLORS(isDark).WhiteForDark}]}
          numberOfLines={1}>
          {dec + ` ${translations['Properties']}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SmallCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: font.l,
    borderColor: COLORS().lightBorder,
    borderWidth: 1,
    width: 90,
    padding: font.m,
    marginLeft: font.l,
  },
  img: {
    height: 30,
    width: 30,
    borderRadius: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS().black,
    marginTop: font.s,
  },
  dec: {color: COLORS().lightGrey, fontSize: 12},
});

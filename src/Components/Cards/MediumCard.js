import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../consts/colors';
import font from '../../consts/font';
import {useSelector} from 'react-redux';
import {useLanguage} from '../../Helpers/LanguageContext';
import {arTranslations} from '../../translations/ar';
import {enTranslations} from '../../translations/en';
const MediumCard = ({img, title, dec, style, styleImg, onPress}) => {
  const {isDark} = useSelector(state => state.Home);
  const {language, switchLanguage} = useLanguage();

  const translations = language === 'ar' ? arTranslations : enTranslations;
  return (
    <View style={styles.border}>
      <TouchableOpacity onPress={onPress}>
        <ImageBackground source={img} style={[styles.container, {...style}]}>
          <View style={styles.transparent}>
            <View style={styles.overLay}>
              <Text style={[styles.title, {color: 'white'}]} numberOfLines={1}>
                {title}
              </Text>
              <Text style={[styles.dec, {color: 'white'}]} numberOfLines={1}>
                {dec + ` ${translations['Properties']}`}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default MediumCard;

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS().lightBorder,
    width: font.width * 0.36,
    height: 136,
    padding: font.m,
  },
  border: {borderRadius: font.m, overflow: 'hidden', marginLeft: font.m},
  img: {
    height: 136,
    width: font.width * 0.36,
    borderRadius: 8,
    position: 'absolute',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: font.s,
  },
  dec: {fontSize: 12},
  transparent: {
    width: font.width * 0.36,
    height: 136,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.2)',
  },
  overLay: {position: 'absolute', bottom: font.m, left: font.m},
});

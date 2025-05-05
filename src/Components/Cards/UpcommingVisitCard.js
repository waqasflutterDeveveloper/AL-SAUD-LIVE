import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import SCREEN from '../../../Layout';
import moment from 'moment';
import {useLanguage} from '../../Helpers/LanguageContext';
import {arTranslations} from '../../translations/ar';
import {enTranslations} from '../../translations/en';
import {useSelector} from 'react-redux';

const UpcommingVisitCard = ({data, width}) => {
  const {language, switchLanguage} = useLanguage();
  const {isDark} = useSelector(state => state.Home);

  const translations = language === 'ar' ? arTranslations : enTranslations;
  return (
    <View
      style={{...styles.container, width: width ? width : SCREEN.WIDTH * 0.73}}>
      <View style={styles.box}>
        <Image
          style={styles.image}
          source={require('../../assets/card_image.png')}
        />
        <View style={styles.middlebox}>
          <Text style={{...styles.text, ...styles.fontlarge}}>
            {data?.name}
          </Text>
          <View
            style={{
              ...styles.text,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                ...styles.text,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text style={{...styles.text}}>Code: SNA-101</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.secondbox}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/png/calenderWhite.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.text}> {moment(data.date).format('LLL')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    height: 135,
    width: SCREEN.WIDTH * 0.73,
    backgroundColor: '#3A7BB8',
    borderColor: SCREEN.GREY,
    borderRadius: SCREEN.RADIUS,
    borderWidth: 2,
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  box: {
    // height: SCREEN.WIDTH * 0.775 * 0.365,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'blue',
    borderRadius: SCREEN.RADIUS - 4,
    flexDirection: 'row',
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: SCREEN.RADIUS - 8,
  },
  secondbox: {
    height: SCREEN.HEIGHT * 0.34 * 0.185,
    width: SCREEN.WIDTH * 0.73 * 0.92,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#185894',
    borderRadius: SCREEN.RADIUS * 0.5,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: SCREEN.WIDTH * 0.775 * 0.145 * 0.48,
    // overflow: 'hidden',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    color: SCREEN.GREY,
    paddingHorizontal: 5,
  },
  text: {
    color: SCREEN.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
  textminy: {
    color: SCREEN.BLUE,
    fontSize: 10,
    backgroundColor: SCREEN.GREY,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  fontlarge: {
    fontSize: 14,
  },
  fontextralarge: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textGrey: {
    color: SCREEN.DARKGREY,
    fontSize: 10,
    marginHorizontal: 2,
  },
  middlebox: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    // width: '100%',
    // height: SCREEN.WIDTH * 0.775 * 0.28,
    // width: SCREEN.WIDTH * 0.76 * 0.92,
    marginHorizontal: 10,
    paddingHorizontal: 4,
  },
  lastbox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
});
export default UpcommingVisitCard;

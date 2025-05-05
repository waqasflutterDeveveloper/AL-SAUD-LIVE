import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../../consts/colors';
import font from '../../../consts/font';
const ScreenWidth = Dimensions.get('window').width;

const FeedbackAnswer = ({title, desc, date, isDark}) => {
  return (
    <View
      style={[style.container, {backgroundColor: COLORS(isDark).cardForDark}]}>
      <View style={style.row}>
        <View style={style.textbox}>
          <Text style={style.date}>{date}</Text>
        </View>
        <Text
          style={{...style.textblue, color: COLORS(isDark).blueVsBlack}}
          numberOfLines={1}>
          {title}
        </Text>

        <View style={style.textbox}>
          {desc?.map(item => (
            <View
              style={{
                backgroundColor: COLORS().backgroundblue,
                height: 70,
                width: '100%',
                marginVertical: 4,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 100,
                  marginHorizontal: 10,
                }}
                source={{
                  uri: `data:image/jpeg;base64,${item?.author_id?.[0]?.avatar_128}`,
                }}
              />

              <Text style={style.text}>{item?.description}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: COLORS().backgroundLight,
    borderRadius: 12,
    marginTop: 10,
    width: ScreenWidth * 0.9,
    // height: 100,
    borderWidth: 1,
    borderColor: COLORS().stock,
    paddingHorizontal: 20,
    flexDirection: 'column',
    marginBottom: 100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    // backgroundColor: 'red',
  },

  textbox: {width: '100%'},
  text: {
    color: COLORS().black,
    fontWeight: '400',
    fontSize: 14,
    width: '100%',
    marginVertical: 15,
  },
  date: {
    color: COLORS().grey,
    fontSize: 12,
    width: '100%',
    marginVertical: 2,
  },
  textblue: {
    color: COLORS().cardForDark,
    fontWeight: '500',
    fontSize: 14,
    width: '100%',
    marginVertical: 0,
  },
  imagebox: {
    borderRadius: 40,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    display: 'flex',
    marginVertical: 10,
  },
  icon3: {
    marginRight: 10,
    backgroundColor: COLORS().white,
    padding: 6,
    borderRadius: 7,
    width: 40,
    height: 40,
  },
});

export default FeedbackAnswer;

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../consts/colors';
import font from '../../consts/font';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const ScreenWidth = Dimensions.get('window').width;

const MiniPaymentCard = ({
  title,
  text,
  image,
  index,
  contract,
  hasLegalCase,
}) => {
  const navigation = useNavigation();
  const {isDark} = useSelector(state => state.Home);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PaymentScreenTab', {index, contract, hasLegalCase})
      }>
      <View
        style={[
          style.container,
          {backgroundColor: COLORS(isDark).cardForDark},
        ]}>
        <View style={style.row}>
          <Image style={style.icon} source={image} resizeMode="contain" />
          <View style={style.textbox}>
            <Text style={style.text} numberOfLines={1}>
              {title}
            </Text>
            <Text style={{color: COLORS().grey, fontSize: 12}}>{text}</Text>
          </View>
        </View>

        <View style={style.icon2}>
          <MaterialIcons
            name="arrow-forward-ios"
            size={13}
            color={COLORS().blue}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS().lightWhite,
    borderRadius: 12,
    marginVertical: 10,
    width: ScreenWidth * 0.9,
    height: 60,
    borderWidth: 1,
    borderColor: COLORS().stock,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    backgroundColor: COLORS().white,
    padding: 6,
    borderRadius: 40,
  },
});

export default MiniPaymentCard;

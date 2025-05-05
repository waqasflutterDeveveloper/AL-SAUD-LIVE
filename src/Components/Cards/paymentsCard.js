import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import house from '../../consts/houses';
import {COLORS} from '../../consts/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useGetContractDocument, useGetContractPayment} from '../../apis/Home';
import {useSelector} from 'react-redux';
import Spinner from '../Spinner';
import {useLanguage} from '../../Helpers/LanguageContext';
import {arTranslations} from '../../translations/ar';
import {enTranslations} from '../../translations/en';
const ScreenWidth = Dimensions.get('window').width;

const PaymentCard = ({Item, hasLegalCase, active}) => {
  const navigation = useNavigation();
  // useEffect(() => {
  //   console.log('PaymentP', Item);
  // }, []);
  const {isDark} = useSelector(state => state.Home);

  const {language, switchLanguage} = useLanguage();
  const translations = language === 'ar' ? arTranslations : enTranslations;
  return (
    <View
      style={{
        width: ScreenWidth * 0.9,
        alignSelf: 'center',
      }}>
      <>
        <View style={style.row}>
          {Item?.state == 'draft' ? (
            <>
              <View
                style={{
                  height: 20,
                  width: 2.5,
                  backgroundColor: COLORS().primary,
                }}
              />
              <Image
                style={{
                  color: COLORS().primary,
                  fontWeight: '700',
                  marginHorizontal: 5,
                  width: 15,
                  height: 15,
                }}
                source={require('../../assets/png/alarm_red.png')}
              />
              <Text
                style={{
                  color: COLORS().primary,
                  fontWeight: '700',
                  marginHorizontal: 5,
                }}>
                {translations['Must Pay']}
              </Text>
            </>
          ) : (
            <>
              <View
                style={{
                  height: 20,
                  width: 2.5,
                  backgroundColor: COLORS().blue,
                }}
              />

              <Text
                style={{
                  color: COLORS().blue,
                  fontWeight: '700',
                  marginHorizontal: 5,
                }}>
                {Item?.state_name}
              </Text>
            </>
          )}
        </View>
        <View
          style={[
            style.flexcolstart,
            {
              backgroundColor:
                active == Item?.check_reference
                  ? COLORS(isDark).backgroundblue
                  : COLORS(isDark).blakvsgrey,
            },
          ]}>
          <View style={style.flexRowbtw}>
            <Text style={style.name}>
              {Item?.name}{' '}
              {Item?.check_reference ? `(Ref: ${Item?.check_reference})` : ''}
            </Text>
            {/* <Text style={{color: COLORS().blue, marginHorizontal: 5}}>Paid</Text> */}
            <View>
              <Text style={style.date}>{Item?.date}</Text>
            </View>
          </View>
          <View style={style.midLine} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginHorizontal: 10,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <Text style={style.subTxt}>{translations['Total Amount']}</Text>
              </View>
              <View
                style={{
                  marginVertical: 2,
                }}>
                <Text
                  style={{
                    color: COLORS(isDark).red,
                    fontWeight: '400',
                    fontWeight: 'bold',
                  }}>
                  {Item?.total_amount} {translations['AED']}
                </Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginHorizontal: 10,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <Text style={style.subTxt}>
                  {translations['Remain Amount']}
                </Text>
              </View>
              <View
                style={{
                  marginVertical: 2,
                }}>
                <Text
                  style={{
                    color: COLORS(isDark).red,
                    fontWeight: '400',
                    fontWeight: 'bold',
                  }}>
                  {Item?.amount} {translations['AED']}
                </Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginHorizontal: 10,
              }}>
              <View
                style={{
                  marginVertical: 2,
                }}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('PdfView', {
                      ...Item,
                      print_name: Item?.name,
                      typeofScreen: 'paymentcard',
                    })
                  }>
                  <FontAwesome
                    name="file-pdf-o"
                    size={20}
                    color={COLORS().blue}
                  />
                </Pressable>
              </View>
            </View>
            {console.log(Item?.is_pay_now, hasLegalCase, 'is pay')}

            {Item?.is_pay_now ? (
              <>
                {hasLegalCase && (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('PaymentMethod', {Item})
                    }>
                    <View style={style.coverBtn}>
                      <Text style={style.txt}>{translations['Pay Now']}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <Text style={{color: COLORS().red, marginHorizontal: 10}}>
                {Item?.state_name}
              </Text>
            )}
          </View>
        </View>
      </>
    </View>
  );
};

const style = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
  line: {backgroundColor: COLORS().light, width: 50, height: 2.5},

  flexcolstart: {
    borderRadius: 15,
    backgroundColor: COLORS().backgroundLight,
    padding: 5,
    marginTop: 15,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: COLORS().stock,
  },
  flexRowbtw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  name: {
    color: COLORS().blue,
    fontWeight: 'bold',
    fontSize: 14,
    fontWeight: '400',
    width: '60%',
  },
  date: {
    color: COLORS().grey,
    fontWeight: '400',
    fontWeight: 'bold',
    fontSize: 12,
  },
  coverBtn: {
    height: 40,
    backgroundColor: COLORS().tranparentBlue,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  txt: {color: COLORS().blue, fontSize: 12, fontWeight: '600'},
  midLine: {
    width: '92%',
    backgroundColor: COLORS().bottomBorder,
    height: 1,
    marginBottom: 10,
    alignSelf: 'center',
  },
  subTxt: {
    color: COLORS().grey,
    fontWeight: 'bold',
    fontSize: 11,
    fontWeight: '400',
  },
});
export default PaymentCard;

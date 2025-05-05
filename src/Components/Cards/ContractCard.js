import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import house from '../../consts/houses';
import {COLORS} from '../../consts/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {setselectedProp} from '../../Store/MyProperty/MyPropertySlice';
import {useDispatch} from 'react-redux';
import font from '../../consts/font';
import {color} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
const ContractCard = ({parent, item, navigate}) => {
  const {isDark} = useSelector(state => state.Home);
  // console.log(item, 'item');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Diff = () => {
    const currentDate = new Date();
    const futureDate = new Date(item?.date_to);
    const futureDatecompare = new Date(futureDate);
    if (currentDate > futureDatecompare) {
      // console.log('date1 is greater than date2');
      return null;
    }
    // console.log(futureDate);
    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear();
    // let currentDate = `${year}-${month}-${day}`;

    const diffTime = Math.abs(futureDate - currentDate);
    // console.log(diffTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  return (
    <TouchableOpacity
      onPress={() => {
        if (navigate) {
          navigation.navigate('PaymentScreen', {
            index: 1,
            parent: parent,
            item: item,
          });
        }
      }}>
      <View
        style={{
          height: 'auto',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          borderRadius: 15,
          marginTop: 10,
          paddingHorizontal: 10,
          backgroundColor: COLORS(isDark).blakvsgrey,
          paddingVertical: 15,
          marginHorizontal: 15,
          borderWidth: 1,
          borderColor: COLORS().stock,
        }}>
        {/* <View style={style.divided} /> */}
        {item?.state == 'to_be_renew' && (
          <View style={{position: 'absolute', top: -20, left: 20}}>
            <Image
              style={{
                width: 30,
                marginVertical: 20,
                alignSelf: 'center',
                height: 30,
              }}
              source={require('../../assets/expired.png')}
            />
          </View>
        )}
        {item?.state == 'expired' && (
          <View style={{position: 'absolute', top: -20, left: 20}}>
            <Image
              style={{
                width: 30,
                marginVertical: 20,
                alignSelf: 'center',
                height: 30,
              }}
              source={require('../../assets/expired_2.png')}
            />
          </View>
        )}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginVertical: 5,
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View
            style={{
              display: 'flex',
              marginVertical: 5,
            }}>
            <Text style={style.subTitle}>Amount</Text>
            <Text style={[style.boldText, {color: COLORS(isDark).blueVsBlack}]}>
              AED {item?.total_value} /{item?.rent_period}{' '}
              {item?.rent_period_type}
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
            <Text style={style.orangeStatus}>{item?.state_name}</Text>
            {item?.legal_case_flag && (
              <Text
                style={[
                  style.orangeStatus,
                  {backgroundColor: COLORS().blue, marginHorizontal: 5},
                ]}>
                Legal
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View style={{display: 'flex'}}>
            <Text style={style.subTitle}>Contract start:</Text>

            <Text style={[style.boldText, {color: COLORS(isDark).blueVsBlack}]}>
              {item?.date_from}
            </Text>
          </View>
          <View style={{display: 'flex'}}>
            <Text style={style.subTitle}>Contract end:</Text>
            <Text style={[style.boldText, {color: COLORS(isDark).blueVsBlack}]}>
              {item?.date_to}
            </Text>
          </View>
        </View>
        <Text>
          {Diff() ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: COLORS().greyForDark,
                width: font.width * 0.8,
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 8,
                marginVertical: 10,
              }}>
              <Image source={require('../../assets/png/Calendar.png')} />
              <Text style={{color: COLORS().blue, marginHorizontal: 5}}>
                End in {Diff()} days
              </Text>
            </View>
          ) : null}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  line: {
    // borderBottomColor: COLORS().grey,
    // borderColor: 'white',
    width: '90%',
    height: 1,
    borderWidth: 0.5,
    // opacity: 0.4,
    marginVertical: 20,
    marginHorizontal: '5%',
    // height: 10,
  },
  divided: {
    borderBottomColor: COLORS().bottomBorder,
    borderBottomWidth: 1,
    width: '95%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  subTitle: {
    color: COLORS().lightGrey,
    fontWeight: '500',
    fontSize: 12,
  },
  boldText: {
    color: COLORS().black,
    fontWeight: '700',
  },
  orangeStatus: {
    backgroundColor: COLORS().red,
    width: 'auto',
    padding: 3,
    textAlign: 'center',
    borderRadius: 3,
    color: 'white',
    margin: 'auto',
  },
});
export default ContractCard;

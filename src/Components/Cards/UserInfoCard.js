import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import house from '../../consts/houses';
import {COLORS} from '../../consts/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text, Image, StyleSheet} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
const UserInfoCard = ({Item}) => {
  const {userInfo} = useSelector(state => state.userinfo);
  const {isDark} = useSelector(state => state.Home);

  return (
    <View
      style={{
        height: 'auto',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 15,
        marginVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: COLORS(isDark).gray,

        paddingVertical: 5,
        overflow: 'hidden',
        borderColor: COLORS(isDark).greyForDark,
        borderWidth: 1,
      }}>
      <View style={style.row}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <View>
            <Text
              style={{
                color: COLORS().blue,
                marginHorizontal: 5,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Name
            </Text>
          </View>
        </View>

        <View style={{marginHorizontal: 5}}>
          <Text
            style={{
              color: COLORS().blue,
              marginHorizontal: 5,
              fontWeight: '400',
              fontSize: 14,
            }}>
            {userInfo?.name}
          </Text>
        </View>
      </View>
      <View style={style.row}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <View>
            <Text
              style={{
                color: COLORS().blue,
                marginHorizontal: 5,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Order
            </Text>
          </View>
        </View>

        <View style={{marginHorizontal: 5}}>
          <Text
            style={{
              color: COLORS().blue,
              marginHorizontal: 5,
              fontWeight: '400',
              fontSize: 14,
            }}>
            {Item?.name}
          </Text>
        </View>
      </View>
      <View style={style.row}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <View>
            <Text
              style={{
                color: COLORS().blue,
                marginHorizontal: 5,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Order Description
            </Text>
          </View>
        </View>

        <View style={{marginHorizontal: 5}}>
          <Text
            style={{
              color: COLORS().blue,
              marginHorizontal: 5,
              fontWeight: '400',
              fontSize: 14,
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {Item?.description}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: COLORS().blue,
          borderBottomWidth: 1,
          width: '90%',
          opacity: 0.3,
          marginVertical: 10,
          marginHorizontal: '5%',
        }}
      />

      <View style={style.row}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <View>
            <Text
              style={{
                color: COLORS().blue,
                marginHorizontal: 5,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Amount to Pay
            </Text>
          </View>
        </View>

        <View style={{marginHorizontal: 5}}>
          <Text
            style={{
              color: COLORS().blue,
              marginHorizontal: 5,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {Item?.amount}
            AED
          </Text>
        </View>
      </View>
    </View>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
  },
});
export default UserInfoCard;

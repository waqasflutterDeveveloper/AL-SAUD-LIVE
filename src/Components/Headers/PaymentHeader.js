import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import house from '../../consts/houses';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {COLORS} from '../../consts/colors';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {setselectedProp} from '../../Store/MyProperty/MyPropertySlice';
import {useDispatch} from 'react-redux';

const PaymentHeader = ({title, item}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.flex}>
          <View style={{marginHorizontal: 5}}>
            <MaterialIcons
              name="arrow-back-ios"
              size={20}
              color={COLORS().grey}
              onPress={navigation.goBack}
            />
          </View>
          <View>
            <Image
              style={styles.image}
              source={
                item.image_128
                  ? {
                      uri: `data:image/jpeg;base64,${item.image_128}`,
                    }
                  : require('../../assets/unknown.jpg')
              }
            />
          </View>
          <View>
            <Text style={{color: COLORS().blue, marginHorizontal: 5}}>
              {item?.name}
            </Text>
            <Text style={{color: COLORS().dark, marginHorizontal: 5}}>
              {item?.project_id[1]}
            </Text>
          </View>
        </View>
        <View>
          <Pressable
            onPress={() => {
              //
              dispatch(setselectedProp(item));

              navigation.navigate('ContractDetails');
            }}>
            <Ionicons
              name="information-circle-outline"
              style={style.icon}
              size={18}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.bottom} />
    </View>
  );
};

export default PaymentHeader;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 70,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 50,
    width: 50,
    backgroundColor: COLORS().white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  bottom: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '90%',
    opacity: 0.3,
    marginVertical: 10,
    marginHorizontal: '5%',
  },
});

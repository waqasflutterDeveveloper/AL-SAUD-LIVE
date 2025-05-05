import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {COLORS} from '../../consts/colors';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const PaymentHeader = ({title, item}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconBox}>
          <View style={{marginHorizontal: 5}}>
            <MaterialIcons
              name="arrow-back-ios"
              size={20}
              color="grey"
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
          <View
            style={{
              width: '80%',
            }}>
            <Text style={{color: COLORS().blue, marginHorizontal: 5}}>
              {item?.name}
            </Text>
            <Text style={{color: COLORS().dark, marginHorizontal: 5}}>
              {item?.project_id[1]}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          width: '100%',
          opacity: 0.3,
          marginVertical: 10,
        }}
      />
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconBox: {
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
});

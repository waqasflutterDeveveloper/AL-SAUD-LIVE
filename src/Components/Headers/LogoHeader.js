import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {COLORS} from '../../consts/colors';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const ScreenWidth = Dimensions.get('window').width;
export default function LogoTitle({item}) {
  const navigation = useNavigation();
  const HomeDetailedData = useSelector(state => state.Home.Detailed);
  const selectedProp = useSelector(state => state.MyProperties.selectedProp);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <View style={{marginHorizontal: 5}}>
            <MaterialIcons
              name="arrow-back-ios"
              size={20}
              color={COLORS().grey}
            />
          </View>
        </Pressable>

        <View>
          {selectedProp ? (
            <Image
              style={styles.image}
              source={
                selectedProp?.image_128
                  ? {
                      uri: `data:image/jpeg;base64,${selectedProp?.image_128}`,
                    }
                  : require('../../assets/unknown.jpg')
              }
            />
          ) : (
            <Image
              style={styles.image}
              source={
                HomeDetailedData?.image_128
                  ? {
                      uri: `data:image/jpeg;base64,${HomeDetailedData?.image_128}`,
                    }
                  : require('../../assets/unknown.jpg')
              }
            />
          )}
        </View>
        <View>
          <Text style={{color: COLORS().blue, marginHorizontal: 5}}>
            {selectedProp ? selectedProp.name : HomeDetailedData?.name}
          </Text>
          <Text style={{color: COLORS().dark, marginHorizontal: 5}}>
            {selectedProp
              ? selectedProp.project_id?.[1]
              : HomeDetailedData?.project_id?.[1]}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    backgroundColor: COLORS().backgroundblue,
    width: ScreenWidth,
  },
  subContainer: {
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

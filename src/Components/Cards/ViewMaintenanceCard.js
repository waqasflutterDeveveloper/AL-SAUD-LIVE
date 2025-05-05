import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import house from '../../consts/houses';
import {COLORS} from '../../consts/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {getRTL} from '../../Helpers/RTLUtil';
import {useLanguage} from '../../Helpers/LanguageContext';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const ViewMentainenanceCard = ({parent}) => {
  const navigation = useNavigation();
  const {language, switchLanguage} = useLanguage();
  const [hasLegalCase, sethasLegalCase] = useState(false);
  const {isDark} = useSelector(state => state.Home);
  const states = ['confirm', 'running', 'to_renew', 'forced_renew', 'expired'];
  useEffect(() => {
    sethasLegalCase(
      parent?.contracts?.some(obj => {
        // console.log(parent, obj?.state, ' obj.legal_case_flag');
        return obj.legal_case_flag == false && states.includes(obj?.state);
      }),
    );

    // console.log(parent?.contracts, 'MyPropertiesData parent');
  }, [parent]);
  return (
    <Pressable
      onPress={() => navigation.navigate('AllMaintenances', {hasLegalCase})}>
      <View
        style={[
          style.flexRowbtw,
          {backgroundColor: COLORS(isDark).blakvsgrey},
        ]}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            width: '80%',
          }}>
          <View>
            <Text style={style.icon}>
              {/* <Image
              style={{width: 25, height: 25}}
              source={require('../../assets/png/contractpdf.png')}
            /> */}
              <MaterialCommunityIcons
                size={25}
                color={COLORS().blue}
                name="hammer-screwdriver"
              />
            </Text>
          </View>
          <View style={[style.flexcolstart]}>
            <Text
              numberOfLines={1}
              style={{
                color: COLORS(isDark).blueVsBlack,
                fontWeight: '200',
                fontWeight: 'bold',
                fontSize: 16,
                width: '100%',
              }}>
              {parent?.name}
            </Text>
            <Text
              style={{
                color: COLORS().grey,
                fontWeight: '400',
                fontSize: 12,
              }}></Text>
          </View>
        </View>

        <View
          style={{
            marginVertical: 2,
            marginHorizontal: 5,
            // flexDirection: 'row',
            alignItems: 'flex-end',
            // width: '30%',
          }}>
          {/* <Text
          style={{
            color: COLORS().red,
            fontWeight: '400',
            fontWeight: 'bold',
          }}>
          Expired
        </Text> */}
          <View style={style.circle}>
            <MaterialIcons
              style={{
                transform: [{rotate: language == 'ar' ? '180deg' : '0deg'}],
              }}
              name="keyboard-arrow-right"
              color={COLORS().white}
              size={18}
            />
          </View>
        </View>
      </View>
    </Pressable>
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
  flexcolstart: {
    height: 'auto',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS().backgroundLight,
    paddingVertical: 5,
  },
  flexRowbtw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: COLORS().backgroundLight,
    borderWidth: 1,
    borderColor: COLORS().tranparentBlue,
    borderRadius: 12,
    marginVertical: 5,
    marginHorizontal: 6,
    width: '90%',
    height: 80,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS().stock,
  },
  circle: {backgroundColor: COLORS().blue, padding: 5, borderRadius: 20},
  icon: {
    color: COLORS().dark,
    borderRadius: 30,
    padding: 15,
    // marginHorizontal: 3,
    fontSize: 18,
    backgroundColor: COLORS().tranparentBlue,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ViewMentainenanceCard;

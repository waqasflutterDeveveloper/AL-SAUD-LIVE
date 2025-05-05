import {COLORS} from '../../consts/colors';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const {width} = Dimensions.get('screen');

const BasicHeader = ({title, Icon, color}) => {
  const navigation = useNavigation();
  const {isDark} = useSelector(state => state.Home);

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 50,
        backgroundColor: COLORS(isDark).dark,
        marginBottom: -8,
      }}
      onPress={() => navigation.goBack()}>
      <View
        style={{
          ...styles.iconBox,
          backgroundColor: COLORS(isDark).dark,
        }}>
        {Icon && Icon}
        <View style={styles.titleBox}>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  iconBox: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    paddingHorizontal: 10,
    width: width,
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: COLORS().dark,
    marginHorizontal: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BasicHeader;

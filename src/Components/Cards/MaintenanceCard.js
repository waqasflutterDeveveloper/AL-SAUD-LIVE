import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import house from '../../consts/houses';
import {COLORS} from '../../consts/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewBottomSheet from '../Sheets/NewBottomSheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useEffect} from 'react';
import HTMLView from 'react-native-htmlview';
import {useSelector} from 'react-redux';
const MaintenanceCard = ({
  openModal,
  setOpenModal,
  handleNavigation,
  item,
  setMaintainenceSelceted,
  MaintainenceSelceted,
}) => {
  const ScreenWidth = Dimensions.get('window').width;
  useEffect(() => {}, []);
  // console.log(item, 'item stages');
  const {isDark} = useSelector(state => state.Home);

  return (
    <View
      style={{
        width: ScreenWidth * 0.9,
        marginHorizontal: 20,
      }}>
      <View style={style.header}>
        <View style={style.row}>
          {item.stages_ids[`${3}`] || item?.is_solved || item?.is_solved ? (
            <>
              <View
                style={{
                  height: 20,
                  width: 2.5,
                  backgroundColor:
                    item.stages_ids[`${3}`] || item?.is_solved
                      ? COLORS().green
                      : COLORS().inprogress,
                }}
              />
              <Image
                style={{
                  color: COLORS().green,
                  fontWeight: '700',
                  marginHorizontal: 5,
                  width: 15,
                  height: 15,
                }}
                source={require('../../assets/png/righttik.png')}
              />
              <Text
                style={{
                  color: COLORS().green,
                  fontWeight: '700',
                  marginHorizontal: 5,
                }}>
                {item?.stage_id[1]}
              </Text>
            </>
          ) : (
            <>
              <View
                style={{
                  height: 20,
                  width: 2.5,
                  backgroundColor: item?.is_solved
                    ? COLORS().blue
                    : COLORS().inprogress,
                }}
              />
              <Image
                style={{
                  color: COLORS().inprogress,
                  fontWeight: '700',
                  marginHorizontal: 5,
                  width: 15,
                  height: 15,
                }}
                source={require('../../assets/png/inprogress.png')}
              />
              <Text
                style={{
                  color: COLORS().inprogress,
                  fontWeight: '700',
                  marginHorizontal: 5,
                }}>
                {item?.stage_id[1]}
              </Text>
            </>
          )}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign
            name="checkcircle"
            size={10}
            color={
              item.stages_ids[`${1}`] || item?.is_solved
                ? COLORS().blue
                : COLORS().grey
            }
          />
          <View
            style={{
              ...style.line,
              backgroundColor:
                item.stages_ids[`${2}`] ||
                item.stages_ids[`${3}`] ||
                item.stages_ids[`${4}`] ||
                item?.is_solved
                  ? COLORS().blue
                  : COLORS().grey,
            }}
          />
          {item.stages_ids[`${2}`] || item?.is_solved ? (
            <AntDesign
              name="checkcircle"
              size={10}
              color={
                item.stages_ids[`${2}`] || item?.is_solved
                  ? COLORS().blue
                  : COLORS().grey
              }
            />
          ) : (
            <AntDesign
              name="exclamationcircle"
              size={10}
              color={COLORS().grey}
            />
          )}

          <View
            style={{
              ...style.line,
              backgroundColor:
                item.stages_ids[`${3}`] || item?.is_solved
                  ? COLORS().blue
                  : COLORS().grey,
            }}
          />
          {item.stages_ids[`${3}`] || item?.is_solved || item?.is_solved ? (
            <AntDesign
              name="checkcircle"
              size={10}
              color={
                item.stages_ids[`${3}`] || item?.is_solved || item?.is_solved
                  ? COLORS().blue
                  : COLORS().grey
              }
            />
          ) : (
            <AntDesign
              name="exclamationcircle"
              size={10}
              color={COLORS().grey}
            />
          )}
        </View>
      </View>

      <View
        style={[
          style.flexcolstart,
          {backgroundColor: COLORS(isDark).greyForDark},
        ]}>
        <View style={style.name}>
          {item?.maintenance_sequence && (
            <Text style={{color: COLORS().blue, paddingHorizontal: 10}}>
              {item?.maintenance_sequence}
            </Text>
          )}
        </View>
        <View style={style.flexRowbtw}>
          <View style={style.name}>
            <Text style={style.nameContent}> {item?.name}</Text>
          </View>
          <Text style={style.date}>{item?.create_date}</Text>
        </View>
        {item?.technician_id && (
          <View style={style.flexRowbtw}>
            <Text style={style.date}>Technician </Text>

            <Text style={style.date}>{item?.technician_id}</Text>
          </View>
        )}
        {item?.schedule_date && (
          <View style={style.flexRowbtw}>
            <Text style={style.date}>schedule Date</Text>

            <Text style={style.date}>{item?.schedule_date}</Text>
          </View>
        )}

        <View style={style.midLine} />
        <View style={style.row2}>
          <View
            style={{
              width: '55%',
              overflow: 'hidden',
            }}>
            {console.log(item?.description)}
            <HTMLView
              StyleSheet={style}
              value={item?.description}
              textComponentProps={{style: componentStyles}}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setMaintainenceSelceted(item);

              handleNavigation();
            }}
            style={{
              alignItems: 'flex-end',
              marginHorizontal: 10,
              marginBottom: 5,
              width: '35%',
            }}>
            <View style={style.coverBtn}>
              <Text style={style.txt}>View Details</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  line: {
    // borderColor: 'white',
    height: 1,
    borderWidth: 0.5,
    // opacity: 0.4,
    marginVertical: 20,
    marginHorizontal: '5%',
    // height: 10,
  },
  flexcolstart: {
    flexDirection: 'column',
    borderRadius: 15,
    backgroundColor: COLORS().backgroundLight,
    padding: 5,
    borderWidth: 1,
    borderColor: COLORS().stock,
  },
  flexRowbtw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    // backgroundColor: 'red',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginBottom: 10,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginLeft: 8,
  },
  line: {width: 50, height: 2.5},
  coverBtn: {
    width: '100%',
    height: 40,
    backgroundColor: COLORS().tranparentBlue,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {color: COLORS().blue, fontSize: 12, fontWeight: '600'},
  midLine: {
    width: '92%',
    backgroundColor: COLORS().bottomBorder,
    height: 1,
    marginBottom: 10,
    alignSelf: 'center',
  },
  date: {
    color: COLORS().grey,
    fontWeight: '400',
    fontWeight: 'bold',
    fontSize: 12,
  },
  name: {
    color: COLORS().grey,
    fontWeight: 'bold',
    fontSize: 13,
    fontWeight: '400',
    display: 'flex',
    flexDirection: 'row',
  },
  nameContent: {
    color: COLORS().grey,
    fontWeight: 'bold',
    fontSize: 13,
    fontWeight: '400',
    display: 'flex',
    flexDirection: 'row',
  },
  p: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
});
const componentStyles = StyleSheet.create({
  color: COLORS().grey,
});
export default MaintenanceCard;

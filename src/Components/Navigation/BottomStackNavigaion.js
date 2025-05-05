import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/Home';
import DetailScreen from '../../screens/DetailsScreen';
import LoginScreen from '../../screens/Login';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import house from '../../consts/houses';
import BasicHeader from '../Headers/BasicHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../consts/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text, Image} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Inquiry from '../../screens/Inquiry';
import SubmitInquiry from '../../screens/SubmitInquiry';
import MyProperties from '../../screens/MyProperties';
import PaymentScreen from '../../screens/Payment';
import StackNavigation from './StackNavigation';
import SettingStack from './SettingStack';
import FavScreen from '../../screens/Fav';
import PaymentHeader from '../Headers/PaymentHeader';
import HomeStack from './HomeStack';
import SettingScreen from '../../screens/Settings';
import {useSelector} from 'react-redux';
const Tab = createBottomTabNavigator();

function MyTabs() {
  const {userInfo, logout} = useSelector(state => state.userinfo);

  function LogoTitle() {
    return (
      <View
        style={{
          height: 550,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{marginHorizontal: 5}}>
            <MaterialIcons
              name="arrow-back-ios"
              size={20}
              // onPress={navigation.goBack}
            />
          </View>
          <View>
            <Image
              style={{
                height: 50,
                width: 50,
                backgroundColor: COLORS().white,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 3,
              }}
              source={house[0].image}
            />
          </View>
          <View>
            <Text style={{color: COLORS().blue, marginHorizontal: 5}}>
              {' '}
              Villa No.12 - 55 B Street
            </Text>
            <Text style={{color: COLORS().dark, marginHorizontal: 5}}>
              {' '}
              Old Dubai Hwy No 12
            </Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarVisible: false,
        tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="home-outline"
                size={22}
                color={focused ? COLORS().red : COLORS().dark}
              />
            );
          },
          headerShown: false,
        }}
        name="HomeMain"
        component={HomeStack}
      />
      {userInfo?.uid ? (
        <>
          <Tab.Screen
            options={{
              headerLeft: false,
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: COLORS().white,
                height: 80,
              },
              header: props => <BasicHeader {...props} title="My properties" />,
              tabBarIcon: ({focused}) => {
                return (
                  <Fontisto
                    name="holiday-village"
                    size={18}
                    color={focused ? COLORS().red : COLORS().dark}
                  />
                );
              },
              headerShown: false,
            }}
            name="my_Property"
            component={StackNavigation}
          />
        </>
      ) : null}

      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="cards-heart-outline"
                color={focused ? COLORS().red : COLORS().dark}
                size={20}
              />
            );
          },
          headerShown: false,
        }}
        name="Loved"
        component={FavScreen}
      />

      {userInfo?.uid ? (
        <>
          <Tab.Screen
            options={{
              headerStyle: {
                backgroundColor: COLORS().backgroundblue,
              },
              tabBarIcon: ({focused}) => {
                return (
                  <Ionicons
                    name="md-settings-outline"
                    size={20}
                    style={{fontWeight: 'bold'}}
                    color={focused ? COLORS().red : COLORS().dark}
                  />
                );
              },

              headerShown: false,
            }}
            name="settingsMain"
            component={SettingStack}
          />
        </>
      ) : null}
    </Tab.Navigator>
  );
}

export default MyTabs;

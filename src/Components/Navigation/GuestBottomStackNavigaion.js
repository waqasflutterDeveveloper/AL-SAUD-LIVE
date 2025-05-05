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
import HomeScreenGuest from '../../screens/HomeGuest';
const Tab = createBottomTabNavigator();

function MyTabs() {
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
        name="HomeScreenGuest"
        component={HomeScreenGuest}
      />

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
        name="FavScreen"
        component={FavScreen}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;

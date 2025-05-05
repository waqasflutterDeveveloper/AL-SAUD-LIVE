import {createStackNavigator} from '@react-navigation/stack';
import {COLORS} from '../../consts/colors';
import LoginScreen from '../../screens/Login';
import SignupScreen from '../../screens/SignUp';
import SubmitInquiry from '../../screens/SubmitInquiry';

import GuestBottomStackNavigaion from './GuestBottomStackNavigaion';
import Welcome from '../../screens/Welcome';
import MainStack from './MainNav';
import HomeScreen from '../../screens/Home';
import Houses from '../../screens/Houses';
import DetailsScreen from '../../screens/DetailsScreen';
import ExploreScreen from '../../screens/ExploreScreen/index';
import SettingsScreen from '../../screens/Settings';
import Signup from '../../screens/SignUp';
import MyPropertiesScreen from '../../screens/MyProperties';
import PaymentScreen from '../../screens/Payment';
import PaymentScreenTab from '../../screens/PaymentsTabScreen';
import NotificationScreen from '../../screens/Notification';
import LiveVisit from '../../screens/LiveVisit';
import FavScreen from '../../screens/Fav';
import TermsOfService from '../../TermsOfService';
import AboutUs from '../../AboutUs';
import FilterScreen from '../../screens/FilterScreen';
import Policy from '../../Policy';
import HelpCenterScreen from '../../screens/HelpCenterScreen';
import RecoveryPassword from '../../screens/RecoveryPassword';
import ResetNewPassword from '../../screens/ResetPassword';
import OTPCode from '../../screens/OTPCode';
import AudioRecord from '../AudioRecord/index';
import CreateNewPassword from '../../CreateNewPassword';
import PaymentMethod from '../../screens/PaymentMethod';
import PersonalInformation from '../../PersonalInformation';
import BasicHeader from '../Headers/BasicHeader';
import SearchScreen from '../../screens/SearchScreen';
import PdfView from '../../screens/PdfVeiw';
import PaymentWebView from '../../screens/PaymentWebView';
import MaintenanceDetails from '../../screens/MaintenanceDetails';
import MyVisitsScreen from '../../screens/MyVisits';
import Inquiry from '../../screens/Inquiry';
import CreateRequestScreen from '../../screens/CreateRequest';
import FullMap from '../../screens/FullMap';
import ContractDetails from '../../screens/ContractDetails/index';
import FiltrationScreen from '../../screens/FiltrationScreen';

import VideoRecScreen from '../../screens/VideoRec';
import FullMapFilter from '../../screens/FullMapFilter';
import {useSelector} from 'react-redux';

import WrapperWithBottomMenu from './WrapperWithBottomMenu';

const Stack = createStackNavigator();

export default function ParentStack({}) {
  const userInfo = useSelector(state => state.userinfo.userInfo);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 80,
          },

          headerShown: false,
        }}
        name="welcome"
        component={Welcome}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 80,
          },

          headerShown: false,
        }}
        name="MainStack"
        component={WrapperWithBottomMenu}
      />
    </Stack.Navigator>
  );
}

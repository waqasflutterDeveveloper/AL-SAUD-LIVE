import {createStackNavigator} from '@react-navigation/stack';
import {COLORS} from '../../consts/colors';
import LoginScreen from '../../screens/Login';
import SignupScreen from '../../screens/SignUp';
import SubmitInquiry from '../../screens/SubmitInquiry';

import GuestBottomStackNavigaion from '../../Components/Navigation/GuestBottomStackNavigaion';
import Welcome from '../../screens/Welcome';
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
import Contracts from '../../screens/Contracts';
import PropertyInfo from '../../screens/PropertyInfo';
import AllMaintenances from '../../screens/AllMaintenances';
import AllPayments from '../../screens/AllPayments';
import ResetPassword from '../../screens/ResetPassword';

const Stack = createStackNavigator();

export default function MainStack() {
  const userInfo = useSelector(state => state.userinfo.userInfo);
  const {isDark} = useSelector(state => state.Home);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },

          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="Main"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },

          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },

          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="Fav"
        component={FavScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            // height: 70,
          },

          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="MyProperties"
        component={!userInfo?.partner_id ? LoginScreen : MyPropertiesScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            // height: 70,
          },

          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="Contracts"
        component={Contracts}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            // height: 70,
          },

          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="AllPayments"
        component={AllPayments}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            // height: 70,
          },

          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="PropertyInfo"
        component={PropertyInfo}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            // height: 70,
          },

          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="AllMaintenances"
        component={AllMaintenances}
      />

      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },

          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="PaymentScreen"
        component={PaymentScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },

          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="PaymentScreenTab"
        component={PaymentScreenTab}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },

          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="Explore"
        component={ExploreScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },

          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="houses"
        component={Houses}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="signup"
        component={Signup}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="PaymentMethod"
        component={PaymentMethod}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="Search"
        component={SearchScreen}
      />

      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },

          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },

          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="Details_Screen"
        component={DetailsScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            // height: 70,
          },
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: 'Notification',
          headerLeft: false,
          headerShown: false,
        }}
        name="Notification"
        component={NotificationScreen}
      />

      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="Filtration"
        component={FiltrationScreen}
      />

      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            // height: 70,
          },
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: 'Filter',
          headerLeft: false,
          headerShown: false,
        }}
        name="Filter"
        component={FilterScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="myVisits"
        component={MyVisitsScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },

          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: 'Request a live visit',
        }}
        name="LiveVisit"
        component={LiveVisit}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },

          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="TermsOfService"
        component={TermsOfService}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },

          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="AboutUs"
        component={AboutUs}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="Policy"
        component={Policy}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="HelpCenterScreen"
        component={HelpCenterScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS(isDark).dark,
            height: 80,
          },

          headerShown: true,
          headerTitle: 'Create New Password ',
          headerTitleStyle: {
            color: COLORS(isDark).WhiteForDark,
          },
          headerBackTitleStyle: {
            color: COLORS(isDark).WhiteForDark,
          },
        }}
        name="CreateNewPassword"
        component={CreateNewPassword}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 80,
          },

          headerShown: true,
          headerTitle: 'Recovery password',
        }}
        name="welcome23"
        component={RecoveryPassword}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 80,
          },

          headerShown: true,
          headerTitle: 'Reset password',
        }}
        name="ResetPassword"
        component={ResetPassword}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },

          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="GuestBottomStackNavigaion"
        component={GuestBottomStackNavigaion}
      />
      <Stack.Screen
        options={{
          headerTitle: props => (
            <BasicHeader
              color="white"
              {...props}
              title="Personal Information"
            />
          ),
          headerShown: false,
        }}
        name="PersonalInformation"
        component={PersonalInformation}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            height: 70,
          },
          // headerTitle: props => (
          //   <ContactHeader {...props} title="Pdf " item={selectedProp} />
          // ),
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="PdfView"
        component={PdfView}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },

          headerShown: true,
          headerTitle: 'Payment Gateway',
        }}
        name="PaymentWebView"
        component={PaymentWebView}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS().white,
            height: 70,
          },
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: 'Maintenance Details',
        }}
        name="MaintenanceDetails"
        component={MaintenanceDetails}
      />
      <Stack.Screen
        options={{
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: true,
          // header: props => <LogoHeader {...props} />,
        }}
        name="SubmitInquiry"
        component={SubmitInquiry}
      />
      <Stack.Screen
        options={{
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: true,
          // header: props => <LogoHeader {...props} />,
        }}
        name="Inquiry"
        component={Inquiry}
      />
      <Stack.Screen
        options={{
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
          // header: props => <LogoHeader {...props} />,
        }}
        name="FullMap"
        component={FullMap}
      />
      <Stack.Screen
        options={{
          // header: props => <LogoTitle {...props} item={selectedProp} />,
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: 'Maintenance Request',
        }}
        name="CreateRequestScreen"
        component={CreateRequestScreen}
      />
      <Stack.Screen
        options={{
          // header: props => <LogoTitle {...props} item={selectedProp} />,
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
          // headerTitle: 'Maintenance Request',
        }}
        name="ContractDetails"
        component={ContractDetails}
      />
      <Stack.Screen
        options={{
          // header: props => <LogoTitle {...props} item={selectedProp} />,
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="videoRec"
        component={VideoRecScreen}
      />
      <Stack.Screen
        options={{
          // header: props => <LogoTitle {...props} item={selectedProp} />,
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="AudioRecord"
        component={AudioRecord}
      />
      <Stack.Screen
        options={{
          // header: props => <LogoTitle {...props} item={selectedProp} />,
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="FullMapFilter"
        component={FullMapFilter}
      />
    </Stack.Navigator>
  );
}

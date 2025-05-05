import {createStackNavigator} from '@react-navigation/stack';
import {COLORS} from '../../consts/colors';
import LoginScreen from '../../screens/Login';
import SignupScreen from '../../screens/SignUp';
import SubmitInquiry from '../../screens/SubmitInquiry';

import GuestBottomStackNavigaion from './GuestBottomStackNavigaion';
import HomeScreen from '../../screens/Home';
import PaymentScreenTab from '../../screens/PaymentsTabScreen';

import SettingsScreen from '../../screens/MaintenanceScreens/Settings';
import Signup from '../../screens/SignUp';
import MyPropertiesScreen from '../../screens/MaintenanceScreens/MyProperties';

import NotificationScreen from '../../screens/Notification';
import LiveVisit from '../../screens/LiveVisit';
import TermsOfService from '../../TermsOfService';
import AboutUs from '../../AboutUs';
import FilterScreen from '../../screens/FilterScreen';
import Policy from '../../Policy';
import HelpCenterScreen from '../../screens/HelpCenterScreen';
import RecoveryPassword from '../../screens/RecoveryPassword';
import CreateNewPassword from '../../CreateNewPassword';
import PaymentMethod from '../../screens/PaymentMethod';
import PersonalInformation from '../../PersonalInformation';
import BasicHeader from '../Headers/BasicHeader';

import Inquiry from '../../screens/Inquiry';
import CreateRequestScreen from '../../screens/CreateRequest';
import FullMap from '../../screens/FullMap';
import ContractDetails from '../../screens/ContractDetails/index';

import VideoRecScreen from '../../screens/MaintenanceScreens/VideoRec';
import FullMapFilter from '../../screens/FullMapFilter';
import {useSelector} from 'react-redux';
import PaymentScreen from '../../screens/Payment';
import MaintenanceUser from '../../screens/MaintenanceScreens/MaintenanceUser';
import MaintenanceScreen from '../../screens/MaintenanceScreens/Home';
import Welcome from '../../screens/MaintenanceScreens/Welcome';
import RecordVoice from '../../screens/MaintenanceScreens/RecordVoice';
import MaintenanceDetails from '../../screens/MaintenanceScreens/MaintenanceDetails';

const Stack = createStackNavigator();

export default function MainStack() {
  const userInfo = useSelector(state => state.userinfo.userInfo);
  const {isDark} = useSelector(state => state.Home);

  return (
    <Stack.Navigator initialRouteName="PaymentScreen">
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
            height: 70,
          },

          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="Main"
        component={MaintenanceUser}
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
          // header: props => <LogoTitle {...props} item={selectedProp} />,
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="RecordVoice"
        component={RecordVoice}
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
        component={MaintenanceUser}
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
        name="login"
        component={LoginScreen}
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
            backgroundColor: COLORS().white,
            height: 80,
          },

          headerShown: true,
          headerTitle: 'Create New Password ',
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
          headerShown: true,
        }}
        name="PersonalInformation"
        component={PersonalInformation}
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
        name="FullMapFilter"
        component={FullMapFilter}
      />
    </Stack.Navigator>
  );
}

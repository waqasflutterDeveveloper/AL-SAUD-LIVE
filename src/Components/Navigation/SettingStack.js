import {createStackNavigator} from '@react-navigation/stack';
import SuccessPaymentScreen from '../../screens/SuccessPayments';
import PaymentMethod from '../../screens/PaymentMethod';
import BasicHeader from '../Headers/BasicHeader';
import ContactHeader from '../Headers/ContactHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PaymentScreen from '../../screens/Payment';
import {COLORS} from '../../consts/colors';
import PaymentHeader from '../Headers/PaymentHeader';
import MyProperties from '../../screens/MyProperties';
import CreateRequestScreen from '../../screens/CreateRequest';
import Inquiry from '../../screens/Inquiry';
import LogoTitle from '../Headers/LogoHeader';
import {useSelector} from 'react-redux';
import DetailsScreen from '../../screens/DetailsScreen';
import ContractDetails from '../../screens/ContractDetails';
import PdfView from '../../screens/PdfVeiw';
import VideoRecScreen from '../../screens/VideoRec';
import SettingScreen from '../../screens/Settings';
import MyVisitsScreen from '../../screens/MyVisits';
import PersonalInformation from '../../PersonalInformation';
import CreateNewPassword from '../../CreateNewPassword';
import TermsOfService from '../../TermsOfService';
import AboutUs from '../../AboutUs';
import Policy from '../../Policy';
import HelpCenterScreen from '../../screens/HelpCenterScreen';
import RecoveryPassword from '../../screens/RecoveryPassword';
import OTPCode from '../../screens/OTPCode';

const Stack = createStackNavigator();

export default function MyStack() {
  const selectedProp = useSelector(state => state.MyProperties.selectedProp);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: props => <BasicHeader {...props} title="Settings" />,
          headerShown: false,
        }}
        name="SettingScreen"
        component={SettingScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: props => (
            <BasicHeader color="white" {...props} title="Help Center" />
          ),
          headerShown: true,
        }}
        name="HelpCenterScreen"
        component={HelpCenterScreen}
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
          headerTitle: props => (
            <BasicHeader color="white" {...props} title="RecoveryPassword" />
          ),
          headerShown: true,
        }}
        name="RecoveryPassword"
        component={RecoveryPassword}
      />
      <Stack.Screen
        options={{
          headerTitle: props => (
            <BasicHeader
              color="white"
              {...props}
              title="OTP Code Verification"
            />
          ),
          headerShown: true,
        }}
        name="OTPCode"
        component={OTPCode}
      />

      <Stack.Screen
        options={{
          headerTitle: props => (
            <BasicHeader color="white" {...props} title="Terms Of Service" />
          ),
          headerShown: true,
        }}
        name="TermsOfService"
        component={TermsOfService}
      />
      <Stack.Screen
        options={{
          headerTitle: props => (
            <BasicHeader color="white" {...props} title="About Us" />
          ),
          headerShown: true,
        }}
        name="AboutUs"
        component={AboutUs}
      />
      <Stack.Screen
        options={{
          headerTitle: props => (
            <BasicHeader color="white" {...props} title="Privacy & Policy" />
          ),
          headerShown: true,
        }}
        name="Policy"
        component={Policy}
      />

      <Stack.Screen
        options={{
          headerTitle: props => (
            <BasicHeader color="white" {...props} title="Create New Password" />
          ),
          headerShown: true,
        }}
        name="CreateNewPassword"
        component={CreateNewPassword}
      />
      <Stack.Screen
        options={{
          headerLeft: false,
          headerStyle: {
            backgroundColor: COLORS().backgroundblue,
          },
          headerTitle: props => (
            <BasicHeader
              {...props}
              title="My Visits"
              Icon={
                <MaterialIcons
                  name="arrow-back-ios"
                  size={20}
                  color="black"
                  // onPress={navigation.goBack}
                />
              }
            />
          ),
          headerShown: true,
        }}
        name="myVisits"
        component={MyVisitsScreen}
      />
    </Stack.Navigator>
  );
}

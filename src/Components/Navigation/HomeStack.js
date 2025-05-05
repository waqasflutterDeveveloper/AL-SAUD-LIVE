import {createStackNavigator} from '@react-navigation/stack';
import SuccessPaymentScreen from '../../screens/SuccessPayments';
import PaymentMethod from '../../screens/PaymentMethod';
import BasicHeader from '../Headers/BasicHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../../screens/Home';
import HomeDataFilter from '../../screens/HomeDataFilter';

import DetailsScreen from '../../screens/DetailsScreen';
import Inquiry from '../../screens/Inquiry';
import SubmitInquiry from '../../screens/SubmitInquiry';
import LogoHeader from '../Headers/LogoHeader';
import FilterScreen from '../../screens/FilterScreen';
const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="HomeInstak"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="HomeDataFilter"
        component={HomeDataFilter}
      />

      <Stack.Screen
        options={{
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="DetailsScreenInStack"
        component={DetailsScreen}
      />
      <Stack.Screen
        options={{
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: true,
          header: props => <LogoHeader {...props} />,
        }}
        name="Inquiry"
        component={Inquiry}
      />
      <Stack.Screen
        options={{
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: true,
          header: props => <LogoHeader {...props} />,
        }}
        name="SubmitInquiry"
        component={SubmitInquiry}
      />
      <Stack.Screen
        options={{
          headerLeft: false,
          headerBackTitleVisible: false,
          headerShown: true,
          header: props => (
            <BasicHeader
              {...props}
              title="Filters"
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
        }}
        name="FilterScreen"
        component={FilterScreen}
      />
    </Stack.Navigator>
  );
}

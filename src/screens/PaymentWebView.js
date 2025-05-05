import {View, Text, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {WebView} from 'react-native-webview';

import {setPayments} from '../Store/Payments/PaymentsSlice';
import {useSelector} from 'react-redux';
import {usePaymentApi} from '../apis/Home';
import Header from '../Components/Header';
import {COLORS} from '../consts/colors';

const PaymentWebView = ({route}) => {
  const {payment_link} = useSelector(state => state.Payments);
  const {mutate: SetPayment} = usePaymentApi();
  const {isDark} = useSelector(state => state.Home);

  const {id, type} = route.params;
  // const SubmitPayment = async () => {
  //   // dispatch(setpaymentLink(null));

  //
  // };

  useEffect(() => {
    if (id && type) {
      SetPayment({id, type});
    }
  }, [id]);

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={COLORS().white}
        barStyle="dark-content"
      />
      {/* <Header back title={'Payment Details'} /> */}

      <View
        style={{
          width: '100%',
          height: '90%',
          // backgroundColor: 'red',
          marginBottom: 80,
        }}>
        <WebView source={{uri: payment_link}} />
      </View>
    </>
  );
};

export default PaymentWebView;

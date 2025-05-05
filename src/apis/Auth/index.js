import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {api} from '../../axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-simple-toast';

import {setuserInfo} from '../../Store/Message/MessageSlice';
import {UtcConvert} from '../../Helpers/UtcConvertor';

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    //
    await AsyncStorage.setItem('User', jsonValue);
  } catch (e) {
    // saving error
  }
};
const postrequest = async data => {
  return await api.post('auth/', {
    params: {
      password: data.password,
      login: data.email,
      db: 'odooerp-ae-property2-main-7530106',
      date: UtcConvert(),
    },
  });
};
const postCreateUserrequest = async data => {
  return await api.post('api/signup', {
    params: {
      password: data.password,
      login: data.email,
      name: data.Name,
      date: UtcConvert(),

      mobile: data.mobile,
      type: data.is_tenant,
    },
  });
};

const useLoginApi = data => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return useMutation(postrequest, {
    onSuccess: res => {
      // const result = {
      //   status: res.status + '-' + res.statusText,
      //   headers: res.headers,
      //   data: res.data,
      // };

      dispatch(setuserInfo(res.data.result));
      if (res.data.result == 'Invalid credentials.') {
      }
      storeData(res.data.result);
      if (res.data.result.uid) {
        // Toast.show('User Login Succefully.', Toast.LONG, {
        //   backgroundColor: 'orange',
        // });

        if (res.data.result == 'Already Registered') {
          // Toast.show(res.data.result, Toast.LONG, {
          //   backgroundColor: 'red',
          // });
          return;
        }
        navigation.navigate('Main');
      }
      return res.data;
    },
    onError: err => {
      //
      //   dispatch(errorAtLogin(err.response.data.detail));
      //  return err;
    },
  });
};

const useCreateUserHook = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return useMutation(postCreateUserrequest, {
    onSuccess: res => {
      const result = {
        status: res.status + '-' + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      if (res.data.result.uid) {
        // Toast.show('User Regestirted Succefully.', Toast.LONG, {
        //   backgroundColor: 'orange',
        // });
      }
      //
      navigation.navigate('login');
    },
    onError: err => {
      //
      //   dispatch(errorAtLogin(err.response.data.detail));
      //  return err;
    },
  });
};

export {useLoginApi, useCreateUserHook};

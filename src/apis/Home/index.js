import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {api} from '../../axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-simple-toast';

import {setuserInfo} from '../../Store/Message/MessageSlice';
import {
  setbestselling_properties,
  setFav,
  setHomeData,
  setpopular_properties,
  setproperty_by_type,
  setproperty_by_project,
  setrecommend_properties,
  setReviews,
  setSearch,
  setComments,
  setupcomingVisits,
  setNotifications,
  setcontractDocuments,
} from '../../Store/HomeData/HomeSlice';
import {setmyproperties} from '../../Store/MyProperty/MyPropertySlice';
import {setCreateVisit} from '../../Store/CreateVisit/CreateVistSlice';
import {
  setMaintainence,
  setMaintainenceUserDate,
} from '../../Store/Maintainence/MaintainenceSlice';
import {setPayments, setpaymentLink} from '../../Store/Payments/PaymentsSlice';
import {setHelpCenter} from '../../Store/HelpCenterSlice/HelpCenterSlice';
import {setallFilters} from '../../Store/Hometypes/HometypesSlices';
import RNRestart from 'react-native-restart';

import {
  setPass,
  setPersonalInfo,
} from '../../Store/PersonalInfoSlice/PersonalInfoSlice';
import {setHomeTypes} from '../../Store/Hometypes/HometypesSlices';
import {setHomeprojects} from '../../Store/HomeProjects/HomeProjectsSlices';
import {getFavoriteProducts} from '../../Helpers/FavHelpers';
const getHomeData = async data => {
  return await api.post('api/generic/property.flat', {});
};
const getFilterRoomsPriceTypes = async data => {
  return await api.post('api/filter_types_rooms_price', {});
};
const getAllFilter = async data => {
  // console.log(data);
  return await api.post('api/filter_properties', {
    params: data,
  });
};

const getHomeTypes = async data => {
  return await api.post('api/property_type', {});
};
const GetContractDocument = async data => {
  return await api.post('api/get_contract_document', {params: data});
};
const GetContractPayment = async data => {
  return await api.post('api/get_payment_receipt', {params: data});
};
const getHomeProjects = async data => {
  return await api.post('api/property_states_list', {});
};
const getMyPropertiesData = async data => {
  return await api.post(`api/get_my_property/${data.partner_id}`, {});
};
const getHelpCenter = async data => {
  return await api.post(`api/get_company_info/`, {});
};
const getProperties_pagers = async data => {
  // console.log(data?.id, 'idddd');
  return await api.post(`api/get_properties_pagers/page/${data.id}`, {});
};
const getMaintianenceData = async data => {
  return await api.post('api/property_requests', {
    params: {
      flat: data.flat,
      partner: data.partner,
      partner_type: data.partner_type,
    },
  });
};
const getMaintianenceOneData = async data => {
  return await api.post(`api/property_requests/${data?.id}`, {});
};
const getSearch = async data => {
  console.log(data);
  return await api.post('api/property_by_keyword', {
    params: {
      search: data.text,
    },
  });
};

const GetPayment = async data => {
  return await api.post('api/generate_payment_link', {
    params: {
      type: data?.type,
      payment_id: data.id,
    },
  });
};
const ChangePersonalInfo = async data => {
  return await api.post('api/change_personal_info', {
    params: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      partner_id: data.partner_id,
      db: data.db,
      password: data.password,
    },
  });
};
const ChangePassword = async data => {
  return await api.post('api/change_password', {
    params: {
      password: data.password,
      confirm_password: data.confirm_password,
      partner_id: data.partner_id,
    },
  });
};

const getPaymentsForTenantData = async data => {
  // console.log(data, 'data aaaaa');
  const contract = {};
  if (data?.contract) {
    contract['contract_id'] = data?.contract;
  }
  return await api.post('api/property_payments', {
    params: {
      flat: data.flat,
      tenant: data.partner,
      partner_type: data.partner_type,
      ...contract,
    },
  });
};
const GetMyFav = async data => {
  const fav = await getFavoriteProducts(); //await AsyncStorage.getItem('Fav');
  const resultString = fav.join(', '); // Converts the array to a string with commas and a space

  console.log(fav, 'fav hook');

  return await api.post('api/get_my_favorites', {
    params: {
      flat_ids: resultString,
    },
  });
};
const GetMainttenanceUserData = async data => {
  // console.log(data, 'dataaa');
  return await api.post('/api/get_my_maintenance_requests', {
    params: {
      user_id: data.partner_id, //670, //data.id,
    },
  });
};

const GetReviews = async data => {
  return await api.post('api/get_property_flat_reviews', {
    params: {
      flat_id: data.id, //670, //data.id,
    },
  });
};
const GetNotifications = async data => {
  // console.log(data, 'dataaa');
  return await api.post('api/partner_notifications', {
    params: {
      partner_id: data.id, //670, //data.id,
      model: data?.model,
    },
  });
};
const GetmaintenanceNotifications = async data => {
  // console.log(data, 'dataaa');
  return await api.post(`api/generic_details/maintenance.request/${data?.id}`, {
    params: {
      partner_id: data.id, //670, //data.id,
    },
  });
};
const GetContractNotifications = async data => {
  // console.log(data, 'dataaa');
  return await api.post(`api/get_contract_details/${data?.id}`, {});
};

const GetUpcommingVisit = async data => {
  return await api.post(`api/property_visits_upcoming/${data.id}`, {});
};
const GetrecommendProperties = async data => {
  return await api.post(`api/recommend_properties`, {});
};
const GetbestsellingProperties = async data => {
  return await api.post(`api/bestselling_projects`, {});
};
const GetpopularProperties = async data => {
  return await api.post(`api/popular_properties`, {});
};
const Getpropertybytype = async data => {
  // console.log(data);
  return await api.post(
    `api/get_properties_pagers_by_type/${data.id}/page/${
      data?.page ? data.page : 1
    }`,
    {},
  );
};
const Gepropertybyproject = async data => {
  return await api.post(`api/property_by_project/${data.id}`, {});
};
//
const CreateVist = async data => {
  return await api.post('api/property_create_visit', {
    params: {
      flat: data.flat,
      name: data.name,
      date_time: data?.date_time,
      partner_id: data.partner_id,
    },
  });
};

const SaveFCM = async data => {
  // console.log(data, 'data');
  return await api.post('api/store_device_token', {
    params: {
      partner_id: data?.id,
      device_token: data?.FCM,
    },
  });
};
const SaveFCMWhenLogout = async data => {
  // console.log(data, 'data');
  return await api.post('api/store_device_token', {
    params: {
      partner_id: data?.id,
      device_token: '',
    },
  });
};
const postCreateUserrequest = async data => {
  return await api.post('api/signup', {
    params: {
      password: data.password,
      login: data.email,
      name: data.Name,

      mobile: data.mobile,
      type: data.is_tenant,
    },
  });
};

const useHomeApi = refreshing => {
  const dispatch = useDispatch();
  const {DontMakeAnotherCall} = useSelector(state => state.Home);

  return useQuery(['home', refreshing], getHomeData, {
    onSuccess: res => {
      let reversed = [...res.data?.result];
      if (!DontMakeAnotherCall) {
        dispatch(setHomeData(reversed.reverse()));
      }
      return res.data;
    },
    onError: err => {},
  });
};
const useAllFilterApi = data => {
  const dispatch = useDispatch();
  return useMutation(getAllFilter, {
    onSuccess: res => {
      // console.log(res.data?.result, 'res.data?.result');
      dispatch(setHomeData(res.data?.result));
      return res.data;
    },
    onError: err => {},
  });
};
const useGetContractDocument = data => {
  const dispatch = useDispatch();
  return useMutation(GetContractDocument, {
    onSuccess: res => {
      // console.log(res.data?.result, 'res.data?.result');
      dispatch(setcontractDocuments(res.data?.result));
      return res.data;
    },
    onError: err => {},
  });
};
const useGetContractPayment = data => {
  const dispatch = useDispatch();
  return useMutation(GetContractPayment, {
    onSuccess: res => {
      // console.log(res.data?.result, 'res.data?.result');
      dispatch(setcontractDocuments(res.data?.result));
      return res.data;
    },
    onError: err => {},
  });
};

const usegetmaintenance_requestsApi = data => {
  const dispatch = useDispatch();
  return useMutation(getmaintenance_requests, {
    onSuccess: res => {
      dispatch(setHomeData(res.data?.result));
      return res.data;
    },
    onError: err => {},
  });
};

//getAllTime_slots
const useFilterRoomsPriceTypesApi = () => {
  const dispatch = useDispatch();

  return useQuery(['getFilterRoomsPriceTypes'], getFilterRoomsPriceTypes, {
    onSuccess: res => {
      dispatch(setallFilters(res.data?.result));

      return res.data;
    },
    onError: err => {},
  });
};
//
// const  usePopularSearcheApi = refreshing => {
//   const dispatch = useDispatch();

//   return useQuery(['popularsearch', refreshing], getPopularSearch, {
//     onSuccess: res => {

//       return res.data;
//     },
//     onError: err => {},
//   });
// };
//getPopularSearch
const useHomeTypesApi = refreshing => {
  const dispatch = useDispatch();

  return useQuery(['hometypes', refreshing], getHomeTypes, {
    onSuccess: res => {
      // let reversed = [...res.data?.result];
      dispatch(setHomeTypes(res.data?.result?.Types));
      // console.log('tesss');
      return res.data;
    },
    onError: err => {},
  });
};
const useHomeProjectsApi = refreshing => {
  const dispatch = useDispatch();

  return useQuery(['homeprojects', refreshing], getHomeProjects, {
    onSuccess: res => {
      // let reversed = [...res.data?.result];

      //

      dispatch(setHomeprojects(res.data?.result?.states));

      return res.data;
    },
    onError: err => {
      //
    },
  });
};
// const  = refreshing => {
//   const dispatch = useDispatch();

//   return useQuery(['getProperties_pagers'], , {
//     onSuccess: res => {
//       // dispatch(setHomeprojects(res.data?.result?.projects));
//       return res.data;
//     },
//     onError: err => {},
//   });
// };
//
const useHomeProperties_pagersApi = data => {
  const dispatch = useDispatch();
  const {data: HomeData} = useSelector(state => state.Home);
  return useMutation(getProperties_pagers, {
    onSuccess: res => {
      dispatch(setHomeData([...HomeData, ...res.data?.result]));
      // return res.data;
      //
    },
    onError: err => {},
  });
};

const useMyPropertyApi = data => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return useMutation(getMyPropertiesData, {
    onSuccess: res => {
      // const result = {
      //   status: res.status + '-' + res.statusText,
      //   headers: res.headers,
      //   data: res.data,
      // };
      //
      // console.log(res.data?.result, 'res.data?.result');
      let reversed = [...res.data?.result];
      dispatch(setmyproperties(reversed));
      return res.data;
    },
    onError: err => {
      //
      //   dispatch(errorAtLogin(err.response.data.detail));
      //  return err;
    },
  });
};
const usePaymentApi = data => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return useMutation(GetPayment, {
    onSuccess: res => {
      dispatch(setpaymentLink(res.data?.result?.payment_link));
      return res.data;
    },
    onError: err => {},
  });
};
const useHelpCenterApi = data => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return useMutation(getHelpCenter, {
    onSuccess: res => {
      // const result = {
      //   status: res.status + '-' + res.statusText,
      //   headers: res.headers,
      //   data: res.data,
      // };
      //
      dispatch(setHelpCenter(res.data?.result));
      return res.data;
    },
    onError: err => {
      //
      //   dispatch(errorAtLogin(err.response.data.detail));
      //  return err;
    },
  });
};
const useCreateVistApi = data => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const QueryClient = useQueryClient();

  return useMutation(CreateVist, {
    onSuccess: res => {
      //

      if (res.data?.result) {
        // let reversed = [...res.data?.result];
        //

        // navigation.navigate('SubmitInquiry');
        dispatch(setCreateVisit(res.data?.result));
        // QueryClient.invalidateQueries('allMaintainence');
      }
      return res.data;
    },
    onError: err => {
      //
    },
  });
};
const useSaveFCMApi = data => {
  return useMutation(SaveFCM, {
    onSuccess: res => {
      if (res.data?.result) {
        // console.log(res.data?.result);
      }
      return res.data;
    },
    onError: err => {
      //
    },
  });
};
const useSaveFCMWhenlogoutApi = data => {
  return useMutation(SaveFCMWhenLogout, {
    onSuccess: res => {
      if (res.data?.result) {
        // console.log(res.data?.result);
      }
      return res.data;
    },
    onError: err => {
      //
    },
  });
};
const useMaintianenceApi = data => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return useMutation(getMaintianenceData, {
    onSuccess: res => {
      // const result = {
      //   status: res.status + '-' + res.statusText,
      //   headers: res.headers,
      //   data: res.data,
      // };
      //
      dispatch(setMaintainence(res.data?.result));
      return res.data;
    },
    onError: err => {
      //
      //   dispatch(errorAtLogin(err.response.data.detail));
      //  return err;
    },
  });
};
const useOneMaintianenceApi = data => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return useMutation(getMaintianenceOneData, {
    onSuccess: res => {
      // console.log(res.data?.result[0].comments, 'comments');
      // dispatch(setMaintainence(res.data?.result));
      dispatch(setComments(res.data?.result[0].comments));

      return res.data;
    },
    onError: err => {},
  });
};
//
const useChangePersonalInfo = data => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return useMutation(ChangePersonalInfo, {
    onSuccess: async res => {
      dispatch(setPersonalInfo(res.data?.result));
      //
      dispatch(setuserInfo(res.data?.result));
      const jsonValue = JSON.stringify(res.data?.result);

      await AsyncStorage.setItem('User', jsonValue);
      // RNRestart.Restart();
      navigation.navigate('Settings');
      // Toast.show('User Chnaged Succefully.', Toast.LONG, {
      //   backgroundColor: 'orange',
      // });
      return res.data;
    },
    onError: err => {
      //
      // console.log(err.response);
    },
  });
};
const useChangeassword = data => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return useMutation(ChangePassword, {
    onSuccess: res => {
      // dispatch(setPassword(res.data?.result));
      // navigation.navigate('SettingScreen');
      dispatch(setPass(res?.data?.result));
      //
      return res.data;
    },
    onError: err => {
      //
    },
  });
};
const usePaymentsForTenantApi = data => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return useMutation(getPaymentsForTenantData, {
    onSuccess: res => {
      dispatch(setPayments(res.data?.result));
      // console.log(res.data?.result, 'res.data?.result');

      return res.data;
    },
    onError: err => {
      // console.log(err.response);
      //
      //   dispatch(errorAtLogin(err.response.data.detail));
      //  return err;
    },
  });
};

const useFavApi = data => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return useMutation(GetMyFav, {
    onSuccess: res => {
      // const result = {
      //   status: res.status + '-' + res.statusText,
      //   headers: res.headers,
      //   data: res.data,
      // };
      //
      dispatch(setFav(res.data?.result));
      return res.data;
    },
    onError: err => {
      //
      //   dispatch(errorAtLogin(err.response.data.detail));
      //  return err;
    },
  });
};
const useReviewsApi = data => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return useMutation(GetReviews, {
    onSuccess: res => {
      dispatch(setReviews(res.data?.result?.review_ids));
      return res.data;
    },
    onError: err => {},
  });
};
const UseGetNotificationsApi = data => {
  const dispatch = useDispatch();

  return useMutation(GetNotifications, {
    onSuccess: res => {
      // console.log(res.data?.result?.records, 'noty');
      dispatch(setNotifications(res.data?.result?.records));
      return res.data;
    },
    onError: err => {
      // console.log(err.response, 'err noty');
    },
  });
};
const UseGetmaintenanceNotificationsApi = data => {
  const dispatch = useDispatch();

  return useMutation(GetmaintenanceNotifications, {
    onSuccess: res => {
      return res.data;
    },
    onError: err => {
      // console.log(err.response, 'err noty');
    },
  });
};
const UseGetContractNotificationsApi = data => {
  const dispatch = useDispatch();

  return useMutation(GetContractNotifications, {
    onSuccess: res => {
      return res.data;
    },
    onError: err => {
      // console.log(err.response, 'err noty');
    },
  });
};

const useMainttenanceUserData = data => {
  const dispatch = useDispatch();

  return useMutation(GetMainttenanceUserData, {
    onSuccess: res => {
      dispatch(setMaintainenceUserDate(res?.data?.result?.records));
      return res.data;
    },
    onError: err => {
      // console.log(err.response, 'err noty');
    },
  });
};

const useCreateUserHook = () => {
  const dispatch = useDispatch();
  return useMutation(postCreateUserrequest, {
    onSuccess: res => {
      const result = {
        status: res.status + '-' + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      //
    },
    onError: err => {
      //
      //   dispatch(errorAtLogin(err.response.data.detail));
      //  return err;
    },
  });
};
/****************************************************************** */
const UpcommingVisitApi = data => {
  const dispatch = useDispatch();
  return useMutation(GetUpcommingVisit, {
    onSuccess: res => {
      dispatch(setupcomingVisits(res.data?.result));
      return res.data;
    },
    onError: err => {},
  });
};
const RecommendPropertiesApi = data => {
  const dispatch = useDispatch();
  return useMutation(GetrecommendProperties, {
    onSuccess: res => {
      dispatch(setrecommend_properties(res.data?.result));
      return res.data;
    },
    onError: err => {},
  });
};
const BestsellingPropertiesApi = data => {
  const dispatch = useDispatch();
  return useMutation(GetbestsellingProperties, {
    onSuccess: res => {
      dispatch(setbestselling_properties(res.data?.result?.projects));
      return res.data;
    },
    onError: err => {},
  });
};
const popular_propertiesApi = () => {
  const dispatch = useDispatch();
  return useMutation(GetpopularProperties, {
    onSuccess: res => {
      dispatch(setpopular_properties(res.data?.result));
      // return res.data;
    },
    onError: err => {},
  });
};
const propertybytypeApi = data => {
  const dispatch = useDispatch();
  const {data: HomeData} = useSelector(state => state.Home);

  return useMutation(Getpropertybytype, {
    onSuccess: res => {
      dispatch(setHomeData([...HomeData, ...res.data?.result]));
      // return res.data;
    },
    onError: err => {},
  });
};
const propertybyprojectApi = data => {
  const dispatch = useDispatch();

  return useMutation(Gepropertybyproject, {
    onSuccess: res => {
      dispatch(setHomeData(res.data?.result));
      // return res.data;
      //
    },
    onError: err => {},
  });
};
//
const usesearchApi = data => {
  const dispatch = useDispatch();

  return useMutation(getSearch, {
    onSuccess: res => {
      // console.log(res.data);
      dispatch(setSearch(res.data?.result));
      console.log(res.data?.result?.length, 'res.data?.result');
    },
    onError: err => {},
  });
};
//

export {
  useHomeApi,
  useMyPropertyApi,
  useCreateVistApi,
  useMaintianenceApi,
  usePaymentsForTenantApi,
  useCreateUserHook,
  useFavApi,
  useHelpCenterApi,
  useChangePersonalInfo,
  useChangeassword,
  usePaymentApi,
  useHomeTypesApi,
  useHomeProjectsApi,
  useReviewsApi,
  useHomeProperties_pagersApi,
  UpcommingVisitApi,
  RecommendPropertiesApi,
  BestsellingPropertiesApi,
  popular_propertiesApi,
  propertybytypeApi,
  usesearchApi,
  propertybyprojectApi,
  useFilterRoomsPriceTypesApi,
  useAllFilterApi,
  useOneMaintianenceApi,
  useSaveFCMApi,
  useSaveFCMWhenlogoutApi,
  UseGetNotificationsApi,
  useMainttenanceUserData,
  useGetContractDocument,
  useGetContractPayment,
  UseGetmaintenanceNotificationsApi,
  UseGetContractNotificationsApi,
};

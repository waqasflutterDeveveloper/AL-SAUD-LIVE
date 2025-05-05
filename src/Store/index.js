import {configureStore} from '@reduxjs/toolkit';
import UserSlice from './Message/MessageSlice';
import HomeDataSlice from './HomeData/HomeSlice';

import GlobalFilters from './Filters';

import MyPropertySlice from './MyProperty/MyPropertySlice';
import CreateVistSlice from './CreateVisit/CreateVistSlice';
import MaintainenceSlice from './Maintainence/MaintainenceSlice';
import PaymentsSlice from './Payments/PaymentsSlice';
import HelpCenterSlice from './HelpCenterSlice/HelpCenterSlice';
import PersonalInfoSlice from './PersonalInfoSlice/PersonalInfoSlice';
import HometypesSlices from './Hometypes/HometypesSlices';
import HomeProjectsSlices from './HomeProjects/HomeProjectsSlices';
import MyUploadsSlice from './upload/myUploadsSlice';
import ToastMessage from './Toast';
export const store = configureStore({
  // ...
  reducer: {
    userinfo: UserSlice,
    Home: HomeDataSlice,
    GlobalFilters: GlobalFilters,
    MyProperties: MyPropertySlice,
    CreateVist: CreateVistSlice,
    Maintainence: MaintainenceSlice,
    Payments: PaymentsSlice,
    HelpCenter: HelpCenterSlice,
    PersonalInfo: PersonalInfoSlice,
    HomeTypes: HometypesSlices,
    HomeProjects: HomeProjectsSlices,
    uploads: MyUploadsSlice,
    ToastMessage: ToastMessage,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: {warnAfter: 128},
      serializableCheck: {warnAfter: 128},
    }),
});

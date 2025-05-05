import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const HomeDataSlice = createSlice({
  name: 'HomeData',
  initialState: {
    data: [],
    DontMakeAnotherCall: false,
    Detailed: null,
    fav: [],
    favIds: [],
    reviews: [],
    upcomingVisits: [],
    recommend_properties: [],
    bestselling_properties: [],
    popular_properties: [],
    property_by_type: [],
    property_by_project: [],
    search: [],
    comments: [],
    Notifications: [],
    isDark: false,
    bottomNavIndex: 0,
    contractDocuments: null,
  },
  reducers: {
    setHomeData(state, action) {
      state.data = action.payload;
    },
    setDontMakeAnotherCall(state, action) {
      state.DontMakeAnotherCall = action.payload;
    },
    setHomeDetailedData(state, action) {
      state.Detailed = action.payload;
    },
    setFav(state, action) {
      state.fav = action.payload;
    },
    setFavIds(state, action) {
      state.favIds = action.payload;
    },

    setReviews(state, action) {
      state.reviews = action.payload;
    },
    setNotifications(state, action) {
      state.Notifications = action.payload;
    },
    setupcomingVisits(state, action) {
      state.upcomingVisits = action.payload;
    },
    setrecommend_properties(state, action) {
      state.recommend_properties = action.payload;
    },
    setbestselling_properties(state, action) {
      state.bestselling_properties = action.payload;
    },
    setpopular_properties(state, action) {
      state.popular_properties = action.payload;
    },
    setproperty_by_type(state, action) {
      state.property_by_type = action.payload;
    },
    setproperty_by_project(state, action) {
      state.property_by_type = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setComments(state, action) {
      state.comments = action.payload;
    },
    setDarkState(state, action) {
      state.isDark = action.payload;
    },
    setbottomNavIndex(state, action) {
      state.bottomNavIndex = action.payload;
    },
    setcontractDocuments(state, action) {
      state.contractDocuments = action.payload;
    },
    //
  },
});

export const {
  setHomeData,
  setHomeDetailedData,
  setDontMakeAnotherCall,
  setFav,
  setReviews,
  setupcomingVisits,
  setrecommend_properties,
  setbestselling_properties,
  setpopular_properties,
  setproperty_by_type,
  setSearch,
  setproperty_by_project,
  setComments,
  setNotifications,
  setDarkState,
  setFavIds,
  setbottomNavIndex,
  setcontractDocuments,
} = HomeDataSlice.actions;
export default HomeDataSlice.reducer;

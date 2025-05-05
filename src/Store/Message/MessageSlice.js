import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: null,
    isAuth:false,
    login: true,
    register: false,
    logout: false,
  },
  reducers: {
    setuserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setisAuth(state, action) {
      state.isAuth = action.payload;
    },
    setLoginOrRegister(state, action) {
      state = {...state, ...action.payload};
    },
    setLogout(state, action) {
      state.logout = action.payload;
    },
  },
});

export const {setuserInfo, setLogout,setisAuth} = UserSlice.actions;
export default UserSlice.reducer;

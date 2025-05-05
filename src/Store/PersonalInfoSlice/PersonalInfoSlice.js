import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const PersonalInfoSlice = createSlice({
  name: 'PersonalInfo',
  initialState: {
    PersonalInfo: null,
    passwordChange: null,
  },
  reducers: {
    setPersonalInfo(state, action) {
      state.PersonalInfo = action.payload;
    },
    setPass(state, action) {
      state.passwordChange = action.payload;
    },

    // setHomeDetailedData(state, action) {
    //   state.Detailed = action.payload;
    // },
  },
});

export const {setPersonalInfo, setPass} = PersonalInfoSlice.actions;
export default PersonalInfoSlice.reducer;

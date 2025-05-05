import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const MaintainenceSlice = createSlice({
  name: 'Maintainence',
  initialState: {
    Maintainence: [],
    MaintainenceUserData: [],
  },
  reducers: {
    setMaintainence(state, action) {
      state.Maintainence = action.payload;
    },
    setMaintainenceUserDate(state, action) {
      // console.log(action.payload, 'GetMainttenanceUserData');

      state.MaintainenceUserData = action.payload;
    },
    // setHomeDetailedData(state, action) {
    //   state.Detailed = action.payload;
    // },
  },
});

export const {setMaintainence, setMaintainenceUserDate} =
  MaintainenceSlice.actions;
export default MaintainenceSlice.reducer;

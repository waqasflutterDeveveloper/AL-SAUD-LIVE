import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const HelpCenterSlice = createSlice({
  name: 'HelpCenter',
  initialState: {
    HelpCenter: null,
  },
  reducers: {
    setHelpCenter(state, action) {
      state.HelpCenter = action.payload;
    },

    // setHomeDetailedData(state, action) {
    //   state.Detailed = action.payload;
    // },
  },
});

export const {setHelpCenter} = HelpCenterSlice.actions;
export default HelpCenterSlice.reducer;

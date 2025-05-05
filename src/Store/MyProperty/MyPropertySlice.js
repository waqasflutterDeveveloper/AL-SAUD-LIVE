import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const MyPropertySlice = createSlice({
  name: 'myproperties',
  initialState: {
    myproperties: [],
    selectedProp: null,
  },
  reducers: {
    setmyproperties(state, action) {
      state.myproperties = action.payload;
    },
    setselectedProp(state, action) {
      state.selectedProp = action.payload;
    },
    // setHomeDetailedData(state, action) {
    //   state.Detailed = action.payload;
    // },
  },
});

export const {setmyproperties, setselectedProp} = MyPropertySlice.actions;
export default MyPropertySlice.reducer;

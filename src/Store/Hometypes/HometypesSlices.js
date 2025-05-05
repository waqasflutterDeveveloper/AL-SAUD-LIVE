import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const HomeTypesSlice = createSlice({
  name: 'HomeTypes',
  initialState: {
    types: [],
  allFilters:null
  },
  reducers: {
    setHomeTypes(state, action) {
      state.types = action.payload;
    },
    setallFilters(state, action) {
      state.allFilters = action.payload;
    },
  },
});

export const {
  setHomeTypes,
  setallFilters
} = HomeTypesSlice.actions;
export default HomeTypesSlice.reducer;

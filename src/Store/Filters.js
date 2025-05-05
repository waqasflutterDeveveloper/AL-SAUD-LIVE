import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const GlobalFilters = createSlice({
  name: 'GlobalFilters',
  initialState: {
    filteres: {
      room_no: null,
      price_to: null,
      price_from: null,
      type_id: null,
      order_by: 'id desc',
    },
  },
  reducers: {
    setGlobalFilters(state, action) {
      state.filteres = action.payload;
    },

    //
  },
});

export const {setGlobalFilters} = GlobalFilters.actions;
export default GlobalFilters.reducer;

import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const ToastMessage = createSlice({
  name: 'toastMessage',
  initialState: {
    show: false,
  },
  reducers: {
    setShowToast(state, action) {
      state.show = action?.payload;
    },

    //
  },
});

export const {setShowToast} = ToastMessage.actions;
export default ToastMessage.reducer;

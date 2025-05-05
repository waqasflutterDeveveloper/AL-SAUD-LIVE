import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const MyUploadsSlice = createSlice({
  name: 'uploads',
  initialState: {
    urls: '',
    loadingImageUpload: false,
  },
  reducers: {
    setMyUploads(state, action) {
      // console.log(action.payload, 'actionnnnnn');
      state.urls = state.urls
        ? `${state.urls},${action.payload}`
        : action.payload;
    },
    setMyUploadsAll(state, action) {
      state.urls = action.payload;
    },
    resetUpload(state, action) {
      // console.log(action.payload, 'actionnnnnn');
      state.urls = '';
    },
    setloadingImageUpload(state, action) {
      state.loadingImageUpload = action?.payload;
    },

    // setHomeDetailedData(state, action) {
    //   state.Detailed = action.payload;
    // },
  },
});

export const {
  setMyUploads,
  resetUpload,
  setloadingImageUpload,
  setMyUploadsAll,
} = MyUploadsSlice.actions;
export default MyUploadsSlice.reducer;

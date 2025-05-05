import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const HomeProjectsSlice = createSlice({
  name: 'Homeprojects',
  initialState: {
    projects: [],
  },
  reducers: {
    setHomeprojects(state, action) {
      state.projects = action.payload;
    },
  },
});

export const {setHomeprojects} = HomeProjectsSlice.actions;
export default HomeProjectsSlice.reducer;

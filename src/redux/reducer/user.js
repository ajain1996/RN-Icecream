import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: {},
    login: false,
    isFreeAccess: true,
  },
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      return {...state, userData: user, login: true};
    },
    removeUser(state, action) {
      return {...state, userData: {}, login: false};
    },
    setFreeAccess(state, action) {
      return {...state, isFreeAccess: action.payload};
    },
  },
});

export const {setUser, removeUser, setFreeAccess} = userSlice.actions;

export default userSlice.reducer;

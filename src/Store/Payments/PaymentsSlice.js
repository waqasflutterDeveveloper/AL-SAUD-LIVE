import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const PaymentsSlice = createSlice({
  name: 'Payments',
  initialState: {
    Payments: [],
    payment_link: null,
  },
  reducers: {
    setPayments(state, action) {
      state.Payments = action.payload;
    },
    setpaymentLink(state, action) {
      state.payment_link = action.payload;
    },
    // setHomeDetailedData(state, action) {
    //   state.Detailed = action.payload;
    // },
  },
});

export const {setPayments, setpaymentLink} = PaymentsSlice.actions;
export default PaymentsSlice.reducer;

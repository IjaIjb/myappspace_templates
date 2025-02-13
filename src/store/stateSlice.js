import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
    name: 'global/state',
    initialState: {
      // drawerOpen: false,
      cartData: null, // Set to `null` to handle undefined checks in the component.
      // modalType: '',
      selectedCurrency: "",
    },
  
    reducers: {
      setCartData: (state, action) => {
        state.cartData = action.payload;
      },
      setCurrency: (state, action) => {
        state.selectedCurrency = action.payload;
      },
    },
  });

  export const {
    setCartData,
    setCurrency

} = stateSlice.actions;

export default stateSlice.reducer;

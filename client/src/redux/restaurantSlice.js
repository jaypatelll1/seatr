import { createSlice } from '@reduxjs/toolkit';

const  restaurantSlice = createSlice({
    name: 'restaurant',
   // Initial state
initialState : {
    restaurants: []
  },
    reducers: {
      setRestaurant: (state, action) => {
        state.restaurants = action.payload;
       
      },
      clearRestaurant: (state) => {
        state.restaurants = [];
        
      },
    },
  });
  
  export const { setRestaurant, clearRestaurant } = restaurantSlice.actions;
  export default restaurantSlice.reducer;
  
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  moviesItem: [],
};
const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovies(state, action) {
        console.log(action ,"action inside slice")
        const tempProduct = {...action.payload};
        state.moviesItem.push(tempProduct);
    },
  },
});

export const {addMovies} = movieSlice.actions;

export default movieSlice.reducer;

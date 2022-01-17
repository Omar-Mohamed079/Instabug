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
        const tempMovies = {...action.payload};
        state.moviesItem.push(tempMovies);
    },
  },
});

export const {addMovies} = movieSlice.actions;

export default movieSlice.reducer;

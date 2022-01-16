import axios from 'axios';

export const getMovies = async page => {
    console.log("page",page)
  try {
    const response = await axios.get(
      `http://api.themoviedb.org/3/discover/movie?api_key=acea91d2bff1c53e6604e4985b6989e2&page=${page}`,
    );
    return response?.data.results
  } catch (error) {
    console.log('error', error);
  }
};

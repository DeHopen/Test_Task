import axios from 'axios';
import {Genre, Movie} from "../../components/types";

const API_KEY = 'fb39434e5971ea6095ba0e38a3629e4d';
const API_URL = 'https://api.themoviedb.org/3';


interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (page: number, searchQuery: string = '', genreId: number = 0): Promise<FetchMoviesResponse> => {
  const params: any = {
    api_key: API_KEY,
    page,
  };

  if (searchQuery) {
    params.query = searchQuery;
  }

  if (genreId !== 0) {
    params.with_genres = genreId;
  }

  const response = await axios.get(`${API_URL}/${searchQuery ? 'search' : 'discover'}/movie`, {
    params,
  });

  return response.data;
};

export const fetchGenres = async (): Promise<Genre[]> => {
  const response = await axios.get(`${API_URL}/genre/movie/list`, {
    params: {
      api_key: API_KEY
    }
  });
  return response.data.genres;
};
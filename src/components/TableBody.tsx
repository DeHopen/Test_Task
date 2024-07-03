import React from 'react';
import { Movie, Genre } from './types';

type Props = {
  movies: Movie[];
  genres: Genre[];
};

const TableBody: React.FC<Props> = ({ movies, genres }) => {
  const getGenreNames = (genreIds: number[]) => {
    return genreIds.map(id => genres.find(genre => genre.id === id)?.name).join(', ');
  };

  return (
      <tbody className="text-gray-600 text-sm font-light">
      {movies.map(movie => (
          <tr key={movie.id} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6">{movie.title}</td>
            <td className="py-3 px-6">{movie.release_date}</td>
            <td className="py-3 px-6">{getGenreNames(movie.genre_ids)}</td>
            <td className="py-3 px-6">{movie.vote_average}</td>
          </tr>
      ))}
      </tbody>
  );
};

export default TableBody;

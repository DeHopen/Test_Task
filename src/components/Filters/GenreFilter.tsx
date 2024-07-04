import React from 'react';
import { Genre } from '../types';

type Props = {
  genres: Genre[];
  selectedGenre: number;
  setSelectedGenre: (id: number) => void;
};

const GenreFilter: React.FC<Props> = ({ genres, selectedGenre, setSelectedGenre }) => {
  return (
      <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(Number(e.target.value))}
          className="border p-2 rounded w-full h-full"
      >
        <option value={0}>All Genres</option>
        {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
        ))}
      </select>
  );
};

export default GenreFilter;

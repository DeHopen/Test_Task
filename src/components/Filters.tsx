import React from 'react';
import { Genre } from './types';

type Props = {
  genres: Genre[];
  searchText: string;
  setSearchText: (text: string) => void;
  selectedGenre: number;
  setSelectedGenre: (id: number) => void;
};

const Filters: React.FC<Props> = ({ genres, searchText, setSearchText, selectedGenre, setSelectedGenre }) => {
  return (
      <div className="flex justify-between mb-4">
        <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by title"
            className="border p-2 rounded w-1/2 mr-2"
        />
        <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(Number(e.target.value))}
            className="border p-2 rounded w-1/2"
        >
          <option value={0}>All Genres</option>
          {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
          ))}
        </select>
      </div>
  );
};

export default Filters;

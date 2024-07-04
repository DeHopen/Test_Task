import React from 'react';
import { Genre } from './types';

type Props = {
  genres: Genre[];
  searchText: string;
  setSearchText: (text: string) => void;
  selectedGenre: number;
  setSelectedGenre: (id: number) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
};

const Filters: React.FC<Props> = ({
                                    genres, searchText, setSearchText, selectedGenre, setSelectedGenre,
                                    startDate, setStartDate, endDate, setEndDate
                                  }) => {
  return (
      <div className="flex flex-wrap justify-between mb-4">
        <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by title"
            className="border p-2 rounded w-1/3 mb-2"
        />
        <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(Number(e.target.value))}
            className="border p-2 rounded w-1/3 mb-2"
        >
          <option value={0}>All Genres</option>
          {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
          ))}
        </select>
        <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded w-1/6 mb-2"
        />
        <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded w-1/6 mb-2"
        />
      </div>
  );
};

export default Filters;

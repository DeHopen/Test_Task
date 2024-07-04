import React from 'react';
import { Genre } from './types';
import SearchFilter from './Filters/SearchFilter';
import GenreFilter from './Filters/GenreFilter';
import DateRangeFilter from './Filters/DateRangeFilter';

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
  resetFilters: () => void;
};

const Filters: React.FC<Props> = ({
                                    genres, searchText, setSearchText, selectedGenre, setSelectedGenre,
                                    startDate, setStartDate, endDate, setEndDate, resetFilters
                                  }) => {
  return (
      <div className="flex flex-wrap justify-between mb-4">
        <div className="w-full md:w-1/3 mb-2">
          <SearchFilter searchText={searchText} setSearchText={setSearchText} />
        </div>
        <div className="w-full md:w-1/3 mb-2">
          <GenreFilter genres={genres} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
        </div>
        <div className="w-full md:w-1/3 mb-2">
          <DateRangeFilter startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        </div>
        <button
            onClick={resetFilters}
            className="w-full md:w-auto bg-red-500 text-white font-bold py-2 px-4 rounded"
        >
          Сбросить
        </button>
      </div>
  );
};

export default Filters;

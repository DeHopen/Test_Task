import React from 'react';
import { Movie } from './types';

type Props = {
  sortField: keyof Movie;
  setSortField: (field: keyof Movie) => void;
};

const TableHeader: React.FC<Props> = ({ sortField, setSortField }) => {
  const handleSort = (field: keyof Movie) => {
    setSortField(field);
  };

  return (
      <thead>
      <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 cursor-pointer" onClick={() => handleSort('title')}>Title</th>
        <th className="py-3 px-6 cursor-pointer" onClick={() => handleSort('release_date')}>Release Date</th>
        <th className="py-3 px-6 cursor-pointer" onClick={() => handleSort('genre_ids')}>Genre</th>
        <th className="py-3 px-6 cursor-pointer" onClick={() => handleSort('vote_average')}>Rating</th>
      </tr>
      </thead>
  );
};

export default TableHeader;

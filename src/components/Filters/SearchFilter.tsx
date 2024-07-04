import React from 'react';

type Props = {
  searchText: string;
  setSearchText: (text: string) => void;
};

const SearchFilter: React.FC<Props> = ({ searchText, setSearchText }) => {
  return (
      <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by title"
          className="border p-2 rounded w-full h-full"
      />
  );
};

export default SearchFilter;

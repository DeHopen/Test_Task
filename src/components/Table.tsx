import React, {useCallback, useEffect, useRef, useState} from 'react';
import {fetchGenres, fetchMovies} from '../utils/api/api';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Filters from './Filters';
import {Genre, Movie} from './types';


const Table: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortField, setSortField] = useState<keyof Movie>('title');
  const [searchText, setSearchText] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const loadInitialData = useCallback(async () => {
    const genresData = await fetchGenres();
    setGenres(genresData);
    await fetchMoviesByFilters(1, searchText, selectedGenre);
  }, [searchText, selectedGenre]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    const checkIfShouldLoadMore = () => {
      if (containerRef.current && containerRef.current.scrollHeight <= window.innerHeight) {
        fetchMoreMovies();
      }
    };
    checkIfShouldLoadMore();
  }, [movies]);

  const fetchMoviesByFilters = async (page: number, searchQuery: string, genreId: number) => {
    const data = await fetchMovies(page, searchQuery, genreId);
    setMovies(prevMovies => {
      const uniqueMovies = [...prevMovies, ...data.results].reduce((acc, movie) => {
        if (!acc.find(m => m.id === movie.id)) {
          acc.push(movie);
        }
        return acc;
      }, [] as Movie[]);
      return uniqueMovies;
    });
    setTotalPages(data.total_pages);
    setPage(page);
  };

  useEffect(() => {
    fetchMoviesByFilters(1, searchText, selectedGenre);
  }, [searchText, selectedGenre]);

  const fetchMoreMovies = () => {
    if (page < totalPages) {
      fetchMoviesByFilters(page + 1, searchText, selectedGenre);
      setIsFetching(false);
    }
  };

  const setIsFetching = useInfiniteScroll(fetchMoreMovies);

  const filteredMovies = movies.filter(movie => {
    const releaseDate = new Date(movie.release_date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    return (
        (selectedGenre === 0 || (movie.genre_ids && movie.genre_ids.includes(selectedGenre))) &&
        movie.title.toLowerCase().includes(searchText.toLowerCase()) &&
        (!start || releaseDate >= start) &&
        (!end || releaseDate <= end)
    );
  });

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return aValue - bValue;
    }

    return 0;
  });

  const resetFilters = () => {
    setSearchText('');
    setSelectedGenre(0);
    setStartDate('');
    setEndDate('');
    fetchMoviesByFilters(1, '', 0);
  };

  return (
      <div ref={containerRef}>
        <Filters
            genres={genres}
            searchText={searchText}
            setSearchText={setSearchText}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            resetFilters={resetFilters}
        />
        <table className="min-w-full bg-white shadow-md rounded">
          <TableHeader sortField={sortField} setSortField={setSortField} />
          <TableBody movies={sortedMovies} genres={genres} />
        </table>
      </div>
  );
};

export default Table;

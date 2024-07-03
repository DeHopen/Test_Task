import React, {useState, useEffect, useCallback, useRef} from 'react';
import {fetchGenres, fetchMovies} from '../utils/api/api';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Filters from './Filters';
import { Movie, Genre } from './types';

const Table: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortField, setSortField] = useState<keyof Movie>('title');
  const [searchText, setSearchText] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(0);
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
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreMovies);

  const filteredMovies = movies.filter(movie => {
    return (
        (selectedGenre === 0 || movie.genre_ids.includes(selectedGenre)) &&
        movie.title.toLowerCase().includes(searchText.toLowerCase())
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

  return (
      <div ref={containerRef}>
        <Filters
            genres={genres}
            searchText={searchText}
            setSearchText={setSearchText}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
        />
        <table className="min-w-full bg-white">
          <TableHeader sortField={sortField} setSortField={setSortField} />
          <TableBody movies={sortedMovies} genres={genres} />
        </table>
      </div>
  );
};

export default Table;
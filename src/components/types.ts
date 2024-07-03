export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
}

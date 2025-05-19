export interface Movie {
  id: number;
  title: string;
  genre: string;
  type: string;
  rating: number;
  year: number;
  duration: string;
  description: string;
  image: string;
  isFavorite: boolean;
  cast?: string[];
  director?: string;
  hasPayment?: boolean;
  price?: number;
}
export interface Category {
  name: string;
  type: string;
  count: number;
}

export interface UserMovieStatus {
  movieId: number;
  userId: number;
  hasPaid: boolean;
  hasWatched: boolean;
  userRating?: number;
  watchProgress?: number;
  watchedAt?: Date;
}

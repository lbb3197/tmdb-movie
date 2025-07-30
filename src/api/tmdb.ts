import api from "./index";
import type {
  GenreListResponse,
  MovieDetailsResponse,
  MovieListResponse,
} from "../types/movie";

// 获取电影类型列表
export const getGenreList = async (): Promise<GenreListResponse> => {
  const { data } = await api.get("/genre/movie/list");
  return data;
};

// 获取热门电影
export const getPopularMovies = async (
  page = 1
): Promise<MovieListResponse> => {
  const { data } = await api.get("/movie/popular", {
    params: { page },
  });
  return data;
};

//获取TOP
export const getTopMovies = async (page = 1): Promise<MovieListResponse> => {
  const { data } = await api.get("/movie/top_rated", {
    params: { page },
  });
  return data;
};

// 获取电影详情
export const getMovieDetails = async (
  movieId: string
): Promise<MovieDetailsResponse> => {
  const { data } = await api.get(`/movie/${movieId}`);
  return data;
};

// 搜索电影
export const searchMovies = async (
  query: string,
  page = 1
): Promise<MovieListResponse> => {
  const { data } = await api.get("/search/movie", {
    params: { query, page },
  });
  return data;
};

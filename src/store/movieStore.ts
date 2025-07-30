import { defineStore } from "pinia";
import { getMovieDetails, getPopularMovies, getTopMovies } from "../api/tmdb";
import type { MovieDetailsResponse, PopularMovie } from "../types/movie";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    movies: [] as PopularMovie[],
    isLoading: false,
    movieDetails: null as MovieDetailsResponse | null,
    // 分页状态
    currentPage: 1,
    totalPages: 1,
    currentView: 'popular' as 'popular' | 'top',
  }),
  actions: {
    async fetchPopular(page = 1) {
      this.isLoading = true;
      this.currentView = 'popular';
      try {
        const data = await getPopularMovies(page);
        this.movies = data.results;
        this.currentPage = page;
        this.totalPages = data.total_pages;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchTop(page = 1) {
      this.isLoading = true;
      this.currentView = 'top';
      try {
        const data = await getTopMovies(page);
        this.movies = data.results;
        this.currentPage = page;
        this.totalPages = data.total_pages;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchMovieDetails(movieId: string) {
      this.isLoading = true;
      try {
        const data = await getMovieDetails(movieId);
        this.movieDetails = data;
      } finally {
        this.isLoading = false;
      }
    },
    // 设置当前页码
    setCurrentPage(page: number) {
      this.currentPage = page;
    },
    // 获取当前视图的数据
    async fetchCurrentView(page?: number) {
      const targetPage = page || this.currentPage;
      if (this.currentView === 'popular') {
        await this.fetchPopular(targetPage);
      } else {
        await this.fetchTop(targetPage);
      }
    },
  },
});

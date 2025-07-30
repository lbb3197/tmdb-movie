<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  >
    <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script setup lang="ts">
import MovieCard from "./MovieCard.vue";
import type { Movie } from "../types/movie";

defineProps<{ movies: Movie[] }>();
</script>

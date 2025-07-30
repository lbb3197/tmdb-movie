<template>
  <router-link
    class="bg-white shadow rounded-xl overflow-hidden hover:shadow-2xl transition"
    :to="{ name: 'MovieDetail', params: { id: movie.id.toString() } }"
  >
    <img :src="imageUrl" :alt="movie.title" class="w-full h-72 object-cover" />
    <div class="p-4 space-y-2">
      <h2 class="text-lg font-semibold line-clamp-1">{{ movie.title }}</h2>
      <p class="text-sm text-gray-500">上映：{{ movie.release_date }}</p>
      <p class="text-sm text-gray-700 line-clamp-3">{{ movie.overview }}</p>
      <div class="flex items-center justify-between mt-2">
        <span class="text-yellow-500 font-semibold"
          >⭐ {{ movie.vote_average }}</span
        >
        <div class="space-x-1">
          <span
            v-for="id in movie.genre_ids"
            :key="id"
            class="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded"
          >
            {{ genreMap[id] || "未知" }}
          </span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Movie } from "../types/movie";

const props = defineProps<{ movie: Movie }>();

const genreMap: Record<number, string> = {
  28: "动作",
  12: "冒险",
  16: "动画",
  35: "喜剧",
  80: "犯罪",
  99: "纪录",
  18: "剧情",
  10751: "家庭",
  14: "奇幻",
  36: "历史",
  27: "恐怖",
  10402: "音乐",
  9648: "悬疑",
  10749: "爱情",
  878: "科幻",
  10770: "电视电影",
  53: "惊悚",
  10752: "战争",
  37: "西部",
};

const imageUrl = `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`;
</script>

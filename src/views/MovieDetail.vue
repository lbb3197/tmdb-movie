<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMovieDetails } from "../api/tmdb";
import type { MovieDetailsResponse } from "../types/movie";

const route = useRoute();
const router = useRouter();
const movieId = ref<string>(route.params.id as string);
const movie = ref<MovieDetailsResponse | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

// 计算属性
const backdropUrl = computed(() => {
  return movie.value?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.value.backdrop_path}`
    : null;
});

const posterUrl = computed(() => {
  return movie.value?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.value.poster_path}`
    : null;
});

const formatRuntime = computed(() => {
  if (!movie.value?.runtime) return "未知";
  const hours = Math.floor(movie.value.runtime / 60);
  const minutes = movie.value.runtime % 60;
  return `${hours}小时${minutes}分钟`;
});

const formatBudget = computed(() => {
  if (!movie.value?.budget) return "未公开";
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(movie.value.budget);
});

const formatRevenue = computed(() => {
  if (!movie.value?.revenue) return "未公开";
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(movie.value.revenue);
});

const formatReleaseDate = computed(() => {
  if (!movie.value?.release_date) return "未知";
  return new Date(movie.value.release_date).toLocaleDateString("zh-CN");
});

const ratingPercentage = computed(() => {
  if (!movie.value?.vote_average) return 0;
  return Math.round(movie.value.vote_average * 10);
});

onMounted(async () => {
  try {
    loading.value = true;
    const movieData = await getMovieDetails(movieId.value);
    movie.value = movieData;
  } catch (err) {
    error.value = "获取电影详情失败";
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const goBack = () => {
  router.back();
};

const openHomepage = () => {
  if (movie.value?.homepage) {
    window.open(movie.value.homepage, "_blank");
  }
};

const openIMDb = () => {
  if (movie.value?.imdb_id) {
    window.open(`https://www.imdb.com/title/${movie.value.imdb_id}`, "_blank");
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 加载状态 -->
    <div
      v-if="loading"
      class="flex flex-col items-center justify-center min-h-screen"
    >
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
      ></div>
      <p class="mt-4 text-gray-600">正在加载电影详情...</p>
    </div>

    <!-- 错误状态 -->
    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center min-h-screen"
    >
      <p class="text-red-500 mb-4">{{ error }}</p>
      <button
        @click="goBack"
        class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        返回
      </button>
    </div>

    <!-- 电影详情内容 -->
    <div v-else-if="movie" class="relative">
      <!-- 背景图片 -->
      <div
        class="absolute inset-0 h-96 bg-cover bg-center bg-no-repeat"
        :style="{
          backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none',
        }"
      >
        <div
          class="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"
        ></div>
      </div>

      <!-- 返回按钮 -->
      <button
        @click="goBack"
        class="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-black/80 text-white rounded-lg hover:bg-black/90 transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
          />
        </svg>
        <span class="text-sm">返回</span>
      </button>

      <!-- 主要内容区域 -->
      <div class="relative z-10 pt-64">
        <div class="bg-white rounded-t-3xl shadow-xl">
          <!-- 电影主要信息 -->
          <div class="container mx-auto px-6 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <!-- 海报 -->
              <div class="lg:col-span-1 flex justify-center lg:justify-start">
                <div class="relative -mt-32">
                  <img
                    v-if="posterUrl"
                    :src="posterUrl"
                    :alt="movie.title"
                    class="w-64 rounded-xl shadow-2xl"
                  />
                  <div
                    v-else
                    class="w-64 h-96 bg-gray-200 rounded-xl shadow-2xl flex items-center justify-center"
                  >
                    <span class="text-gray-500">暂无海报</span>
                  </div>
                </div>
              </div>

              <!-- 电影信息 -->
              <div class="lg:col-span-3 space-y-6">
                <!-- 标题和基本信息 -->
                <div>
                  <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                    {{ movie.title }}
                  </h1>
                  <p
                    v-if="movie.tagline"
                    class="text-xl text-gray-600 italic mb-2"
                  >
                    {{ movie.tagline }}
                  </p>
                  <p
                    v-if="movie.original_title !== movie.title"
                    class="text-gray-500"
                  >
                    原名：{{ movie.original_title }}
                  </p>
                </div>

                <!-- 评分和基本信息行 -->
                <div class="flex flex-wrap items-center gap-6">
                  <!-- 评分 -->
                  <div class="flex items-center gap-4">
                    <div class="relative w-16 h-16">
                      <svg
                        class="w-16 h-16 transform -rotate-90"
                        viewBox="0 0 36 36"
                      >
                        <path
                          class="text-gray-300"
                          stroke="currentColor"
                          stroke-width="3"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          :class="
                            ratingPercentage >= 70
                              ? 'text-green-500'
                              : ratingPercentage >= 40
                              ? 'text-yellow-500'
                              : 'text-red-500'
                          "
                          stroke="currentColor"
                          stroke-width="3"
                          stroke-linecap="round"
                          fill="none"
                          :stroke-dasharray="`${ratingPercentage}, 100`"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div
                        class="absolute inset-0 flex items-center justify-center"
                      >
                        <span class="text-sm font-bold text-gray-900"
                          >{{ ratingPercentage }}%</span
                        >
                      </div>
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">用户评分</p>
                      <p class="text-sm text-gray-500">
                        {{ movie.vote_count }} 人评价
                      </p>
                    </div>
                  </div>

                  <!-- 基本信息 -->
                  <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>{{ formatReleaseDate }}</span>
                    <span>•</span>
                    <span>{{ formatRuntime }}</span>
                    <span>•</span>
                    <span>{{ movie.status }}</span>
                  </div>
                </div>

                <!-- 类型标签 -->
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="genre in movie.genres"
                    :key="genre.id"
                    class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {{ genre.name }}
                  </span>
                </div>

                <!-- 剧情简介 -->
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-3">
                    剧情简介
                  </h3>
                  <p class="text-gray-700 leading-relaxed">
                    {{ movie.overview || "暂无剧情简介" }}
                  </p>
                </div>

                <!-- 操作按钮 -->
                <div class="flex gap-4">
                  <button
                    v-if="movie.homepage"
                    @click="openHomepage"
                    class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                  >
                    官方网站
                  </button>
                  <button
                    v-if="movie.imdb_id"
                    @click="openIMDb"
                    class="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                  >
                    IMDb
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 详细信息区域 -->
          <div class="bg-gray-50 py-12">
            <div class="container mx-auto px-6">
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- 制作信息 -->
                <div class="bg-white rounded-xl p-6 shadow-sm">
                  <h3
                    class="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2"
                  >
                    制作信息
                  </h3>
                  <div class="space-y-3">
                    <div class="flex justify-between">
                      <span class="text-gray-600">预算</span>
                      <span class="font-medium">{{ formatBudget }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">票房</span>
                      <span class="font-medium">{{ formatRevenue }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">人气度</span>
                      <span class="font-medium">{{
                        Math.round(movie.popularity)
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">语言</span>
                      <span class="font-medium text-right">
                        {{
                          movie.spoken_languages
                            .map((lang) => lang.name)
                            .join(", ")
                        }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- 制作公司 -->
                <div
                  v-if="movie.production_companies.length"
                  class="bg-white rounded-xl p-6 shadow-sm"
                >
                  <h3
                    class="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2"
                  >
                    制作公司
                  </h3>
                  <div class="space-y-4">
                    <div
                      v-for="company in movie.production_companies.slice(0, 3)"
                      :key="company.id"
                      class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <img
                        v-if="company.logo_path"
                        :src="`https://image.tmdb.org/t/p/w200${company.logo_path}`"
                        :alt="company.name"
                        class="w-12 h-12 object-contain bg-white rounded p-1"
                      />
                      <div class="flex-1 min-w-0">
                        <p class="font-medium text-gray-900 truncate">
                          {{ company.name }}
                        </p>
                        <p class="text-sm text-gray-500">
                          {{ company.origin_country }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 系列信息 -->
                <div
                  v-if="movie.belongs_to_collection"
                  class="bg-white rounded-xl p-6 shadow-sm"
                >
                  <h3
                    class="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2"
                  >
                    所属系列
                  </h3>
                  <div
                    class="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <img
                      v-if="movie.belongs_to_collection.poster_path"
                      :src="`https://image.tmdb.org/t/p/w200${movie.belongs_to_collection.poster_path}`"
                      :alt="movie.belongs_to_collection.name"
                      class="w-16 h-24 object-cover rounded"
                    />
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-900 mb-1">
                        {{ movie.belongs_to_collection.name }}
                      </h4>
                      <p class="text-sm text-gray-500">
                        系列 ID: {{ movie.belongs_to_collection.id }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

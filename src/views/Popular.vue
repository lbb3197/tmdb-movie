<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">🔥 热门电影</h1>
    <MovieGrid v-if="!movieStore.isLoading" :movies="movieStore.movies" />
    <div v-else class="flex justify-center items-center py-8">
      <div class="text-lg text-gray-600">加载中...</div>
    </div>
    <Pagination
      :page="movieStore.currentPage"
      :total="movieStore.totalPages"
      @change="changePage"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import MovieGrid from "../components/MovieGrid.vue";
import Pagination from "../components/Pagination.vue";
import { useMovieStore } from "../store/movieStore";

const route = useRoute();
const router = useRouter();
const movieStore = useMovieStore();

// 从URL参数获取页码
const getPageFromRoute = (): number => {
  const page = parseInt(route.query.page as string) || 1;
  return Math.max(1, page);
};

// 更新URL参数
const updateRouteQuery = (page: number) => {
  if (page !== 1) {
    router.replace({ query: { ...route.query, page: page.toString() } });
  } else {
    // 第一页时移除page参数
    const query = { ...route.query };
    delete query.page;
    router.replace({ query });
  }
};

// 切换页码
const changePage = async (newPage: number) => {
  await movieStore.fetchPopular(newPage);
  updateRouteQuery(newPage);
};

// 监听路由变化
watch(
  () => route.query.page,
  () => {
    const page = getPageFromRoute();
    if (page !== movieStore.currentPage) {
      movieStore.fetchPopular(page);
    }
  }
);

onMounted(() => {
  const initialPage = getPageFromRoute();
  movieStore.fetchPopular(initialPage);
});
</script>

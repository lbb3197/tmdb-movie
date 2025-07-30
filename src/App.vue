<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <!-- <nav class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex space-x-6">
      <RouterLink 
        to="/" 
        class="hover:text-gray-300"
        :class="{ 'text-blue-400': route.path === '/' }"
      >
        首页
      </RouterLink>
      <RouterLink 
        to="/popular" 
        class="hover:text-gray-300"
        :class="{ 'text-blue-400': route.path === '/popular' }"
      >
        热门电影
      </RouterLink>
      <RouterLink 
        to="/top" 
        class="hover:text-gray-300"
        :class="{ 'text-blue-400': route.path === '/top' }"
      >
        高分电影
      </RouterLink>
    </div>
  </nav> -->
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
nav {
  margin: 1rem 0;
}
</style>

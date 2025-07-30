<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-800 mb-6">🎬 电影探索</h1>
      <p class="text-lg text-gray-600 mb-8">发现热门电影和高分佳作</p>
      
      <div class="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <RouterLink 
          to="/popular"
          class="block p-6 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <div class="text-3xl mb-2">🔥</div>
          <h2 class="text-xl font-bold mb-2">热门电影</h2>
          <p class="text-red-100">探索当前最受欢迎的电影</p>
        </RouterLink>
        
        <RouterLink 
          to="/top"
          class="block p-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <div class="text-3xl mb-2">⭐</div>
          <h2 class="text-xl font-bold mb-2">高分电影</h2>
          <p class="text-yellow-100">发现评分最高的经典佳作</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

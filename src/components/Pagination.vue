<template>
  <div class="flex justify-center items-center mt-6 space-x-4">
    <!-- 上一页按钮 -->
    <button
      class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="page === 1"
      @click="$emit('change', page - 1)"
    >
      上一页
    </button>

    <!-- 页码显示和快速跳转 -->
    <div class="flex items-center space-x-2">
      <!-- 首页 -->
      <button
        v-if="page > 3"
        class="px-3 py-2 bg-white border rounded hover:bg-gray-50"
        @click="$emit('change', 1)"
      >
        1
      </button>
      <span v-if="page > 4">...</span>

      <!-- 当前页附近的页码 -->
      <button
        v-for="pageNum in visiblePages"
        :key="pageNum"
        class="px-3 py-2 rounded"
        :class="
          pageNum === page
            ? 'bg-blue-500 text-white'
            : 'bg-white border hover:bg-gray-50'
        "
        @click="$emit('change', pageNum)"
      >
        {{ pageNum }}
      </button>

      <span v-if="page < total - 3">...</span>
      <!-- 末页 -->
      <button
        v-if="page < total - 2"
        class="px-3 py-2 bg-white border rounded hover:bg-gray-50"
        @click="$emit('change', total)"
      >
        {{ total }}
      </button>
    </div>

    <!-- 下一页按钮 -->
    <button
      class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="page === total"
      @click="$emit('change', page + 1)"
    >
      下一页
    </button>

    <!-- 快速跳转输入框 -->
    <div class="flex items-center space-x-2 ml-4">
      <span class="text-sm text-gray-600">跳至</span>
      <input
        v-model="inputPage"
        @keyup.enter="goToPage"
        type="number"
        :min="1"
        :max="total"
        class="w-16 px-2 py-1 text-center border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder=""
      />
      <button
        @click="goToPage"
        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
      >
        跳转
      </button>
    </div>

    <!-- 总页数显示 -->
    <span class="text-sm text-gray-600 ml-2">共 {{ total }} 页</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  page: number;
  total: number;
}>();

const emit = defineEmits<{
  (e: "change", value: number): void;
}>();

const inputPage = ref<number | string>("");

// 计算当前页附近显示的页码
const visiblePages = computed(() => {
  const { page, total } = props;
  const pages: number[] = [];

  // 显示当前页前后各2页
  const start = Math.max(1, page - 2);
  const end = Math.min(total, page + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

// 跳转到指定页面
const goToPage = () => {
  const targetPage = Number(inputPage.value);

  if (
    targetPage &&
    targetPage >= 1 &&
    targetPage <= props.total &&
    targetPage !== props.page
  ) {
    emit("change", targetPage);
    inputPage.value = "";
  } else if (targetPage < 1) {
    inputPage.value = 1;
  } else if (targetPage > props.total) {
    inputPage.value = props.total;
  }
};
</script>

import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: "zh-CN",
  },
});

// 可以添加拦截器（可选）
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API 请求错误:", error);
    return Promise.reject(error);
  }
);

export default api;

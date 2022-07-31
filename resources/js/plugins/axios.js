import axios from "axios";
import store from "@/store";
import router from "@/router";

axios.defaults.baseURL = `${window.location.origin}/api/`;

// Request interceptor
axios.interceptors.request.use((request) => {
  const token = store.getters["auth/token"];
  if (token) {
    request.headers.common.Authorization = `Bearer ${token}`;
  }
  return request;
});

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      sessionStorage.removeItem("TOKEN");
      router.push({ name: "login" });
    } else if (error.response.status === 404) {
      router.push({ name: "NotFound" });
    }
    throw error;
  }
);

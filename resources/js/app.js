import { createApp } from "vue";
import store from "./store";
import router from "./router";
import App from "./App.vue";
import "./plugins/axios";
import AppLayout from "@/layouts/AppLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const app = createApp(App);

app.component("AppLayout", AppLayout);
app.component("DefaultLayout", DefaultLayout);

app.use(store).use(router).mount("#app");

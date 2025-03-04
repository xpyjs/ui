import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import { routes } from "./router/config";
import Components from "./components";
import XUI from "../../packages";
import "./style.css";
// import XUI from "../../es/packages/index.js";
// import "../../es/index.css";
import "./style.scss";

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.use(XUI);
app.use(Components);
app.mount("#app");

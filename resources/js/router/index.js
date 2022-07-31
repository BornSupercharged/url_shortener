import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import guest from "./middleware/guest";
import auth from "./middleware/auth";
import checkAuth from "./middleware/check-auth";

import Login from "@/page/Login";
import Register from "@/page/Register";
import Dashboard from "@/page/Dashboard";
import Url from "@/page/Url";

// The middleware for every page of the application.
const globalMiddleware = [checkAuth];

const routes = [
  {
    path: "/",
    redirect: {
      name: "login",
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: "/register",
    redirect: {
      name: "register",
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      middleware: [auth],
      layout: "AppLayout",
    },
  },
  {
    path: "/url-shortner",
    name: "url-shortner",
    component: Url,
    meta: {
      middleware: [auth],
      layout: "AppLayout",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const middlewarePipeline = (context, middleware, index) => {
  const nextMiddleware = middleware[index];
  if (!nextMiddleware) {
    return context.next;
  }
  return () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1);
    nextMiddleware({ ...context, next: nextPipeline });
  };
};

router.beforeEach(async (to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }

  const middleware = [...globalMiddleware, ...to.meta.middleware];

  console.log(middleware);
  const context = {
    to,
    from,
    next,
    store,
  };
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});
export default router;

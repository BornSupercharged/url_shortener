import store from "@/store";

export default async ({ next }) => {
  if (!store.getters["auth/loggedIn"] && store.getters["auth/token"]) {
    try {
      await store.dispatch("auth/fetchUser");
    } catch (e) {}
  }

  next();
};

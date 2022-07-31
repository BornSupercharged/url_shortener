import store from "@/store";
export default function guest({ next, store }) {
  console.log(store.getters["auth/loggedIn"], store);
  if (store.getters["auth/loggedIn"]) {
    return next({
      name: "dashboard",
    });
  }
  return next();
}

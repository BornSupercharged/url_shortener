export default function guest({ next, store }) {
  console.log(store);
  if (!store.getters["auth/loggedIn"]) {
    return next({
      name: "login",
    });
  }
  return next();
}

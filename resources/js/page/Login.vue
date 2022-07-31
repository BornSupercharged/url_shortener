<template>
  <div class="bg-gray-100">
    <div class="flex items-center justify-center min-h-screen">
      <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg w-[400px]">
        <h3 class="text-2xl font-bold text-center">Login to your account</h3>
        <form @submit.prevent="submitLogin" @keydown="login.onKeydown($event)">
          <AlertError :form="login" />

          <div class="mt-4">
            <div>
              <label class="block" for="email">Email</label>
              <input
                type="text"
                placeholder="Email"
                v-model="login.email"
                class="
                  w-full
                  px-4
                  py-2
                  mt-2
                  border
                  rounded-md
                  focus:outline-none focus:ring-1 focus:ring-blue-600
                "
              />
              <HasError :form="login" field="email" />
            </div>
            <div class="mt-4">
              <label class="block">Password</label>
              <input
                type="password"
                v-model="login.password"
                placeholder="Password"
                class="
                  w-full
                  px-4
                  py-2
                  mt-2
                  border
                  rounded-md
                  focus:outline-none focus:ring-1 focus:ring-blue-600
                "
              />
              <HasError :form="login" field="password" />
            </div>
            <div class="flex items-baseline justify-between">
              <Button
                :form="login"
                class="
                  px-3
                  group
                  flex
                  relative
                  py-2
                  border border-transparent
                  text-sm
                  mt-4
                  font-medium
                  rounded-md
                  shadow-sm
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-indigo-500
                "
              >
                Log In
              </Button>
              <router-link
                :to="{ name: 'register' }"
                class="
                  px-3
                  group
                  flex
                  relative
                  py-2
                  border border-transparent
                  text-sm
                  mt-4
                  font-medium
                  rounded-md
                  shadow-sm
                  text-white
                  bg-info-100
                  hover:bg-info-100
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-indigo-500
                "
              >
                Register
              </router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive } from "@vue/reactivity";
import Form from "vform";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { Button, HasError, AlertError } from "vform/src/components/tailwind";

const router = useRouter();
const store = useStore();

const login = reactive(
  new Form({
    email: null,
    password: null,
    remember: false,
  })
);

async function submitLogin(ev) {
  try {
    // Submit the form.
    const { data } = await login.post("login");
    // Save the token.
    store.dispatch("auth/saveToken", {
      token: data.token,
    });
    // Fetch the user.
    await store.dispatch("auth/fetchUser");
    // Redirect home.
    return router.push({ name: "dashboard" });
  } catch (error) {
    console.log(error);
  }
  onMounted(() => {
    console.log(Cookies.get("user"));
  });
}
</script>

<style scoped></style>

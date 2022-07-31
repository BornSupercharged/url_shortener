<template>
  <div class="bg-gray-100">
    <div class="flex items-center justify-center min-h-screen">
      <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg w-[400px]">
        <h3 class="text-2xl font-bold text-center">Register a new account</h3>
        <form @submit.prevent="submitRegister" @keydown="register.onKeydown($event)">
          <AlertError :form="register" />

          <div class="mt-4">
            <div>
              <label class="block">Name</label>
              <input
                type="text"
                v-model="register.name"
                placeholder="Name"
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
              <HasError :form="register" field="name" />
            </div>
            <div class="mt-4">
              <label class="block" for="email">Email</label>
              <input
                type="text"
                placeholder="Email"
                v-model="register.email"
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
              <HasError :form="register" field="email" />
            </div>
            <div class="mt-4">
              <label class="block">Password</label>
              <input
                type="password"
                v-model="register.password"
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
              <HasError :form="register" field="password" />
            </div>
            <div class="mt-4">
              <label class="block">Confirm Password</label>
              <input
                type="password"
                v-model="register.confirmed"
                placeholder="Confirm Password"
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
              <HasError :form="register" field="confirmed" />
            </div>
            <div class="flex items-baseline justify-between">
              <Button
                :form="register"
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
                Register
              </Button>
              <router-link
                :to="{ name: 'login' }"
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
                  focus:ring-gray-50
                "
              >
                Login
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

const register = reactive(
  new Form({
    name: null,
    email: null,
    password: null,
    confirmed: null,
    remember: false,
  })
);

async function submitRegister(ev) {
  try {
    // Submit the form.
    const { data } = await register.post("register");
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

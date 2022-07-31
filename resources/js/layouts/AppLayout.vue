<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <nav class="bg-white shadow mb-4">
      <div class="mx-auto container px-6 py-2 xl:py-0">
        <div class="flex items-center justify-between">
          <div
            class="
              flex
              w-full
              sm:w-auto
              items-center
              sm:items-stretch
              justify-end
              sm:justify-start
            "
          >
            <div class="flex items-center">
              <img src="/logo.png" width="150" />
            </div>
          </div>
          <div class="flex">
            <div class="hidden xl:flex md:mr-6 xl:mr-16">
              <router-link
                :to="{ name: 'dashboard' }"
                class="nav-link"
                active-class="bg-gray-100"
              >
                Dashboard
              </router-link>
              <router-link
                :to="{ name: 'url-shortner' }"
                class="nav-link"
                active-class="bg-gray-100"
              >
                URL Shortener
              </router-link>
            </div>
            <div class="hidden xl:flex items-center">
              <div class="ml-6 relative">
                <div
                  class="flex items-center relative"
                  @click="dropdownHandler($event)"
                >
                  <ul
                    class="
                      p-2
                      w-40
                      border-r
                      bg-white
                      absolute
                      rounded
                      right-0
                      shadow
                      top-0
                      mt-16
                      hidden
                    "
                  >
                    <li
                      class="
                        cursor-pointer
                        text-gray-600 text-sm
                        leading-3
                        tracking-normal
                        mt-2
                        py-2
                        hover:text-indigo-700
                        flex
                        items-center
                        focus:text-indigo-700 focus:outline-none
                      "
                      @click="logout"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-settings"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span class="ml-2">Logout</span>
                    </li>
                  </ul>
                  <div
                    class="
                      cursor-pointer
                      flex
                      text-sm
                      border-2 border-transparent
                      rounded-full
                      focus:outline-none focus:border-white
                      transition
                      duration-150
                      ease-in-out
                    "
                  >
                    <img
                      class="rounded-full h-10 w-10 object-cover"
                      src="/images/user.png"
                      alt="logo"
                    />
                  </div>
                  <div class="ml-2 text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="
                        icon icon-tabler icon-tabler-chevron-down
                        cursor-pointer
                      "
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z"></path>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import Notification from "./Notification.vue";

const store = useStore();
const router = useRouter();

async function logout() {
  await store.dispatch("auth/logout");
  router.push({ name: "login" });
}

function dropdownHandler(event) {
  let single = event.currentTarget.getElementsByTagName("ul")[0];
  single.classList.toggle("hidden");
}
function MenuHandler(el, val) {
  let MainList = el.currentTarget.parentElement.getElementsByTagName("ul")[0];
  let closeIcon =
    el.currentTarget.parentElement.getElementsByClassName("close-m-menu")[0];
  let showIcon =
    el.currentTarget.parentElement.getElementsByClassName("show-m-menu")[0];
  if (val) {
    MainList.classList.remove("hidden");
    el.currentTarget.classList.add("hidden");
    closeIcon.classList.remove("hidden");
  } else {
    showIcon.classList.remove("hidden");
    MainList.classList.add("hidden");
    el.currentTarget.classList.add("hidden");
  }
}
</script>

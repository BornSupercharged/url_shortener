<template>
  <div class="container mx-auto">
    <div class="max-w-full border border-gray-300 rounded-sm bg-white">
      <div class="p-6">
        <h2 class="text-xl font-medium">Welcome, {{ user.name }} &#128075;</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

const store = useStore();

const user = computed(() => store.getters["auth/auth"]);
</script>

<style scoped></style>

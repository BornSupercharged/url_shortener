<template>
  <div class="container mx-auto">
    <div class="max-w-full border border-gray-300 rounded-sm bg-white">
      <div class="p-6">
        <h2 class="text-xl font-medium">Welcome, {{ user.name }} &#128075;</h2>
        <ul class="list-group">
		  <li class="list-group-item list-group-item-primary">Public API call for your shortcodes:  <strong><a target="_blank" :href="base_url1+'/user/'+ user.id">{{ base_url1+'/user/'+ user.id }}</a></strong></li>
		</ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

const store = useStore();
const base_url1=window.location.origin;
const user = computed(() => store.getters["auth/auth"]);
</script>

<style scoped></style>

<script setup>
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";

const route = useRoute();
const layout = computed(() => route.meta.layout || "DefaultLayout");
</script>

<template>
  <component :is="layout" v-if="layout" />
</template>

<style>
</style>

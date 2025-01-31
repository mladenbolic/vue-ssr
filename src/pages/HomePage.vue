<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script setup>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { useHead } from "@unhead/vue";

useHead({
  title: "Home Page",
  meta: [
    {
      key: "og:title",
      property: "og:title",
      content: "Home Page",
    },
    {
      key: "og:description",
      property: "og:description",
      content:
        "Home page for Open Graph meta tag setup for Vue SSR application.",
    },
    { key: "og:url", property: "og:url", content: "https://sixhours.io" },
    {
      key: "og:image",
      property: "og:image",
      content: require("@/assets/home.png"),
    },
    { key: "og:image:width", property: "og:image:width", content: "1200" },
    { key: "og:image:height", property: "og:image:height", content: "630" },
  ],
});
</script>

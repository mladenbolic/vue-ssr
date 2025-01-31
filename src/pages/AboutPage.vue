<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup>
import { useHead } from "@unhead/vue";

useHead({
  title: "About Page",
  meta: [
    {
      key: "og:title",
      property: "og:title",
      content: "About Page",
    },
    {
      key: "og:description",
      property: "og:description",
      content:
        "About page for Open Graph meta tag setup for Vue SSR application.",
    },
    { key: "og:url", property: "og:url", content: "https://sixhours.io" },
    {
      key: "og:image",
      property: "og:image",
      content: require("@/assets/about.png"),
    },
    { key: "og:image:width", property: "og:image:width", content: "1200" },
    { key: "og:image:height", property: "og:image:height", content: "630" },
  ],
});
</script>

<template>
  <div>Counter: {{ store.count }}</div>
  <button @click="store.increment()">Increment</button>
  <button @click="store.reset()" style>Reset</button>
</template>

<script setup>
import { useCounterStore } from "../store";

const store = useCounterStore();
</script>

<style scoped>
button {
  margin-left: 5px;
}
button:last-child {
  margin-left: none;
}
</style>

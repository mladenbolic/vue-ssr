import { defineStore, createPinia } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    reset() {
      this.count = 0;
    },
  },
});

const createStore = () => createPinia();

export default createStore;

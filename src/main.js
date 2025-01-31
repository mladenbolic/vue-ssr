import { createApp } from "vue";
import App from "./App.vue";
import createStore from "./store";
import createRouter from "./router";
import { createHead } from "@unhead/vue";

const store = createStore();
const router = createRouter();
const head = createHead();

// initialize the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window && window.__INITIAL_STATE__) {
  store.state.value = window.__INITIAL_STATE__;
}

createApp(App).use(store).use(router).use(head).mount("#app", true);

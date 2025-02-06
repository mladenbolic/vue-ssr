import { createApp } from "vue";
import App from "./App.vue";
import createStore from "./store";

const store = createStore();

// initialize the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup
if (window && window.__INITIAL_STATE__) {
  store.state.value = window.__INITIAL_STATE__;
}

createApp(App).use(store).mount("#app", true);

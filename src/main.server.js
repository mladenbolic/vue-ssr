import { renderToString } from "@vue/server-renderer";
import { createSSRApp } from "vue";
import createStore from "./store";
import App from "./App.vue";

export default async (url) => {
  console.log("url=", url);
  const app = createSSRApp(App);

  const store = createStore();

  app.use(store);

  const context = {};
  const content = await renderToString(app, context);
  const state = store.state.value;

  // return application content and state for server side rendering
  return { content, state };
};

import { createSSRApp } from "vue";
import App from "./App.vue";
import { renderToString } from "@vue/server-renderer";
import createStore from "./store";
import createRouter from "./router";

export default async (url) => {
  console.log("url=", url);
  const app = createSSRApp(App);

  const store = createStore();
  const router = createRouter();

  app.use(store);
  app.use(router);

  // set server-side router's location
  // On page refresh router isReady() resolves immediately, but current path is still not
  // available as a matched component (previous path is still matched) so we need to wait until push
  // promise resolves
  try {
    await router.push(url);
    await router.isReady();
  } catch (err) {
    throw new Error(err);
  }

  const matchedComponents = router.currentRoute.value.matched;

  if (!matchedComponents.length) {
    throw new Error("404");
  }

  const context = {};
  const content = await renderToString(app, context);
  const state = store.state.value;

  // return application content and state for server side rendering
  return { content, state };
};

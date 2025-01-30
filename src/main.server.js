// import { renderToString } from "@vue/server-renderer";
import { createSSRApp } from "vue";
import App from "./App.vue";

const app = createSSRApp(App);

// const content = await renderToString(app);

export default app;

// export default async (url) => {
//   console.log("url=", url);
//   // set server-side router's location
//   // On page refresh router isReady() resolves immediately, but current path is still not
//   // available as a matched component (previous path is still matched) so we need to wait until push
//   // promise resolves
//   // try {
//   //   await router.push(url);
//   //   await router.isReady();
//   // } catch (err) {
//   //   throw new Error(err);
//   // }

//   const matchedComponents = router.currentRoute.value.matched;

//   console.log("matchedComponents=", matchedComponents);

//   if (!matchedComponents.length) {
//     throw new Error("404");
//   }

//   const content = await renderToString(app);

//   // return application content for server side rendering
//   return content;
// };

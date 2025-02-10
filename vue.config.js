const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const nodeExternals = require("webpack-node-externals");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("define").tap((definitions) => {
      // https://vuejs.org/api/compile-time-flags
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: "true",
        __VUE_PROD_DEVTOOLS__: "false",
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
      });
      return definitions;
    });

    if (!process.env.SSR) {
      config
        .plugin("manifest")
        .use(new WebpackManifestPlugin({ fileName: "client-manifest.json" }));

      config.entry("app").clear().add("./src/main.js");
      return;
    }

    config.target("node");
    config.output.libraryTarget("commonjs2");

    config
      .plugin("manifest")
      .use(new WebpackManifestPlugin({ fileName: "ssr-manifest.json" }));

    config.entry("app").clear().add("./src/main.server.js");

    config.externals(
      nodeExternals({
        allowlist: [/\.(css|sass|scss|less)$/, /\.(vue)$/, /\.(html)$/],
      })
    );

    config.optimization.splitChunks(false).minimize(false);

    config.plugins.delete("hmr");
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    config.plugins.delete("progress");
    config.plugins.delete("friendly-errors");
  },
});

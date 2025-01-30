const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const nodeExternals = require("webpack-node-externals");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    if (!process.env.SSR) {
      return;
    }

    config.entry("app").clear().add("./src/main.server.js");

    config.target("node");
    config.output.libraryTarget("commonjs2");

    config
      .plugin("manifest")
      .use(new WebpackManifestPlugin({ fileName: "ssr-manifest.json" }));

    config.externals(
      nodeExternals({
        allowlist: [
          /^bootstrap*/,
          /\.(css|sass|scss|less)$/,
          /\.(vue)$/,
          /\.(html)$/,
        ],
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

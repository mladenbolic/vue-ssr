const express = require("express");
const path = require("path");
const serialize = require("serialize-javascript");

const manifest = require(path.join(
  __dirname,
  "./dist/server/ssr-manifest.json"
));
const clientManifest = require(path.join(
  __dirname,
  "./dist/client/client-manifest.json"
));

const server = express();

const distPath = "./dist/client";
server.use("/img", express.static(path.join(__dirname, distPath, "img")));
server.use("/js", express.static(path.join(__dirname, distPath, "js")));
server.use("/css", express.static(path.join(__dirname, distPath, "css")));
server.use(
  "/favicon.ico",
  express.static(path.join(__dirname, distPath, "favicon.ico"))
);

const appPath = path.join(__dirname, "./dist/server", manifest["app.js"]);
const renderApp = require(appPath).default;

// handle all urls in our application
server.get("*", async (req, res) => {
  const { content, state } = await renderApp(req.url);

  const renderState = `
    <script>
      window.__INITIAL_STATE__ = ${serialize(state)}
    </script>`;

  const html = `<html>
        <head><title>Vue SSR</title>
        <link rel="stylesheet" href="${clientManifest["app.css"]}" />
        <script defer="defer" src="${clientManifest["chunk-vendors.js"]}"></script>
        <script defer="defer" src="${clientManifest["app.js"]}"></script>
        </head>
        <body><div id="app"></div>
        </body>
        </html>`.replace(
    '<div id="app"></div>',
    `${renderState}<div id="app">${content}</div>`
  );

  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

server.listen(8083);

console.log(`Running on http://localhost:8083`);

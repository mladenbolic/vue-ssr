const express = require("express");
const path = require("path");
const manifest = require(path.join(__dirname, "./dist/ssr-manifest.json"));
const { renderToString } = require("@vue/server-renderer");

const server = express();

const distPath = "./dist";
server.use("/img", express.static(path.join(__dirname, distPath, "img")));
server.use("/js", express.static(path.join(__dirname, distPath, "js")));
server.use("/css", express.static(path.join(__dirname, distPath, "css")));
server.use(
  "/favicon.ico",
  express.static(path.join(__dirname, distPath, "favicon.ico"))
);

const appPath = path.join(__dirname, "./dist", manifest["app.js"]);
const app = require(appPath).default;

// handle all routes in our application
server.get("*", async (req, res) => {
  const content = await renderToString(app);

  const html = `<html>
      <head><title>Vue SSR</title>
      </head>
      <body>${content}</body>
      </html>`;

  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

server.listen(8083);

console.log(`Running on http://localhost:8083`);

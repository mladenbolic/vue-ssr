const express = require("express");
const path = require("path");
const serialize = require("serialize-javascript");
const fs = require("fs");

const manifest = require(path.join(
  __dirname,
  "./dist/server/ssr-manifest.json"
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
  const { content, state, meta } = await renderApp(req.url);

  const baseUrl = req.protocol + "://" + req.get("host");
  const fullUrl = baseUrl + req.originalUrl.split(/[?#]/)[0];

  const renderState = `
<script>
  window.__INITIAL_STATE__ = ${serialize(state)}
</script>`;

  fs.readFile(path.join(__dirname, distPath, "index.html"), (err, html) => {
    if (err) {
      throw err;
    }

    // eslint-disable-next-line no-param-reassign
    html = html
      .toString()
      .replace(
        '<div id="app"></div>',
        `${renderState}<div id="app">${content}</div>`
      )
      .replace("</head>", `${meta || ""}</head>`)
      .replace(
        '<meta property="og:url" content="https://sixhours.io">',
        `<meta property="og:url" content="${fullUrl}">`
      )
      .replace(/content="\/img\//g, `content="${baseUrl}/img/`);
    res.setHeader("Content-Type", "text/html");
    res.send(html);
  });
});

server.listen(8083);

console.log(`Running on http://localhost:8083`);

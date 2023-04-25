const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
const ConnectDB = require("./config/db.connect");

/*App connect to data base */
const port = process.env.PORT || 8090;

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});

const server = app.listen(port, async () => {
  await ConnectDB();
  console.log(`Server running on http://localhost:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhabled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
/* 
//useing basic ("http") to create server; 
const http = require("http");
const server = http.createServer((request, response) => {
  if (request.url === "/") {
    response.end("Hello");
  } else if (request.url === "/reports") {
    response.end("Here are the reports");
  } else if (request.url === "/data") {
    response.end("Data....");
  }
});
server.listen(4500, () => {
  console.log("Listening on the port 4500");
});

*/

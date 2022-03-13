import path from "path";
import express from "express";

import routes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`This app is listening on port ${port}`));
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("server closed");
  });
});

import path from "path";
import express from "express";

import routes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(routes);
app.use((err, req, res, next) => {
  if (err) {
    // unexpected error
    console.error(err);

    res
      .status(500)
      .json({ code: 500, message: err.message || "something wrong" });
    return;
  }

  next();
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`This app is listening on port ${port}`));
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("server closed");
  });
});

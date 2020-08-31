import express from "express";
import { resolve } from "path";

const app = express();
app.use(express.static("dist"));

app.use((req, res, next) => {
  if (req.path == "/graphql") {
    return next();
  }

  res.sendFile(resolve(__dirname, "../../dist/index.html"));
});

export default app;

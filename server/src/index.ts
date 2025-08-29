import { listPostHandler, createPostHandler } from "../Handlers/PostHandler.js";
import express, { RequestHandler } from "express";

const app = express();

app.use(express.json());
const RequestLoggerMiddleware: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, "__body:", req.body);
  next();
};

app.use(RequestLoggerMiddleware);

app.get("/posts", listPostHandler);

app.post("/posts", createPostHandler);

app.listen(3000);

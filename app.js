import { postMiddleware, preMiddleware } from "./middleware";
import socketController from "./socketServer";
import app from "./express";
import http from "http";
const server = http.createServer(app);
import { connect } from "./db";
import { errorMiddleware } from "./middleware/errorMiddleware";
import routers from "./routers";
import cors from "cors";
import socket from "socket.io";
app.use(preMiddleware);
app.use(routers);
app.use(postMiddleware);
app.use(errorMiddleware);
app.use(cors());

connect(async () => {
  const server = app.listen(process.env.PORT || 8000, () => {
    console.log("😎 App is running fine!");
  });
  const io = socket(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", socketController);
});

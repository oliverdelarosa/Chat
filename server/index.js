import Express from "express";
import morgan from "morgan";
import { Server as Soketserver } from "socket.io";
import http from "http";
import cors from "cors";
import { PORT } from "./config.js ";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const app = Express();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
const server = http.createServer(app);
const io = new Soketserver(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
app.use(cors());
app.use(morgan("dev"));
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("message", (message) => {
    console.log(message);
    socket.broadcast.emit("message", {
      body: message,
      from: socket.id,
    });
  });
});
app.use(Express.static(join(__dirname, "../client/build")));
server.listen(PORT);
console.log("se conecto al servidor", PORT);

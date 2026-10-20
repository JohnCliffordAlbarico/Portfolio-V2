import "dotenv/config";
import { createServer } from "node:http";
import app from "./app.js";
import { Server } from "socket.io";

const port = Number(process.env.PORT ?? 3000);
const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: frontendUrl,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`Socket disconnected: ${socket.id} (${reason})`);
  });
});

httpServer.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});

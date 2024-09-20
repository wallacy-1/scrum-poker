import { io } from "socket.io-client";

const URL = process.env.REACT_APP_SOCKET_URL ?? "http://localhost:3001";

const socket = io(URL, {
  transports: ["websocket"],
  autoConnect: false,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default socket;

import { io } from "socket.io-client";
import { getTokenFromLC } from "../utils";

const URL = import.meta.env.VITE_SOCKET_BASE_URL;

export const socket = io(URL, {
  autoConnect: false,
  extraHeaders: { Authorization: getTokenFromLC() || "" },
});

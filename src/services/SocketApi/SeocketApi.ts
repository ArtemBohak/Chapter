import { io, Socket } from "socket.io-client";

class SocketApi {
  private readonly url = import.meta.env.VITE_SOCKET_BASE_URL;
  private readonly socket: Socket;

  constructor(private token: string | null) {
    this.socket = io(this.url, {
      autoConnect: false,
      extraHeaders: { Authorization: this.token + "" },
    });
  }

  get socketInstance() {
    return this.socket;
  }

  connect(isAuth: boolean) {
    if (this.token && isAuth) this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  addListener<T>(event: string, cb: (e: T) => void) {
    this.socket.on(event, cb);
  }

  removeListener<T>(event: string, cb: (e: T) => void) {
    this.socket.off(event, cb);
  }
}

export default SocketApi;

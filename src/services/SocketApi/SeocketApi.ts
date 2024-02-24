import { io, Socket } from "socket.io-client";

class SocketApi {
  private readonly url = import.meta.env.VITE_SOCKET_BASE_URL;
  private socket: Socket;

  constructor(private token: string) {
    this.socket = io(this.url, {
      autoConnect: false,
      extraHeaders: { Authorization: this.token },
    });
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  addListener<T, K>(event: string, cb: (e: T) => K) {
    this.socket.on(event, cb);
  }

  removeListener<T, K>(event: string, cb: (e: T) => K) {
    this.socket.off(event, cb);
  }
}

export default SocketApi;

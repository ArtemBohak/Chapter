import { Dispatch, SetStateAction } from "react";
import { io, Socket } from "socket.io-client";

class SocketApi {
  private static instance: SocketApi;
  private socket: Socket | undefined = undefined;
  private readonly url = import.meta.env.VITE_SOCKET_BASE_URL;

  constructor() {
    if (!SocketApi.instance) {
      SocketApi.instance = this;
    }

    return SocketApi.instance;
  }

  init(token: string) {
    this.socket = io(this.url, {
      autoConnect: false,
      extraHeaders: { Authorization: token },
    });
  }

  get socketInstance() {
    return this.socket;
  }

  handleEvent<T>(setData: Dispatch<SetStateAction<Array<T>>>) {
    return function (eventData: T) {
      if (typeof eventData === "object")
        return setData((state) => [
          { ...eventData, keyId: Date.now() },
          ...state,
        ]);
    };
  }

  connect(isAuth: boolean) {
    if (isAuth) this.socket?.connect();
  }

  disconnect() {
    this.socket?.disconnect();
  }

  addListener<T>(event: string, cb: (e: T) => void) {
    this.socket?.on(event, cb);
  }

  removeListener<T>(event: string, cb: (e: T) => void) {
    this.socket?.off(event, cb);
  }
}

export default SocketApi;

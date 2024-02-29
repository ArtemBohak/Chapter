import { Dispatch, SetStateAction, createRef } from "react";
import { io, Socket } from "socket.io-client";

import { INotification, NotificationType, SocketEventsType } from "@/src/types";

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

  handleEvent<T extends INotification>(
    eventType: SocketEventsType,
    setData: Dispatch<SetStateAction<Array<NotificationType>>>
  ) {
    return function (eventData: T) {
      const notification: NotificationType = {
        ...eventData,
        eventType,
        nodeRef: createRef(),
        keyId: Date.now(),
      };

      setData((state) => [notification, ...state]);
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

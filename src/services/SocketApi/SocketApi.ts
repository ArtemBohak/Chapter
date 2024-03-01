import { Dispatch, SetStateAction } from "react";
import { io, Socket } from "socket.io-client";
import { AxiosError, AxiosResponse } from "axios";
import { SetErrorType } from "@/src/types";
import { api } from "@/src/axios";
import { notificationsCB } from "@/src/utils";

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

  handleEvent<T, K>(
    setData: Dispatch<SetStateAction<Array<K>>>,
    setError?: SetErrorType
  ) {
    return async function (eventData: T) {
      if (typeof eventData === "object")
        return setData((state) => [
          { ...(eventData as K), keyId: Date.now() },
          ...state,
        ]);
      notificationsCB;
      if (typeof eventData === "string") {
        try {
          const { data }: AxiosResponse<Array<K>> = await api.get("");
          setData(notificationsCB<K>(data, "keyId"));
        } catch (e) {
          if (e instanceof AxiosError) {
            setError && setError(e);
          }
        }
      }
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

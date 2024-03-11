import { Dispatch, SetStateAction } from "react";
import { io, Socket } from "socket.io-client";
import { AxiosError, AxiosResponse } from "axios";
import { SetErrorType } from "@/src/types";
import { EndpointsEnum, api } from "@/src/axios";
import { notificationsCB } from "@/src/utils";

class SocketApi {
  private static instance: SocketApi;
  private readonly url = import.meta.env.VITE_SOCKET_BASE_URL;
  private socket: Socket | undefined = undefined;

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
    setData: Dispatch<SetStateAction<Array<T>>>,
    setError?: SetErrorType
  ) {
    return async function (eventData: K) {
      if (typeof eventData === "object")
        return setData((state) => [
          { ...(eventData as T), keyId: Date.now() },
          ...state,
        ]);

      if (typeof eventData === "string") {
        try {
          const { data }: AxiosResponse<Array<T>> = await api.get("");
          setData(notificationsCB<T>(data, "keyId"));
        } catch (e) {
          if (e instanceof AxiosError) {
            setError && setError(e);
          }
        }
      }
    };
  }

  handleData<T>(
    setData: Dispatch<SetStateAction<Array<T>>>,
    setError?: SetErrorType
  ) {
    return async function () {
      try {
        const { data }: AxiosResponse<Array<T>> = await api.get(
          EndpointsEnum.NOTA
        );

        setData(notificationsCB<T>(data, "id"));
      } catch (e) {
        if (e instanceof AxiosError) {
          setError && setError(e);
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

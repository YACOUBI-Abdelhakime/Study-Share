import { Socket } from "socket.io-client";

export class WS {
  static wSocket: Socket | null = null;

  static setWSocket = (socket: Socket | null) => {
    WS.wSocket = socket;
  };
}

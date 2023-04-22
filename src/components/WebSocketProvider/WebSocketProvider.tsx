import { connected } from "process";
import React, { createContext } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export const WebSocketContext = createContext({
//   socket: null,
  connected: false,
});

interface Props {
  url: string;
  children: React.ReactNode;
}

const WebSocketProvider = ({ url, children }: Props) => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(url);

  return (
    <WebSocketContext.Provider value={{  connected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;

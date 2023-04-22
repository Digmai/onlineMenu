/**
 * Interface for WebSocket message
 */
interface WSMessage {
  type: string;
  order: any; // Change to actual type when defined
}

/**
 * WebSocketService class for handling real-time updates
 */
export default class WebSocketService {
  private static ws: WebSocket | null = null;

  /**
   * Method for initializing WebSocket
   * @returns {WebSocket} Initialized WebSocket
   */
  static initializeWebSocket(): WebSocket {
    if (!WebSocketService.ws) {
      WebSocketService.ws = new WebSocket("ws://localhost:8080"); // Change URL as necessary
    }
    return WebSocketService.ws;
  }

  /**
   * Method for closing WebSocket connection
   */
  static closeWebSocket(): void {
    if (WebSocketService.ws) {
      WebSocketService.ws.close();
      WebSocketService.ws = null;
    }
  }

  /**
   * Method for sending WebSocket message
   * @param {WSMessage} message - Message to send
   */
  static sendWebSocketMessage(message: WSMessage): void {
    if (WebSocketService.ws) {
      WebSocketService.ws.send(JSON.stringify(message));
    }
  }
}

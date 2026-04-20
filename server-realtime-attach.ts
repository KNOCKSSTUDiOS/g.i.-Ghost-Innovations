// Attach WebSocket server to existing HTTP server

import { startRealtimeServer } from "./gi-realtime/ws-server";

export function attachRealtime(httpServer) {
  startRealtimeServer(httpServer);
}


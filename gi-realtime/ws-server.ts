// G.I. REAL-TIME LOG SERVER
// Broadcasts engine events to all connected admin dashboards.

import { WebSocketServer } from "ws";

let wss: WebSocketServer | null = null;

export function startRealtimeServer(server: any) {
  wss = new WebSocketServer({ server });

  wss.on("connection", ws => {
    ws.send(JSON.stringify({ type: "welcome", msg: "G.I. Realtime Connected" }));
  });
}

export function broadcastEvent(event: any) {
  if (!wss) return;

  const payload = JSON.stringify({
    type: "event",
    timestamp: Date.now(),
    event
  });

  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(payload);
    }
  });
}


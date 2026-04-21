import http from "http";
import { bootstrapGI } from "./bootstrap/gi-bootstrap";

function createServer() {
  const engine = bootstrapGI();

  const server = http.createServer(async (req, res) => {
    try {
      engine.logger.info("Incoming request", { url: req.url, method: req.method });

      // Basic health route
      if (req.url === "/health") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "ok", engine: "GI" }));
        return;
      }

      // Default response
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("GI Engine Server Running");
    } catch (err: any) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err?.message || "Unknown error" }));
    }
  });

  return server;
}

const server = createServer();
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`GI Engine server running on port ${PORT}`);
});

